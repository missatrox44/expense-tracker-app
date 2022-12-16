import axios from "axios";

//create helper functions that help with sending requests
export function storeExpense(expenseData) {
  //url from firebase database
  axios.post('https://react-native-expenses-7dd1c-default-rtdb.firebaseio.com/expenses.json',
  expenseData);
}


//post request to make new data