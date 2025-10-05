# 💸 Expense Tracker

A simple **Expense Tracker App** built with **Next.js** and **Tailwind CSS (Shadcn UI)** for managing and visualizing personal expenses.  
It helps track spending, categorize expenses, and view totals in a clean dashboard-style UI.

---

## 🚀 Features
- Add and manage personal expenses.
- Categorize expenses for better insights.
- View total spent with dynamic formatting.
- Responsive UI built with **Shadcn UI + Tailwind**.
- Built with **Next.js App Router** for SSR & client components.

---

## 🛠 Tech Stack
- **Next.js 14+** (React framework)
- **TypeScript**
- **Tailwind CSS** (with Shadcn UI components)
- **Lucide Icons**
- **Radix UI** primitives

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   cd expense-tracker


install dependencies

bash npm install (or use pnpm install if you prefer pnpm)

Run the development server

bash npm run dev Open http://localhost:3000 to see the app in your browser.

Build for production

bash npm run build npm run start

📂 Project Structure Copy code expense-tracker/ ├── app/ # Next.js app directory │ ├── layout.tsx # Root layout │ ├── page.tsx # Main dashboard page │ └── globals.css # Global styles ├── components/ # Reusable UI components ├── lib/ # Utility functions (e.g., formatCurrency) ├── public/ # Static assets ├── package.json └── README.md

🎯 Usage Add expenses manually via the UI.

Expenses are grouped and displayed by category.

Total expenses are calculated and displayed at the top.

Currency formatting is consistent across server & client.
