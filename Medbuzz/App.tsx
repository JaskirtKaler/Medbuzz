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
import TempHome from './Screens/TempHome.tsx';
import HomeSVG from './Components/Svg/HomeSVG.tsx';
import ProfileSVG from "./Components/Svg/Profile.tsx";
import Location from './Screens/Location.tsx';
import StateLocation from './Components/Svg/Statelocation.tsx';
import UpdateLicense from './Screens/UpdateLicense.tsx';
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
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import ChangePassword from './Screens/ChangePassword.tsx';




export type RootStackParamList = {
  //goBack(): void;
  //navigate(arg0: string): void;
  Login: undefined;
  Register: undefined;
  RegContinue: undefined; // And other screens if needed
  UploadDoc: { header: string };   // UploadDoc expects a "header" string

};

// Begining on Stack navigation where Login System will begine
function App() {
  
  const Stack = createNativeStackNavigator<any>();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Navigation} />
        <Stack.Screen name="EditProfile" component={EditBasicDetails} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegContinue" component={RegContinue} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Discipline" component={Discipline} />
        <Stack.Screen name="Specialty" component={Specialty} />
        <Stack.Screen name="Certificates" component={Certificates} />
        <Stack.Screen name="Licenses" component={Licenses} />
        <Stack.Screen name="LicenseLocation" component={LicensesLocation} />
        <Stack.Screen name="UserLocation" component={UserLocation} />
        <Stack.Screen name="UpdateLicense" component={UpdateLicense} />
        <Stack.Screen name="UploadDoc"  component={UploadDoc as React.FC<any>} initialParams={{header: "Error"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// this will be the Drawer Navigation
// Beginning of Home Menu Pages
function Navigation(){
  const Drawer = createDrawerNavigator<any>();
  return(
    <Drawer.Navigator initialRouteName="Homepage" screenOptions={{ headerShown: false, drawerPosition: 'right',}} drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Homepage" component={Homepage} options={{drawerIcon: () => <HomeSVG width={30} height={30} color={'#000'} />}} />
        <Drawer.Screen name="Profile" component={Profile} options={{drawerIcon: () => <ProfileSVG width={30} height={30} color={'#000'} />}} />
        <Drawer.Screen name="Location" component={Location} options={{drawerIcon: () => <StateLocation width={30} height={30} color={'#000'} />}} />
    </Drawer.Navigator> 
  );
}

// This Navigation is for the signout button
// Signout API calls will happen here
function CustomDrawerContent(props: any) {
  const navigation = useNavigation<any>();
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
      <DrawerItemList {...props} />
      <View style={{flex: 1}} />
      <DrawerItem
        label="Sign Out"
        labelStyle={{color:'#DB0000'}}
        onPress={() => {
          // Add your sign out logic here
          navigation.navigate('Login')
          console.log('Signed out')
          
        }}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({ });

export default App;
