import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window'); // screen max width and height
import Navigation from '../Components/Navigation';
const TempHome = () => {
  return (
    <View style={styles.main}>
        <View style={styles.header}>
            <Navigation />
        </View>
    {/* <Text>TempHome</Text> */}
    </View>
  )
}
const styles = StyleSheet.create({
    main:{
        width: '100%',
        height: '100%',
    },
    header:{
        width: '100%',
        height: height * 0.1,
        backgroundColor: '#FFF',
        elevation: 5, // This will add a box shadow for Android
        shadowColor: "#000",  // this will add a box shadow for IOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        justifyContent: 'center', 
        alignItems:'flex-end',
        padding: 10,
    },
 });
export default TempHome