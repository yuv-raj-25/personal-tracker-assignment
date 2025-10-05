"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import type { Expense } from "@/app/page"

type Props = {
  expenses: Expense[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

function formatCurrency(n: number) {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n)
  } catch {
    return `$${n.toFixed(2)}`
  }
}

export function ExpenseList({ expenses, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="p-0">
                <Empty className="border-0">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <img src="/wallet-icon.png" alt="" />
                    </EmptyMedia>
                    <EmptyTitle>Track your first expense</EmptyTitle>
                    <EmptyDescription>Add an expense above to get started.</EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent />
                </Empty>
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((e) => (
              <TableRow key={e.id} className="hover:bg-muted/40">
                <TableCell className="font-medium text-right">{formatCurrency(e.amount)}</TableCell>
                <TableCell className="whitespace-nowrap">{e.date}</TableCell>
                <TableCell className="max-w-[360px] truncate" title={e.note || ""}>
                  {e.note || "-"}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="rounded-md">
                    {e.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="secondary" onClick={() => onEdit(e.id)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => onDelete(e.id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
