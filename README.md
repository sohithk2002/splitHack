# 🧾 splitHack — AI-Powered Full Stack Splitwise Clone

**splitHack** is a comprehensive, real-time expense sharing application inspired by Splitwise, built with the latest full-stack technologies. This project demonstrates practical implementation of AI-enhanced user features, real-time collaborative tracking, and modern design principles.

![Next.js](https://img.shields.io/badge/Next.js-15-blue?logo=next.js)
![Convex](https://img.shields.io/badge/Convex-Realtime%20Backend-success?logo=graphql)
![Clerk](https://img.shields.io/badge/Auth-Clerk-orange?logo=clerk)
![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-blueviolet?logo=google)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38bdf8?logo=tailwind-css)
![Shadcn UI](https://img.shields.io/badge/UI-Shadcn%20UI-success)
![Render](https://img.shields.io/badge/Hosting-Render.com-green?logo=render)

---

## 🚀 Live Demo

🔗 [https://splithack.onrender.com](https://splithack.onrender.com)

---

## 📌 Project Overview

The application offers:
- Seamless **expense tracking** between individuals or within groups
- **AI-generated monthly insights** via Google Gemini
- Scheduled **payment reminder emails**
- **Secure authentication** using Clerk
- **Real-time updates** with Convex
- Elegant and responsive design using **Shadcn UI + Tailwind**

---

## 🧱 Core Technologies

| Feature                     | Stack Used                                   |
|----------------------------|----------------------------------------------|
| Frontend                   | Next.js 15 (App Router)                      |
| Styling                    | Tailwind CSS + Shadcn UI                     |
| Realtime Backend & DB      | Convex                                       |
| Authentication             | Clerk                                        |
| AI Reports                 | Google Gemini API                            |
| Email Notifications        | Resend + Ingest (cron jobs)                  |
| Charts & Visualization     | Recharts                                     |
| Icons                      | Lucide React                                 |
| Date Handling              | date-fns                                     |
| Hosting                    | Render.com                                   |

---

## ✨ Key Features

### 🔢 Expense Tracking
- Add expenses with description, category, amount, payer, and split logic
- Real-time updates for all users in the group

### 👥 Group Management
- Create groups, invite users, manage shared expenses and balances

### 🧾 Settlements
- Calculates total balances and allows recording settlements to offset debts

### 🔐 Authentication (Clerk)
- Secure and scalable sign-in and sign-up system

### 📊 AI Insights (Gemini)
- Monthly summaries generated with Gemini AI: unusual spending, savings tips, etc.

### ⏰ Payment Reminders (Ingest)
- Daily cron job sends reminders for unsettled debts

### 🔄 Real-time Sync
- Convex backend updates expenses, settlements, and balances instantly across users

### 🧑‍🤝‍🧑 Contact Management
- View all expenses/settlements shared with each contact or group

---

## 🗃️ Convex Database Schema Overview

- **users**: name, email, avatar, auth identifiers
- **groups**: group info, member roles
- **expenses**: linked to users/groups with split logic
- **settlements**: tracks who paid and who received

Indexed for performance:
- `byGroup`, `byUserAndGroup`, `byDate`, `searchName`, `searchEmail`

---

## ⚙️ Background Jobs with Ingest

- `sendPaymentReminders`: runs daily at 10 AM UTC
- `generateSpendingInsights`: runs monthly using Gemini AI

API routes created under `/api` handle Ingest triggers.

---

## 🧪 Local Setup Instructions

```bash
git clone https://github.com/sohithk2002/splitHack.git
cd splitHack
npm install
cp .env.example .env.local   # add your secrets
npx convex dev
npm run dev
```

---

## 🔐 Required Environment Variables

```env
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_JWT_ISSUER_DOMAIN=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

GEMINI_API_KEY=
RESEND_API_KEY=
STRIPE_SECRET_KEY=
```

---

## 📄 License

MIT — free to use, improve, and build upon.

---

## 👨‍💻 Created By

**Sohith Kampalli**  
🔗 [LinkedIn](https://linkedin.com/in/sohithk2002)

---

This project emphasizes not just building a polished product, but also **deep learning**, including:
- Custom routing with App Router
- Cron job scheduling with Ingest
- Serverless functions with Convex
- Real-world database design
- Secure, scalable, production-ready workflows
