import { View, Text } from 'react-native'
import React from 'react';

import Input from './Input';

export default function ExpenseForm() {
  //function to register keystrokes and save in some state for later
  function amountChangedHandler() { }

  return (
    <View>
      <Input label='Amount' textInputConfig={{
        keyboardType: 'decimal-pad',
        onChangeText: amountChangedHandler,
      }} />
      <Input label='Date' textInputConfig={{
        placeholder: 'YYYY-MM-DD',
        maxLength: 10,
        onChangeText: () => { }
      }} />
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