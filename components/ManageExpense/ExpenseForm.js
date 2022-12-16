import { View, StyleSheet, Text, Alert } from 'react-native'
import { useState } from 'react';

import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';

export default function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  //when you fetch input value -> it is a string no matter what
  //set three different inputValue types instead of creating three slices of state w/ each
  //set isValid: true to ensure that error message wont render when initially adding a new item. validity is checked when user submits form anyway
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true
    }
  });

  //function to register keystrokes and save in some state for later
  //inputIdentifier refers to amount/date/description
  //inputIdentifer in brackets allows to set and target a property dynamically
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true }
      };
    });
  }

  //collect all input values and transform them
  function submitHandler() {
    const expenseData = {
      //converts string to number
      amount: +inputs.amount.value,
      //converts string input to date value
      date: new Date(inputs.date.value),
      description: inputs.description.value
    };
    //add validation - helper constants
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: { value: curInputs.description.value, isValid: descriptionIsValid }
        }
      })
      return;
    }

    onSubmit(expenseData);
  }

  //helper const to check if any of the inputs are invalid
  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Enter Expense Deets Below</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label='Amount'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            //pre-configure function for future execution by bind method
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            //set up two way binding 
            value: inputs.amount.value
          }} />
        <Input
          style={styles.rowInput}
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputs.date.value,
          }} />
      </View>
      <Input label='Description' textInputConfig={{
        multiline: true,
        onChangeText: inputChangedHandler.bind(this, 'description'),
        value: inputs.description.value,
      }} />
      {formIsInvalid && <Text>Invalid input values - please check your entered data!</Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
        <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
      </View>
    </View>
  )
}

//refer to docs to see all props supported by TextInput
//https://reactnative.dev/docs/textinput

// autoCorrect: false, //default is true
//  autoCapitalize: 'sentences' -> default


const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1
  },
  form: {
    marginTop: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
})


