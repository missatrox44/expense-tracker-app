
import React from 'react'
import ExpensesOutput from '../components/expensesOutput/ExpensesOutput'

export default function RecentExpenses() {
  return (
    <ExpensesOutput expensesPeriod='Last 7 Days' />
  )
}