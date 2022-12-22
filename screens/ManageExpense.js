import { View, StyleSheet } from 'react-native';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { GlobalStyles } from '../constants/styles';
import IconButton from '../components/UI/IconButton';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense, deleteExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

//add two 'modes' of this screen
//if have expense id -> editing
//if no expense id -> adding
//route prop provided by Navigation and can use to extract id parameter
export default function ManageExpense({ route, navigation }) {
  //manage laoding state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();


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
  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      //order of function call doesnt matter since it runs synchronously
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    }
    catch {
      setError('Could not delete expense - please try again');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    //goBack method essentially back button
    navigation.goBack();
  }

  //want to send expense to backend and maybe save local copy of expense
  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      //since same handler for update/add -> first check mode
      if (isEditing) {
        //update data locally first
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        //then send updated data to backend
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        //add extra id field which is same id from backend
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError('Count not save data - please try again later.')
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />
  }

  if (isSubmitting) {
    return <LoadingOverlay />
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