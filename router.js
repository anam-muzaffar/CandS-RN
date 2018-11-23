import React, {Component} from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator ,createSwitchNavigator} from 'react-navigation'; // Version can be specified in package.json
//Auth
import Login from './screens/Auth/Login';
import SignUp from './screens/Auth/SignUp';
import LoginAdmin from './screens/Auth/LoginAdmin';
import ForgotPassword from './screens/Auth/ForgotPassword';
//Admin
import AdminHome from './screens/Admin/AdminHome';
import AdminAccount from './screens/Admin/AdminAccount';
import Orders from './screens/Admin/Orders';
import UpdateDesigns from './screens/Admin/UpdateDesigns';
//User
import Home from './screens/User/Home';
import Design from './screens/User/Design';
import ContactUs from './screens/User/ContactUs';
import MyAccount from './screens/User/MyAccount';
import PlaceOrder from './screens/User/PlaceOrder';
import Measurement from './screens/User/Measurement';

export const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
  },
  SignUp: {
    screen: SignUp,
  },
  LoginAdmin: {
    screen: LoginAdmin,
  },
  ForgotPassword: {
    screen: ForgotPassword,
  },
},
 {
  initialRouteName: 'Login',
  navigationOptions: { header: null,}
});

export const AdminStack = createStackNavigator({
  AdminHome: {
    screen: AdminHome,
  },
  AdminAccount: {
    screen: AdminAccount,
  },
  Orders: {
    screen: Orders,
  },
  UpdateDesigns: {
    screen: UpdateDesigns,
  },
}, {
  initialRouteName: 'AdminHome',
  navigationOptions: { header: null,}
});

export const UserStack = createStackNavigator({
  User: {
    screen: Home,
  },
  Design: {
    screen: Design,
  },
  ContactUs: {
    screen: ContactUs,
  },
  MyAccount: {
    screen: MyAccount,
  },
  Measurement: {
    screen: Measurement,
  },
  PlaceOrder: {
    screen: PlaceOrder,
  },
},
 {
  initialRouteName: 'User',
  navigationOptions: { header: null,}
});

export const Router = createSwitchNavigator({
  Auth: {
    screen: AuthStack,
  },
  Admin: {
    screen: AdminStack,
  },
  User: {
    screen: UserStack,
  },
  ForgotPassword: {
    screen: ForgotPassword,
  },
},
 {
  initialRouteName: 'Auth',
  navigationOptions: { header: null,}
});
