import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

// Create a new expense
export const createExpense = mutation({
  args: {
    description: v.string(),
    amount: v.number(),
    category: v.optional(v.string()),
    date: v.number(), // timestamp
    paidByUserId: v.id("users"),
    splitType: v.string(), // "equal", "percentage", "exact"
    splits: v.array(
      v.object({
        userId: v.id("users"),
        amount: v.number(),
        paid: v.boolean(),
      })
    ),
    groupId: v.optional(v.id("groups")),
  },
  handler: async (ctx, args) => {
    // Use centralized getCurrentUser function
    const user = await ctx.runQuery(internal.users.getCurrentUser);

    // If there's a group, verify the user is a member
    if (args.groupId) {
      const group = await ctx.db.get(args.groupId);
      if (!group) {
        throw new Error("Group not found");
      }

      const isMember = group.members.some(
        (member) => member.userId === user._id
      );
      if (!isMember) {
        throw new Error("You are not a member of this group");
      }
    }

    // Verify that splits add up to the total amount (with small tolerance for floating point issues)
    const totalSplitAmount = args.splits.reduce(
      (sum, split) => sum + split.amount,
      0
    );
    const tolerance = 0.01; // Allow for small rounding errors
    if (Math.abs(totalSplitAmount - args.amount) > tolerance) {
      throw new Error("Split amounts must add up to the total expense amount");
    }

    // Create the expense
    const expenseId = await ctx.db.insert("expenses", {
      description: args.description,
      amount: args.amount,
      category: args.category || "Other",
      date: args.date,
      paidByUserId: args.paidByUserId,
      splitType: args.splitType,
      splits: args.splits,
      groupId: args.groupId,
      createdBy: user._id,
    });

    return expenseId;
  },
});

// Calculate split amounts
export const calculateSplits = query({
  args: {
    amount: v.number(),
    splitType: v.string(), // "equal", "percentage", "exact"
    participants: v.array(
      v.object({
        userId: v.id("users"),
        share: v.optional(v.number()), // For percentage or exact splits
      })
    ),
    paidByUserId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const { amount, splitType, participants, paidByUserId } = args;

    if (participants.length === 0) {
      throw new Error("Must have at least one participant");
    }

    const splits = [];

    if (splitType === "equal") {
      // Equal split
      const shareAmount = amount / participants.length;

      for (const participant of participants) {
        // The person who paid may have a split of 0 if they're just paying for others
        const isPayer = participant.userId === paidByUserId;

        splits.push({
          userId: participant.userId,
          amount: shareAmount,
          paid: isPayer, // Mark as paid if this person is the one who paid
        });
      }
    } else if (splitType === "percentage") {
      // Percentage split
      for (const participant of participants) {
        if (participant.share === undefined) {
          throw new Error("All participants must have a share percentage");
        }

        const shareAmount = (amount * participant.share) / 100;
        const isPayer = participant.userId === paidByUserId;

        splits.push({
          userId: participant.userId,
          amount: shareAmount,
          paid: isPayer,
        });
      }
    } else if (splitType === "exact") {
      // Exact amounts
      for (const participant of participants) {
        if (participant.share === undefined) {
          throw new Error("All participants must have an exact amount");
        }

        const isPayer = participant.userId === paidByUserId;

        splits.push({
          userId: participant.userId,
          amount: participant.share,
          paid: isPayer,
        });
      }
    } else {
      throw new Error("Invalid split type");
    }

    return splits;
  },
});

// ----------- Expenses Page -----------

// Get expenses between current user and a specific person
export const getExpensesBetweenUsers = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Use centralized getCurrentUser function
    const currentUser = await ctx.runQuery(internal.users.getCurrentUser);

    // Get all expenses where both users are involved (either as payer or in splits)
    const allExpenses = await ctx.db.query("expenses").collect();

    // Filter for expenses involving both users and not in a group
    const expenses = allExpenses.filter((expense) => {
      // Check if this is a one-on-one expense (not in a group)
      if (expense.groupId) return false;

      // Check if both users are involved
      const currentUserInvolved =
        expense.paidByUserId === currentUser._id ||
        expense.splits.some((split) => split.userId === currentUser._id);

      const otherUserInvolved =
        expense.paidByUserId === args.userId ||
        expense.splits.some((split) => split.userId === args.userId);

      return currentUserInvolved && otherUserInvolved;
    });

    // Get the other user's details
    const otherUser = await ctx.db.get(args.userId);
    if (!otherUser) {
      throw new Error("User not found");
    }

    // Sort expenses by date (newest first)
    expenses.sort((a, b) => b.date - a.date);

    // Get all settlements between these two users
    const settlements = await ctx.db
      .query("settlements")
      .filter((q) =>
        q.and(
          q.eq(q.field("groupId"), undefined), // Only one-on-one settlements
          q.or(
            q.and(
              q.eq(q.field("paidByUserId"), currentUser._id),
              q.eq(q.field("receivedByUserId"), args.userId)
            ),
            q.and(
              q.eq(q.field("paidByUserId"), args.userId),
              q.eq(q.field("receivedByUserId"), currentUser._id)
            )
          )
        )
      )
      .collect();

    // Sort settlements by date (newest first)
    settlements.sort((a, b) => b.date - a.date);

    // Calculate balances
    let balance = 0;

    // First apply expenses
    expenses.forEach((expense) => {
      if (expense.paidByUserId === currentUser._id) {
        // Current user paid
        const otherUserSplit = expense.splits.find(
          (split) => split.userId === args.userId
        );
        if (otherUserSplit && !otherUserSplit.paid) {
          balance += otherUserSplit.amount; // Other user owes this to current user
        }
      } else if (expense.paidByUserId === args.userId) {
        // Other user paid
        const currentUserSplit = expense.splits.find(
          (split) => split.userId === currentUser._id
        );
        if (currentUserSplit && !currentUserSplit.paid) {
          balance -= currentUserSplit.amount; // Current user owes this to other user
        }
      }
    });

    // Then apply settlements
    settlements.forEach((settlement) => {
      if (settlement.paidByUserId === currentUser._id) {
        // Current user paid other user
        balance += settlement.amount;
      } else {
        // Other user paid current user
        balance -= settlement.amount;
      }
    });

    return {
      expenses,
      settlements,
      otherUser: {
        id: otherUser._id,
        name: otherUser.name,
        email: otherUser.email,
        imageUrl: otherUser.imageUrl,
      },
      balance,
    };
  },
});