import { View, Text } from 'react-native'
import React from 'react'

export default function ExpensesSummary({ expenses, periodName }) {

  //find sum of all expenses
  //starting value is 0 (second param)
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount
  }, 0)

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>

  )
}

{/* SUMMARY - period of expenses, total sum of expenses */ }