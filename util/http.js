import axios from "axios";

const BACKEND_URL = 'https://react-native-expenses-7dd1c-default-rtdb.firebaseio.com'

//create helper functions that help with sending requests
export function storeExpense(expenseData) {
  //url from firebase database
  axios.post(BACKEND_URL + '/expenses.json',
    expenseData);
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + '/expenses.json');
  //next line will execute once response is there
  //transform data from firebase into an array of objects that have the format we want to have
  const expenses = [];
  //console.log UNTRANSFORMED data:
  // console.log(response.data) 
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    };
    expenses.push(expenseObj);
  }
  return expenses;
}


//post request to make new data

//post and gets return promises