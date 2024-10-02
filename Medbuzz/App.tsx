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
import UpdateLicense from './Screens/UpdateLicense.tsx';
import JobInfo from './Screens/JobInfo.tsx';
import 'react-native-gesture-handler';
import SaveSVG from './Components/Svg/SaveSvg.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import Backarrow from './Components/Svg/Backarrow.tsx';

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
import JobPosting from './Screens/JobPosting.tsx';

// Import the image for the "My Jobs" icon
const myJobsIcon = require('./SVG/myJobs.png');

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  RegContinue: undefined;
  Homepage: undefined;
  MyJobs: undefined;
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
        <Stack.Screen name="JobPosting" component={JobPosting}/>
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen
          name="MyJobs"
          component={MyJobsPage}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: '', // Remove the title
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Homepage')} style={{ marginLeft: 10 }}>
                {/* Replace Image with Backarrow SVG */}
                <Backarrow width={45} height={45} color={'#000'} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="UpdateLicense" component={UpdateLicense} />
        <Stack.Screen name="UploadDoc"  component={UploadDoc as React.FC<any>} initialParams={{header: "Error"}} />
        <Stack.Screen name="JobInfo" component={JobInfo} />
        <Stack.Screen name="MessagePage" component={MessagePage} />
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
        headerShown: false, // DO NOT change this
        drawerPosition: 'right',
      })}
      drawerContent={props => <CustomDrawerContent {...props} />}
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
      <Drawer.Screen name="Messages" component={MessagePage} options={{drawerIcon: () => <Message width={30} height={30} color={'#000'} />}} />
      <Drawer.Screen name="Location" component={Location} options={{drawerIcon: () => <StateLocation width={30} height={30} color={'#000'} />}} />
      <Drawer.Screen
        name="My Jobs"
        component={MyJobsPage}
        options={({ navigation }) => ({
          drawerIcon: () => (
            <View style={{ marginLeft: -9 }}>
              <SaveSVG width={40} height={40} color={'#000'} />
            </View>
          ),
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Homepage')} style={{ marginLeft: 10 }}>
              {/* Use Backarrow SVG instead of the PNG */}
              <Backarrow width={40} height={40} color={'#000'} />
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
