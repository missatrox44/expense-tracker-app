import axios from "axios";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

//create helper functions that help with sending requests
export async function storeExpense(expenseData) {
  const response = await axios.post(BACKEND_URL + '/expenses.json',
    expenseData);
  //name property holds auto generated id from firebase
  const id = response.data.name;
  return id;
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


export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}

//post request to make new data

//post and gets return promises