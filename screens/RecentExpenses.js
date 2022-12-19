
import React, { useContext, useEffect } from 'react'
import ExpensesOutput from '../components/expensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

export default function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  //useEffect should NOT return a promise
  //nest function into async function to work around that
  useEffect(() => {
    async function getExpenses() {
     const expenses =  await fetchExpenses();
    }
    getExpenses();
  }, [])

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    //include && logic to make sure future expenses cant be inputted (optional)
    return (expense.date >= date7DaysAgo) && (expense.date <= today);

  })
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod='Last 7 Days'
      fallbackText='Saving up for that Kendrick Tour eh?' />
  )
}

//fetch request to view expenses