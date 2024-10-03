import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window'); // screen max width and height
import HomeSVG from '../Components/Svg/HomeSVG.tsx';
import NavigationBar from '../Components/Svg/NavigationBar.tsx';

const TempHome = () => {
    const navigation = useNavigation<any>();
  return (
    <View style={styles.main}>
        <View style={styles.header}>
            <Text style={{ flex: 1, textAlign: 'center' }}>Temp home screen</Text>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <NavigationBar width={35} height={35} color={'#000'} />
            </TouchableOpacity>
        </View>
        <View style={{flex: 1,alignItems: 'center', justifyContent: 'center',}}>
            <Button 
                title="Back" 
                onPress={() => navigation.goBack()} 
            />
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    main:{
        width: width,
        height: height,
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
        
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
        alignItems:'center',
        padding: 10,
        flexDirection: 'row',
    },
 });
export default TempHome