// convex/schema.js
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Expenses
  expenses: defineTable({
    description: v.string(),
    amount: v.number(),
    category: v.optional(v.string()),
    date: v.number(), // timestamp
    paidByUserId: v.string(), // Clerk user ID of who paid
    paidByUserInfo: v.object({
      // Store user info to avoid Clerk lookups
      name: v.string(),
      email: v.string(),
    }),
    splitType: v.string(), // "equal", "percentage", "exact"
    splits: v.array(
      v.object({
        userId: v.string(), // Clerk user ID
        userInfo: v.object({
          // Store user info to avoid Clerk lookups
          name: v.string(),
          email: v.string(),
        }),
        amount: v.number(), // amount owed by this user
        paid: v.boolean(),
      })
    ),
    groupId: v.optional(v.id("groups")), // null for one-on-one expenses
    createdBy: v.string(), // Clerk user ID
    createdAt: v.number(),
  })
    .index("by_group", ["groupId"])
    .index("by_paid_by", ["paidByUserId"])
    .index("by_created_by", ["createdBy"])
    .index("by_date", ["date"]),

  // Settlements
  settlements: defineTable({
    amount: v.number(),
    note: v.optional(v.string()),
    date: v.number(), // timestamp
    paidByUserId: v.string(), // Clerk user ID who paid
    paidByUserInfo: v.object({
      // Store user info
      name: v.string(),
      email: v.string(),
    }),
    receivedByUserId: v.string(), // Clerk user ID who received
    receivedByUserInfo: v.object({
      // Store user info
      name: v.string(),
      email: v.string(),
    }),
    groupId: v.optional(v.id("groups")), // null for one-on-one settlements
    relatedExpenseIds: v.optional(v.array(v.id("expenses"))), // Which expenses this settlement covers
    createdBy: v.string(), // Clerk user ID
    createdAt: v.number(),
  })
    .index("by_group", ["groupId"])
    .index("by_paid_by", ["paidByUserId"])
    .index("by_received_by", ["receivedByUserId"])
    .index("by_date", ["date"]),

  // Groups
  groups: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    createdBy: v.string(), // Clerk user ID
    members: v.array(
      v.object({
        userId: v.string(), // Clerk user ID
        userInfo: v.object({
          // Store user info
          name: v.string(),
          email: v.string(),
        }),
        role: v.string(), // "admin" or "member"
        joinedAt: v.number(),
      })
    ),
    createdAt: v.number(),
  }).index("by_created_by", ["createdBy"]),

  // Categories for expenses
  categories: defineTable({
    name: v.string(),
    icon: v.string(), // Icon name or URL
    isDefault: v.boolean(),
    createdAt: v.number(),
  }),
});
