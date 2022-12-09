import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2022-12-08')
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

export const ExpensesContext = createContext({
  //initial value - shape of context data
  expenses: [],
  //expect to get data from object
  //methods to update expenses array
  addExpense: ({ description, amount, date }) => { },
  deleteExpense: (id) => { },
  updateExpense: (id, { description, amount, date }) => { },
});

//logic for state management
//job of reducer function is to always return a new state value!!!!!!
function expensesReducer(state, action) {
  //check type of action received
  //must match dispatch function (could be type, mode, kind etc)

  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      //make sure state updated in immutable way -> put in array
      return [{ ...action.payload, id: id }, ...state]
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id);
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

//provider function that will hold logic
function ExpensesContextProvider({ children }) {
  //hook for complex state management
  //connect expenseReducer function to useReducer:
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    //pass in an action to dispatch
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  //make available for all interested components
  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  };

  return (
    <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
  )
}


export default ExpensesContextProvider;

//useReducer needs reducer function
//payload - data received