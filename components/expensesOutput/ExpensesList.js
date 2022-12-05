import { View, Text, FlatList } from 'react-native'
import React from 'react'

//access to single item in array
function renderExpenseItem(itemData) {
  return (
    <Text>{itemData.item.description}</Text>
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