
import React, { useContext, useEffect, useState } from 'react'
import ExpensesOutput from '../components/expensesOutput/ExpensesOutput'
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

export default function RecentExpenses() {
  //local state to find out if loading data or not
  //call state in useEffect
  const [isFetching, setIsFetching] = useState(true)


  const expensesCtx = useContext(ExpensesContext);
  // const [fetchedExpenses, setFetchedExpenses] = useState([]);

  //useEffect should NOT return a promise
  //nest function into async function to work around that
  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      const expenses = await fetchExpenses();
      setIsFetching(false);
      expensesCtx.setExpenses(expenses);
    }
    getExpenses();
  }, [])

  //render spinner if still fetching data
  if (isFetching){
    return <LoadingOverlay />
  }

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