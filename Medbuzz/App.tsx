/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './Screens/Login.tsx';
import Register from './Screens/Register';
import RegContinue from './Screens/RegContinue.tsx';
import ForgotPassword from './Screens/ForgotPassword.tsx';
import ResetPassword from './Screens/ResetPassword.tsx';
import Specialty from './Screens/Specialty.tsx';
import Certificates from './Screens/Certificates.tsx';
import UploadDoc from './Screens/UploadDoc.tsx';
import Discipline from './Screens/Discipline.tsx';
import EditBasicDetails from './Screens/EditBasicDetails.tsx';
import Licenses from './Screens/Licenses.tsx';
import UserLocation from './Screens/UserLocation.tsx';
import LicensesLocation from './Screens/LicenseLocation.tsx';
import Profile from './Screens/Profile.tsx';
import Homepage from './Screens/Homepage.tsx';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';


// import { Not sure if there is needed
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  //goBack(): void;
  //navigate(arg0: string): void;
  Login: undefined;
  Register: undefined;
  RegContinue: undefined; // And other screens if needed
};



function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegContinue" component={RegContinue} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
