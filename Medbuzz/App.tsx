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
import TempHome from './Screens/TempHome.tsx';
import HomeSVG from './Components/Svg/HomeSVG.tsx';
import ProfileSVG from "./Components/Svg/Profile.tsx";
import 'react-native-gesture-handler';
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
import { createDrawerNavigator } from '@react-navigation/drawer';




export type RootStackParamList = {
  //goBack(): void;
  //navigate(arg0: string): void;
  Login: undefined;
  Register: undefined;
  RegContinue: undefined; // And other screens if needed
};


// Begining on Stack navigation where Login System will begine
function App() {
  const Stack = createNativeStackNavigator<any>();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Navigation} />
        {/* <Stack.Screen name="Register" component={Register} /> */}
        {/* <Stack.Screen name="RegContinue" component={RegContinue} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// this will be the Drawer Navigation
// Beginning of Home Menu Pages
function Navigation(){
  const Drawer = createDrawerNavigator<any>();
  return(
    <Drawer.Navigator initialRouteName="TempHome" screenOptions={{ headerShown: false, drawerPosition: 'right',}}>
        <Drawer.Screen name="TempHome" component={TempHome} options={{drawerIcon: () => <HomeSVG width={30} height={30} color={'#000'} />}} />
        <Drawer.Screen name="Profile" component={Profile} options={{drawerIcon: () => <ProfileSVG width={30} height={30} color={'#000'} />}} />
    </Drawer.Navigator> 
  );
}

const styles = StyleSheet.create({ });

export default App;
