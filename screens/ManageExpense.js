import { View, StyleSheet } from 'react-native';
import React, { useContext, useLayoutEffect } from 'react';
import { GlobalStyles } from '../constants/styles';
import IconButton from '../components/UI/IconButton';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense } from '../util/http';

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
  //if id of selected expense is same as edited expense id, then this is the one we want to edit
  const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing]);

  //all three functions should close modal
  //delete also wants to makes api call
  function deleteExpenseHandler() {
    //order of function call doesnt matter since it runs synchronously
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    //goBack method essentially back button
    navigation.goBack();
  }

  //want to send expense to backend and maybe save local copy of expense
  function confirmHandler(expenseData) {
    //since same handler for update/add -> first check mode
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      storeExpense(expenseData);
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
        submitButtonLabel={isEditing ? 'Update' : 'Add'} />
      
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
  }
})