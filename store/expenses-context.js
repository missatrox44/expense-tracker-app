import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  //initial value - shape of context data
  expenses: [],
  //expect to get data from object
  //methods to update expenses array
  addExpense: ({ description, amount, date }) => { },
  setExpenses: (expenses) => {},
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
      //make sure state updated in immutable way -> put in array
      //action.payload includes id from firebase
      return [action.payload, ...state]
    case 'SET':
       //display expenses in same order as when added
       const inverted = action.payload.reverse();
       return inverted;
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
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    //pass in an action to dispatch
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({type: 'SET', payload: expenses })
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
    setExpenses: setExpenses,
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