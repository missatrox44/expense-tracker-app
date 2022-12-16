import { View, StyleSheet, Text } from 'react-native'
import { useState } from 'react';

import Input from './Input';
import Button from '../UI/Button';

export default function ExpenseForm({onCancel, onSubmit, submitButtonLabel}) {
  //when you fetch input value -> it is a string no matter what
  //set three different inputValue types instead of creating three slices of state w/ each
const [inputValues, setInputValues] = useState({
  amount: '',
  date: '',
  description: ''
});

  //function to register keystrokes and save in some state for later
  //inputIdentifier refers to amount/date/description
  //inputIdentifer in brackets allows to set and target a property dynamically
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue
      }
    });
   }

   function submitHandler() {}
 

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
            value: inputValues.amount
          }} />
        <Input
          style={styles.rowInput}
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputValues.date,
          }} />
      </View>
      <Input label='Description' textInputConfig={{
        multiline: true,
        onChangeText: inputChangedHandler.bind(this, 'description'),
        value: inputValues.description,
      }} />
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


