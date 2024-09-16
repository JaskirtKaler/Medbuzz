/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import ProfileSVG from './Components/Svg/Profile.tsx';
import Location from './Screens/Location.tsx';
import StateLocation from './Components/Svg/Statelocation.tsx';
import Message from './Components/Svg/Message.tsx';
import MessagePage from './Screens/MessagePage.tsx';
import LoadingScreen from './Screens/LoadingScreen.tsx';
import MyJobsPage from './Screens/MyJobs.tsx';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import ChangePassword from './Screens/ChangePassword.tsx';

// Import the image for the "My Jobs" icon
const myJobsIcon = require('./SVG/myJobs.png');

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  RegContinue: undefined;
  Homepage: undefined;
  MyJobs: undefined;
};

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
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen
          name="MyJobs"
          component={MyJobsPage}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: '', // Remove the title
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Homepage')} style={{ marginLeft: 10 }}>
                <Image source={require('./SVG/back-arrow.png')} style={{ width: 30, height: 30 }} />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Navigation() {
  const Drawer = createDrawerNavigator<any>();
  return (
    <Drawer.Navigator
      initialRouteName="Homepage"
      screenOptions={({ route }) => ({
        headerShown: route.name !== 'Homepage', // Show header only on "My Jobs" page
        drawerPosition: 'right',
      })}
    >
      <Drawer.Screen
        name="Homepage"
        component={Homepage}
        options={{ drawerIcon: () => <HomeSVG width={30} height={30} color={'#000'} /> }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ drawerIcon: () => <ProfileSVG width={30} height={30} color={'#000'} /> }}
      />
      <Drawer.Screen name="Location" component={Location} options={{drawerIcon: () => <StateLocation width={30} height={30} color={'#000'} />}} />
      <Drawer.Screen name="Messages" component={MessagePage} options={{drawerIcon: () => <Message width={30} height={30} color={'#000'} />}} />
      <Drawer.Screen
        name="My Jobs"
        component={MyJobsPage}
        options={({ navigation }) => ({ // Ensure 'navigation' is passed correctly here
          drawerIcon: () => (
            <Image 
              source={myJobsIcon} 
              style={{ width: 30, height: 30 }} 
              resizeMode="contain"
            />
          ),
          headerShown: true,
          headerTitle: '', // Remove the title from "My Jobs" page
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Homepage')} style={{ marginLeft: 10 }}>
              <Image source={require('./SVG/back-arrow.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          ),
        })}
      />
    </Drawer.Navigator>
  );
}

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
          navigation.navigate('Login');
          console.log('Signed out');
        }}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({ });

export default App;
