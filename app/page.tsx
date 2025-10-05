"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExpenseForm } from "@/components/expense-form"
import { ExpenseList } from "@/components/expense-list"
import { ExpenseSummary } from "@/components/expense-summary"
import { ThemeToggle } from "@/components/theme-toggle"

export type Category = "Food" | "Travel" | "Bills" | "Other"

export type Expense = {
  id: string
  amount: number
  date: string // ISO yyyy-mm-dd
  note: string
  category: Category
}

const LS_KEY = "expenses-v1"

export default function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [editing, setEditing] = useState<Expense | null>(null)

  // Filters (optional)
  const [filterCategory, setFilterCategory] = useState<Category | "All">("All")
  const [dateFrom, setDateFrom] = useState<string>("")
  const [dateTo, setDateTo] = useState<string>("")

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Expense[]
        if (Array.isArray(parsed)) setExpenses(parsed)
      }
    } catch {
      // ignore corrupted storage
    }
  }, [])

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(expenses))
    } catch {
      // ignore quota/storage errors
    }
  }, [expenses])

  function addExpense(newExpense: Omit<Expense, "id">) {
    const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now())
    setExpenses((prev) => [{ id, ...newExpense }, ...prev])
  }

  function updateExpense(updated: Expense) {
    setExpenses((prev) => prev.map((e) => (e.id === updated.id ? updated : e)))
  }

  function deleteExpense(id: string) {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
    if (editing?.id === id) setEditing(null)
  }

  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      if (filterCategory !== "All" && e.category !== filterCategory) return false
      if (dateFrom && e.date < dateFrom) return false
      if (dateTo && e.date > dateTo) return false
      return true
    })
  }, [expenses, filterCategory, dateFrom, dateTo])

  function clearFilters() {
    setFilterCategory("All")
    setDateFrom("")
    setDateTo("")
  }

  return (
    <main className="mx-auto max-w-3xl p-4 md:p-6 space-y-6">
      <header className="flex items-center justify-between rounded-lg border bg-card/60 backdrop-blur px-4 py-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-pretty">Personal Expense Tracker</h1>
          <p className="text-sm text-muted-foreground">Log, filter, and understand your spending</p>
        </div>
        <ThemeToggle />
      </header>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Add / Edit Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseForm
            key={editing?.id ?? "new"}
            initial={editing ?? undefined}
            onCancel={() => setEditing(null)}
            onSubmit={(payload) => {
              if (editing) {
                updateExpense({ ...payload, id: editing.id })
                setEditing(null)
              } else {
                addExpense(payload)
              }
            }}
          />
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select value={filterCategory} onValueChange={(v) => setFilterCategory(v as Category | "All")}>
              <SelectTrigger id="category" aria-label="Filter by category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
                <SelectItem value="Bills">Bills</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date-from">From</Label>
            <Input id="date-from" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date-to">To</Label>
            <Input id="date-to" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>

          <div className="flex items-end">
            <Button type="button" className="w-full" variant="secondary" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <ExpenseList
        expenses={filteredExpenses}
        onEdit={(id) => {
          const exp = expenses.find((e) => e.id === id)
          if (exp) setEditing(exp)
        }}
        onDelete={deleteExpense}
      />

      <ExpenseSummary expenses={filteredExpenses} />
    </main>
  )
}
