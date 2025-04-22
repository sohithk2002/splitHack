import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { inngest } from "./client";

// Initialize Convex client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const spendingInsights = inngest.createFunction(
  { id: "generate-spending-insights" },
  { cron: "0 8 1 * *" }, // Run monthly on the 1st at 8 AM
  async ({ step }) => {
    // 1. Get all users who have expenses
    const usersWithExpenses = await step.run(
      "get-users-with-expenses",
      async () => {
        return await convex.query(api.inngest.getUsersWithExpenses);
      }
    );

    // 2. Generate insights for each user
    const results = await step.run("generate-user-insights", async () => {
      const insightResults = [];

      for (const user of usersWithExpenses) {
        // Get user's expense data for the past month
        const expenses = await convex.query(
          api.inngest.getUserMonthlyExpenses,
          {
            userId: user._id,
          }
        );

        // Skip if no expenses
        if (!expenses || expenses.length === 0) {
          continue;
        }

        // Prepare data for AI analysis
        const expenseData = JSON.stringify({
          expenses,
          totalSpent: expenses.reduce((sum, exp) => sum + exp.amount, 0),
          categories: expenses.reduce((cats, exp) => {
            if (!cats[exp.category]) cats[exp.category] = 0;
            cats[exp.category] += exp.amount;
            return cats;
          }, {}),
        });

        try {
          // Use Gemini AI to generate insights
          const prompt = `
            As a financial analyst, review this user's spending data for the past month and provide insightful observations and suggestions.
            Focus on spending patterns, category breakdowns, and actionable advice for better financial management.
            Use a friendly, encouraging tone. Format your response in HTML for an email.
            
            User spending data:
            ${expenseData}
            
            Provide your analysis in these sections:
            1. Monthly Overview
            2. Top Spending Categories
            3. Unusual Spending Patterns (if any)
            4. Saving Opportunities
            5. Recommendations for Next Month
          `;

          const result = await model.generateContent(prompt);
          const aiInsights = result.response.text();

          // Send email with insights
          const emailData = {
            to: user.email,
            subject: "Your Monthly Spending Insights",
            html: `
              <h1>Your Monthly Financial Insights</h1>
              <p>Hi ${user.name},</p>
              <p>Here's your personalized spending analysis for the past month:</p>
              ${aiInsights}
            `,
            apiKey: process.env.RESEND_API_KEY,
          };

          await convex.action(api.email.sendEmail, emailData);

          insightResults.push({
            userId: user._id,
            success: true,
          });
        } catch (error) {
          insightResults.push({
            userId: user._id,
            success: false,
            error: error.message,
          });
        }
      }

      return insightResults;
    });

    return {
      totalUsers: results.length,
      successCount: results.filter((r) => r.success).length,
      failureCount: results.filter((r) => !r.success).length,
    };
  }
);
