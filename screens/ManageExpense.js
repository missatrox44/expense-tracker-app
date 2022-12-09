import { View, StyleSheet } from 'react-native';
import React, { useContext, useLayoutEffect } from 'react';
import { GlobalStyles } from '../constants/styles';
import IconButton from '../components/UI/IconButton';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses-context';

//add two 'modes' of this screen
//if have expense id -> editing
//if no expense id -> adding
//route prop provided by Navigation and can use to extract id parameter
export default function ManageExpense({ route, navigation }) {
  //create context reference here to access handler functions
  const expensesCtx = useContext(ExpensesContext);
  //find out why it was to open: edit or add?
  //if params defined get expenseId
  const editedExpenseId = route.params?.expenseId
  //convert to boolean (TRUE if editing FALSE otherwise)
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing]);

  //all three functions should close modal
  function deleteExpenseHandler() {
    //order of function call doesnt matter since it runs synchronously
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
    
  }

  function cancelHandler() {
    //goBack method essentially back button
    navigation.goBack();
  }

  function confirmHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={cancelHandler}>Cancel</Button>
        <Button style={styles.button} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler} />
        </View>
      )}
    </View>
  )
}

//want to add three buttons
//1. close modal w/o doing anything
//2. close modal while adding new element
//3. deleting expense


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
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