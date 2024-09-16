import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Nav from './Svg/NavigationBar.tsx'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TempHome from '../Screens/TempHome.tsx';
import Profile from '../Screens/Profile.tsx';
import MessagePage from '../Screens/MessagePage.tsx';



const Drawer = createDrawerNavigator();


const Navigation = () => {
  return (
    <Drawer.Navigator initialRouteName="TempHome" screenOptions={{ drawerType: 'back', drawerPosition: 'right',}}>
        <Drawer.Screen name="TempHome" component={TempHome} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Messages" component={MessagePage} />
    </Drawer.Navigator> 

  )
}
const styles = StyleSheet.create({
    main:{
        flex: 1, 
    },
    navBar: {
        position: 'absolute',
        width: '80%',
        height: Dimensions.get('window').height, // Full height of the screen
        backgroundColor: '#fff',
        zIndex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
 });
export default Navigation