/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './Screens/Login.tsx';
import { StackNavigationProp } from '@react-navigation/stack';
import Login from './Screens/Login.tsx'
import UploadDoc from './Screens/UploadDoc.tsx'
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
import ForgotPassword from './Screens/ForgotPassword..tsx';
import ResetPassword from './Screens/ResetPassword.tsx';
import Specialty from './Screens/Specialty.tsx';
import Certificates from './Screens/Certificates.tsx';


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

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}> 
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

export default App;
