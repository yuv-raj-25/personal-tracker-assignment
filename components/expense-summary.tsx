"use client"

import type { Expense, Category } from "@/app/page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type Props = {
  expenses: Expense[]
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {   // fixed locale
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}

const categories: Category[] = ["Food", "Travel", "Bills", "Other"]

export function ExpenseSummary({ expenses }: Props) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)
  const byCategory = categories.map((c) => ({
    category: c,
    total: expenses.filter((e) => e.category === c).reduce((sum, e) => sum + e.amount, 0),
  }))

  return (
    <section className="grid gap-4 md:grid-cols-4">
      <Card className="md:col-span-4 bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <div className="rounded-md border border-border p-4">
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="text-2xl font-semibold">{formatCurrency(total)}</p>
          </div>
          {byCategory.map((item) => {
            const pct = total > 0 ? Math.min(100, Math.round((item.total / total) * 100)) : 0
            return (
              <div key={item.category} className="rounded-md border border-border p-4">
                <p className="text-sm text-muted-foreground flex items-center justify-between">
                  <span>{item.category}</span>
                  <span>{pct}%</span>
                </p>
                <p className="text-xl font-semibold mb-2">{formatCurrency(item.total)}</p>
                <Progress value={pct} aria-label={`${item.category} contribution`} />
              </div>
            )
          })}
        </CardContent>
      </Card>
    </section>
  )
}
