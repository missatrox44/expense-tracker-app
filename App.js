import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';

//holds object with two components -> navigator component and one to register screens
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

//nested navigation component
function ExpensesOverview() {
  //use screenOptions to style BOTH tabs to have same styles
  //screenoptions can also take in function and return configuration object
  return <BottomTabs.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({ tintColor }) => (
        <IconButton
          icon='add'
          size={24}
          color={tintColor}
          // plus icon can open manageExpense screen
          onPress={() => {
            navigation.navigate('ManageExpense');
          }}
        />
      ),
    })}>
    <BottomTabs.Screen
      name='RecentExpenses'
      component={RecentExpenses}
      options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent Expenses',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='hourglass' size={size} color={color} />
        ),
      }} />
    <BottomTabs.Screen
      name='AllExpenses'
      component={AllExpenses}
      options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='calendar' size={size} color={color} />
        ),
      }} />
  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white'
          }}>
            <Stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={{ headerShown: false }} />
            <Stack.Screen name='ManageExpense' component={ManageExpense} options={{
              // allows how screen is loaded
              presentation: 'modal'
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>


  );
}

