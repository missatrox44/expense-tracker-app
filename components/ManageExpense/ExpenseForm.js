import { View, StyleSheet, Text } from 'react-native'
import React from 'react';

import Input from './Input';

export default function ExpenseForm() {
  //function to register keystrokes and save in some state for later
  function amountChangedHandler() { }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Enter Expense Deets Below</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label='Amount'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: amountChangedHandler,
          }} />
        <Input
          style={styles.rowInput}
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: () => { }
          }} />
      </View>
      <Input label='Description' textInputConfig={{
        multiline: true,
      }} />
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
  }
})