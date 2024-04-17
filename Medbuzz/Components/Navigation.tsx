import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Nav from './Svg/NavigationBar.tsx'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TempHome from '../Screens/TempHome.tsx';
import Profile from '../Screens/Profile.tsx';
const Drawer = createDrawerNavigator();


const Navigation = () => {
    const [navAnimation] = useState(new Animated.Value(-Dimensions.get('window').width * 0.8));
    const handleNav = () => {
        Animated.timing(navAnimation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
        
      }

  return (
    // <View style={styles.main}>
    //     <TouchableOpacity onPress={handleNav}>
    //         <Nav width={50} height={50} fill={'#0EA68D'} />
    //     </TouchableOpacity>
    //      <Drawer.Navigator initialRouteName="Home">
    //         <Drawer.Screen name="Home" component={TempHome} />
    //         <Drawer.Screen name="Profile" component={Profile} />
        
    //     </Drawer.Navigator> 
    //      <Animated.View style={[styles.navBar, { transform: [{ translateX: navAnimation }] }]}>
       
    //     </Animated.View> 
    // </View> 
    <Drawer.Navigator initialRouteName="Home" screenOptions={{ drawerType: 'back', drawerPosition: 'right',}}>
        <Drawer.Screen name="Home" component={TempHome} />
        <Drawer.Screen name="Profile" component={Profile} />
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