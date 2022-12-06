import { View, StyleSheet } from 'react-native';
import React from 'react';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';

//will receive future expenses from props though recentExpenses and AllExpenses components
const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-10-04')
  },
  {
    id: 'e2',
    description: 'Macbook',
    amount: 2000.00,
    date: new Date('2022-11-14')
  },
  {
    id: 'e3',
    description: 'Cocktail Dress',
    amount: 85.98,
    date: new Date('2022-12-05')
  },
  {
    id: 'e4',
    description: 'Bunch of bananas',
    amount: 4.99,
    date: new Date('2021-03-08')
  },
  {
    id: 'e5',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19')
  },
  {
    id: 'e6',
    description: 'Another book',
    amount: 38.89,
    date: new Date('2022-07-23')
  },
  {
    id: 'e7',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-10-04')
  },
  {
    id: 'e8',
    description: 'Macbook',
    amount: 2000.00,
    date: new Date('2022-11-14')
  },
  {
    id: 'e9',
    description: 'Cocktail Dress',
    amount: 85.98,
    date: new Date('2022-12-05')
  },
  {
    id: 'e10',
    description: 'Bunch of bananas',
    amount: 4.99,
    date: new Date('2021-03-08')
  },
  {
    id: 'e11',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19')
  },
  {
    id: 'e12',
    description: 'Another book',
    amount: 38.89,
    date: new Date('2022-07-23')
  },
];

//return summary of all expenses and list of all relevant expense -> expect props
export default function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
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
  }
})