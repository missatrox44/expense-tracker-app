import { View, Text, TextInput } from 'react-native'
import React from 'react'

//view around label and custom input container
//label should be configurable -> destructure props
export default function Input({ label, textInputConfig }) {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput {...textInputConfig} />
    </View>
  );
}

//textInputConfig all custom properties as object