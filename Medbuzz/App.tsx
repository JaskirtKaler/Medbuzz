import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from './Auth/Login.tsx';
import Register from './Auth/Register.tsx';
import RegContinue from './Auth/RegContinue.tsx';
import ForgotPassword from './Auth/ForgotPassword.tsx';
import ResetPassword from './Auth/ResetPassword.tsx';
import Certificates from './SurveyPages/Certificates.tsx';
import UploadDoc from './Screens/UploadDoc.tsx';
import Discipline from './SurveyPages/Discipline.tsx';
import EditBasicDetails from './UserInfo/EditBasicDetails.tsx';
import Licenses from './SurveyPages/Licenses.tsx';
import UserLocation from './SurveyPages/UserLocation.tsx';
import LicensesLocation from './SurveyPages/LicenseLocation.tsx';
import Profile from './UserInfo/Profile.tsx';
import Homepage from './Screens/Homepage.tsx';
import HomeSVG from './Components/Svg/HomeSVG.tsx';
import ProfileSVG from './Components/Svg/Profile.tsx';
import Location from './UserInfo/Location.tsx';
import StateLocation from './Components/Svg/Statelocation.tsx';
import Message from './Components/Svg/Message.tsx';
import MessagePage from './Screens/MessagePage.tsx';
import LoadingScreen from './Screens/LoadingScreen.tsx';
import MyJobsPage from './Screens/MyJobs.tsx';
import UpdateLicense from './UserInfo/UpdateLicense.tsx';
import JobInfo from './Screens/JobInfo.tsx';
import Inbox from './Screens/Inbox.tsx';
import 'react-native-gesture-handler';
import SaveSVG from './Components/Svg/SaveSvg.tsx';
import { UnreadMessagesContextProvider } from './Components/Utility/UnreadMessagesContext';

import Backarrow from './Components/Svg/Backarrow.tsx';
import SignInSignUp from './Auth/SignInSignUp.tsx'
import {StyleSheet, View, TouchableOpacity, Platform,} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import ChangePassword from './Auth/ChangePassword.tsx';
import JobPosting from './Screens/JobPosting.tsx';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  RegContinue: undefined;
  Homepage: undefined;
  MyJobs: undefined;
  UploadDoc: {header: string}; // UploadDoc expects a "header" string
};

// Begining on Stack navigation where Login System will begine
function App() {
  const Stack = createNativeStackNavigator<any>();
  return (
    <UnreadMessagesContextProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="SignInSignUp" component={SignInSignUp} /> */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Navigation} />
        <Stack.Screen name="EditBasicDetails" component={EditBasicDetails} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegContinue" component={RegContinue} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Discipline" component={Discipline} />
        <Stack.Screen name="Certificates" component={Certificates} />
        <Stack.Screen name="Licenses" component={Licenses} />
        <Stack.Screen name="LicenseLocation" component={LicensesLocation} />
        <Stack.Screen name="UserLocation" component={UserLocation} />
        <Stack.Screen name="JobPosting" component={JobPosting} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen
          name="MyJobs"
          component={MyJobsPage}
          options={({navigation}) => ({
            headerShown: true,
            headerTitle: '', // Remove the title
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Homepage')}
                style={{marginLeft: 10}}>
                {/* Replace Image with Backarrow SVG */}
                <Backarrow width={45} height={45} color={'#000'} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="UpdateLicense" component={UpdateLicense} />
        <Stack.Screen
          name="UploadDoc"
          component={UploadDoc as React.FC<any>}
          initialParams={{header: 'Error'}}
        />
        <Stack.Screen name="JobInfo" component={JobInfo} />
        <Stack.Screen name="MessagePage" component={MessagePage} />
        <Stack.Screen name="Inbox" component={Inbox} />
      </Stack.Navigator>
    </NavigationContainer>
    </UnreadMessagesContextProvider>

  );
}

function Navigation() {
  const Drawer = createDrawerNavigator<any>();
  return (
    <Drawer.Navigator
      initialRouteName="Homepage"
      screenOptions={({route}) => ({
        headerShown: false, // DO NOT change this
        drawerPosition: 'right',
        drawerType: 'front',
      })}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Homepage"
        component={Homepage}
        options={{
          drawerIcon: () => <HomeSVG width={30} height={30} color={'#000'} />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: () => (
            <ProfileSVG width={30} height={30} color={'#000'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Messages"
        component={MessagePage}
        options={{
          drawerIcon: () => <Message width={30} height={30} color={'#000'} />,
        }}
      />
      <Drawer.Screen
        name="Location"
        component={Location}
        options={{
          drawerIcon: () => (
            <StateLocation width={30} height={30} color={'#000'} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Jobs"
        component={MyJobsPage}
        options={({navigation}) => ({
          drawerIcon: () => (
            <View style={{marginLeft: -9}}>
              <SaveSVG width={40} height={40} color={'#000'} />
            </View>
          ),
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Homepage')}
              style={{marginLeft: 10}}>
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
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <DrawerItemList {...props} />
      <View style={{flex: 1}} />
      <DrawerItem
        label="Sign Out"
        labelStyle={{color: '#DB0000'}}
        onPress={() => {
          navigation.navigate('Login');
          console.log('Signed out');
        }}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({});

export default App;
