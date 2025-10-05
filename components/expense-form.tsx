"use client"

import type React from "react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { useEffect, useMemo, useState } from "react"
import type { Category, Expense } from "@/app/page"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  initial?: Expense
  onSubmit: (payload: Omit<Expense, "id">) => void
  onCancel?: () => void
}

type Errors = Partial<Record<"amount" | "date" | "category", string>>

export function ExpenseForm({ initial, onSubmit, onCancel }: Props) {
  const [amount, setAmount] = useState<string>(initial ? String(initial.amount) : "")
  const [date, setDate] = useState<string>(initial?.date ?? "")
  const [note, setNote] = useState<string>(initial?.note ?? "")
  const [category, setCategory] = useState<Category>(initial?.category ?? "Food")
  const [errors, setErrors] = useState<Errors>({})

  useEffect(() => {
    // NO-OP reserved if we need side effects when initial changes
  }, [initial])

  const isEdit = Boolean(initial)

  const isValidDate = (d: string) => {
    // yyyy-mm-dd basic validation
    return /^\d{4}-\d{2}-\d{2}$/.test(d)
  }

  const parsedAmount = useMemo(() => {
    const n = Number(amount)
    return Number.isFinite(n) ? n : Number.NaN
  }, [amount])

  function validate(): boolean {
    const next: Errors = {}
    if (!(parsedAmount > 0)) next.amount = "Amount must be greater than 0"
    if (!isValidDate(date)) next.date = "Please select a valid date"
    if (!category) next.category = "Please select a category"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      amount: parsedAmount,
      date,
      note: note.trim(),
      category,
    })
    if (!isEdit) {
      setAmount("")
      setDate("")
      setNote("")
      setCategory("Food")
      setErrors({})
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
      <div className="grid gap-2">
        <Label htmlFor="amount">Amount</Label>
        <InputGroup>
          <InputGroupAddon aria-hidden className="text-muted-foreground">
            $
          </InputGroupAddon>
          <InputGroupInput
            id="amount"
            type="number"
            inputMode="decimal"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={errors.amount ? "amount-error" : undefined}
          />
        </InputGroup>
        {errors.amount ? (
          <p id="amount-error" className="text-sm text-destructive" role="alert">
            {errors.amount}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-invalid={Boolean(errors.date)}
        />
        {errors.date ? (
          <p className="text-sm text-destructive" role="alert">
            {errors.date}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2 md:col-span-2">
        <Label htmlFor="note">Note</Label>
        <Textarea
          id="note"
          placeholder="Optional note"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
          <SelectTrigger id="category" aria-label="Category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Food">Food</SelectItem>
            <SelectItem value="Travel">Travel</SelectItem>
            <SelectItem value="Bills">Bills</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.category ? (
          <p className="text-sm text-destructive" role="alert">
            {errors.category}
          </p>
        ) : null}
      </div>

      <div className="flex items-end gap-2">
        <Button type="submit" className="w-full">
          {isEdit ? "Update" : "Add"} Expense
        </Button>
        {isEdit ? (
          <Button type="button" variant="secondary" onClick={onCancel} className="w-full">
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  )
}
