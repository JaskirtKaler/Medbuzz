/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Button, StyleSheet, View, Text, ScrollView, TextInput, Touchable, TouchableOpacity, Dimensions } from 'react-native';
import React, {useState} from 'react';
import NavigationBar from '../Components/Svg/NavigationBar.tsx';
import { DrawerActions, useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window'); // screen max width and height
// properties for Job component
type JobProps = {
    jobType: string;
    companyName: string;
    jobText: string
}

// creation of the Job component
const Job = (props: JobProps) => {
    return (
        
        <View style={styles.jobStyle}>
            <View>
                <Text style={{color: 'black', fontSize: 24, marginLeft: 10}}>{props.jobType}</Text>
                <Text style={{color: 'black', marginLeft: 15, fontSize: 16}}>{props.companyName}</Text>
            </View>
            <Text style={styles.jobTextStyle}>{props.jobText}</Text>
            <TouchableOpacity style={styles.detailsButton}>
                <Text style={{padding: 5, color: 'black'}}>Click for more details</Text>
            </TouchableOpacity>
        </View>        
    )
}


const Homepage = () => {
    const navigation = useNavigation<any>();
    // Create an array of 25 Jobs
    const myJobsArray = Array.from({ length: 25 }, (_, i) => (
        <Job 
            key={i} 
            jobType="Job Type" 
            companyName="Company" 
            jobText="Some Text about said job"
        />
    ));

    return (
        <ScrollView style={styles.containerStyle}>

            {/* Header with search bar*/ }
            <View style={styles.headerStyle}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <TextInput placeholder="Search" placeholderTextColor='gray' style={styles.searchStyle}></TextInput>
                </View>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <NavigationBar width={35} height={35} color={'#000'} />
                </TouchableOpacity>
            </View>

            {/* Job Feed title */}
            <Text style={styles.jobFeedStyle}>Job Feed</Text>

            {/* Jobs array diplaying 25 jobs */}
            <View>{myJobsArray}</View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white', 
        flex: 1,
    },

    jobFeedStyle: {
      color:'black', 
      fontSize: 24, 
      textAlign: 'center', 
      marginTop:10, 
      marginBottom: 10
    },

    jobStyle: {
        backgroundColor: 'white',
        width: '85%', 
        height: 200, 
        justifyContent: 'space-around', 
        //borderWidth: 1, 
        borderColor: "black", 
        borderRadius: 10, 
        alignSelf: 'center', 
        marginBottom: 30,
        elevation: 10, // This will add a box shadow for Android
        shadowColor: "#000",  // this will add a box shadow for IOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    jobTextStyle: {
        width: '90%', 
        height: '30%', 
        backgroundColor: '#D9D9D9', 
        color: 'black', 
        textAlign: 'center', 
        alignSelf: 'center', 
        padding: 20
    },
    
    detailsButton: {
        width: '90%', 
        height: '15%', 
        backgroundColor: "#0EA68D", 
        alignItems: "center", 
        alignSelf: 'center',
        borderRadius: 10, 
        marginBottom: 5
    }, 

    headerStyle: {
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

    searchStyle: {
        backgroundColor: 'white',
        borderColor: 'black', 
        borderWidth: 0.5, 
        borderRadius: 12,
        elevation: 8, // This will add a box shadow for Android
        shadowColor: "#000",  // this will add a box shadow for IOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: '70%',  
    }
 });

export default Homepage