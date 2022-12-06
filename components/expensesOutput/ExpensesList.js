import { FlatList } from 'react-native'
import React from 'react'
import ExpenseItem from './ExpenseItem'

//access to single item in array
function renderExpenseItem(itemData) {
  return (
    <ExpenseItem {...itemData.item} />
  )
}

export default function ExpensesList({expenses}) {
  return (
    <FlatList 
    data={expenses} 
    renderItem={renderExpenseItem} 
    keyExtractor={(item) => item.id} />
  )
}