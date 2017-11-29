import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import DisappearanciesView from './components/DisappearanciesView.ios.js';
import LoginView from './components/LoginView.ios.js';
import OrdersView from './components/OrdersView.ios.js';
import RegistrationView from './components/RegistrationView.ios.js';
import ResetpassView from './components/ResetpassView.ios.js';


const DisappearanciesScreen = ({ navigation }) => (
  <DisappearanciesView navigation={navigation} />
);
const LoginScreen = ({ navigation }) => (
  <LoginView navigation={navigation} />
);
const RegistrationScreen = ({ navigation }) => (
  <RegistrationView navigation={navigation} />
);
const ResetpassScreen = () => (
  <ResetpassView />
);

const OrdersScreen = ({ navigation }) => (
  <OrdersView navigation={navigation}  />
);

const App = StackNavigator(
  {
    Disappearancies: {
      screen: DisappearanciesScreen,
      navigationOptions: {
        headerTitle: 'Список потерянных',
      },
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerTitle: 'LOGIN',
      },
    },
    Registration: {
      screen: RegistrationScreen,
      navigationOptions: {
        headerTitle: 'REGISTRATION',
      },
    },
    Resetpass: {
      screen: ResetpassScreen,
      navigationOptions: {
        headerTitle: 'RESET PASSWORD',
      },
    },
    Orders: {
      screen: OrdersScreen,
      navigationOptions: {
        headerTitle: 'ORDERS',
      },
    },
  },
  {
    headerMode: 'float',
    //mode: 'modal',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF',
        //borderRadius: 0,
        opacity: 1,
      },
      headerTitleStyle: {
        fontFamily: 'GillSans',
        fontWeight: '100',
        fontSize: 18,
        color: '#114B5F', //#F45B69
      },
    },
  },
);

export default App;
