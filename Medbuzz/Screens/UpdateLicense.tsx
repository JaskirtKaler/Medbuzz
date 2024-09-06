import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Dimensions, Modal, TouchableOpacity, ScrollView  } from 'react-native';
const { width, height } = Dimensions.get('window'); // screen max width and height
import Backarrow from '../Components/Svg/Backarrow'
import { useNavigation } from '@react-navigation/native'
import { Dropdown } from 'react-native-element-dropdown';


function UpdateLicense() {
    const navigation = useNavigation<any>(); // Stack Navigation
    const [Licensetype, setLicensetype] = useState("");
   
    //  Label is what is displayed
    //  value is what is passed
    const lisenceType = [
        { label: 'Registered Nurse (RN)', value: 'rn' },
        { label: 'Licensed Practical Nurse (LPN)', value: 'lpn' },
        { label: 'Certified Nursing Assistant (CNA)', value: 'cna' },
        { label: 'Nurse Practitioner (NP)', value: 'np' },
        { label: 'Clinical Nurse Specialist (CNS)', value: 'cns' },
        { label: 'Certified Nurse Midwife (CNM)', value: 'cnm' },
        { label: 'Certified Registered Nurse Anesthetist (CRNA)', value: 'crna' },
        { label: 'Travel Nurse - Registered Nurse (Travel RN)', value: 'travel_rn' },
        { label: 'Travel Nurse - Licensed Practical Nurse (Travel LPN)', value: 'travel_lpn' },
        { label: 'Travel Nurse - Certified Nursing Assistant (Travel CNA)', value: 'travel_cna' },
        { label: 'Travel Nurse - Nurse Practitioner (Travel NP)', value: 'travel_np' },
        { label: 'Travel Nurse - Clinical Nurse Specialist (Travel CNS)', value: 'travel_cns' },
        { label: 'Travel Nurse - Certified Nurse Midwife (Travel CNM)', value: 'travel_cnm' },
        { label: 'Travel Nurse - Certified Registered Nurse Anesthetist (Travel CRNA)', value: 'travel_crna' },
    ];

  return (
        <View style={styles.main}>
        {/* Header Section */}
        <View style={styles.header}>
            <View style={{width : "100%", height : "100%", justifyContent : "center"}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View>
                        <Backarrow width={40} height={40} color={"#000"}/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
            {/* <ScrollView> */}
            {/* add a Licence Sestion */}
                <View style={styles.addLicense}>
                    <Text style={{ fontSize : 24, color : "#000", fontWeight : "600", paddingLeft : 10}}>Add a License</Text>
                    <View style={{ width : "100%", height : "5%"}}></View>
                    <Text style={{ color : "#000", padding : 5}}>Lisence Type</Text>
                    <View style={{width : "100%", height : "5%", flex : 1, justifyContent : 'flex-start', alignItems : 'center'}}>

                    <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={lisenceType} // map data
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select"
                    searchPlaceholder="Search..."
                    value={Licensetype}
                    onChange={item => {
                        setLicensetype(item.value);
                        console.log(Licensetype);
                    }}
                    />

                    </View>
                </View>

            {/* </ScrollView> */}
        </View>

  )
}

export default UpdateLicense

const styles = StyleSheet.create({
    main:{
        width : width,
        height : height,
        backgroundColor: '#',
    },
    header:{
        width : "100%",
        height : height * 0.1,
        backgroundColor: '#FFF',
        elevation: 5, // This will add a box shadow for Android
        shadowColor: "#000",  // this will add a box shadow for IOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84, 
        padding : 10,
    },
    addLicense:{
        width : "100%",
        height : "70%",
        padding : 15,
        paddingTop : 30, 

    },
    // drop down css
    dropdown: {
        // marginLeft: 15,
        // marginRight: "8%",
        width : "100%",
        height: "15%",
        borderBottomWidth: 0.5,
        borderWidth: 1,
        borderColor: '#B8AEAE',
        borderRadius: 10,
        backgroundColor: '#FFF',
        elevation: 5, // This will add a box shadow for Android
        shadowColor: "#000",  // this will add a box shadow for IOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84, 
    },
    placeholderStyle: {
        fontSize: 16,
        paddingLeft: 5
    },
    selectedTextStyle: {
        color: 'black',
        fontSize: 16,
        paddingLeft: 5
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
});