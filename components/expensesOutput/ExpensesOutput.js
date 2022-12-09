import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';


//return summary of all expenses and list of all relevant expense -> expect props
export default function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  //fallbackText is different than expense or expensesPeriod so must add as prop
  let content = <Text style={styles.infoText}>{fallbackText}</Text>

  //if no expenses, display fallback text
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    //take up entire screen
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32
  }
})