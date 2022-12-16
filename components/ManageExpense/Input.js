import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles';

//view around label and custom input container
//label should be configurable -> destructure props
export default function Input({ label, invalid, style, textInputConfig }) {
  //set to array of styles
  const inputStyles = [styles.input];
  //push multiline style to array of styles IF multiline input true
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline)
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput)
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

//textInputConfig all custom properties as object

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700
  },
  //only apply this style if multiline
  inputMultiline: {
    minHeight: 100,
    //sets same look/behaviors on both platforms
    textAlignVertical: 'top'
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
   backgroundColor: GlobalStyles.colors.error50
  }
})