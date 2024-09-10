import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Dimensions, Modal, TouchableOpacity, ScrollView, TextInput  } from 'react-native';
const { width, height } = Dimensions.get('window'); // screen max width and height
import Backarrow from '../Components/Svg/Backarrow'
import { useNavigation } from '@react-navigation/native'
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';

import Calender from '../Components/Svg/Calender.tsx';
function UpdateLicense() {
    const navigation = useNavigation<any>(); // Stack Navigation
    // License for the selected license type in the dropdown
    const [Licensetype, setLicensetype] = useState("");
    // State for the selected state in the dropdown
    const [selectedState, setSelectedState] = useState("");
    const [licenseNumber, setLicenseNumber] = useState('');
    const [isFocused, setIsFocused] = useState(false);



    const isValidLength = licenseNumber.length === 9; // Assuming 9 digits as the valid length
    const handleInputChange = (text: string) => {
      // Ensure only numeric values are entered
      const numericValue = text.replace(/[^0-9]/g, '');
      setLicenseNumber(numericValue);
    };
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
    const usaStates = [
        { label: "Alabama", value: "Alabama" },
        { label: "Alaska", value: "Alaska" },
        { label: "Arizona", value: "Arizona" },
        { label: "Arkansas", value: "Arkansas" },
        { label: "California", value: "California" },
        { label: "Colorado", value: "Colorado" },
        { label: "Connecticut", value: "Connecticut" },
        { label: "Delaware", value: "Delaware" },
        { label: "Florida", value: "Florida" },
        { label: "Georgia", value: "Georgia" },
        { label: "Hawaii", value: "Hawaii" },
        { label: "Idaho", value: "Idaho" },
        { label: "Illinois", value: "Illinois" },
        { label: "Indiana", value: "Indiana" },
        { label: "Iowa", value: "Iowa" },
        { label: "Kansas", value: "Kansas" },
        { label: "Kentucky", value: "Kentucky" },
        { label: "Louisiana", value: "Louisiana" },
        { label: "Maine", value: "Maine" },
        { label: "Maryland", value: "Maryland" },
        { label: "Massachusetts", value: "Massachusetts" },
        { label: "Michigan", value: "Michigan" },
        { label: "Minnesota", value: "Minnesota" },
        { label: "Mississippi", value: "Mississippi" },
        { label: "Missouri", value: "Missouri" },
        { label: "Montana", value: "Montana" },
        { label: "Nebraska", value: "Nebraska" },
        { label: "Nevada", value: "Nevada" },
        { label: "New Hampshire", value: "New Hampshire" },
        { label: "New Jersey", value: "New Jersey" },
        { label: "New Mexico", value: "New Mexico" },
        { label: "New York", value: "New York" },
        { label: "North Carolina", value: "North Carolina" },
        { label: "North Dakota", value: "North Dakota" },
        { label: "Ohio", value: "Ohio" },
        { label: "Oklahoma", value: "Oklahoma" },
        { label: "Oregon", value: "Oregon" },
        { label: "Pennsylvania", value: "Pennsylvania" },
        { label: "Rhode Island", value: "Rhode Island" },
        { label: "South Carolina", value: "South Carolina" },
        { label: "South Dakota", value: "South Dakota" },
        { label: "Tennessee", value: "Tennessee" },
        { label: "Texas", value: "Texas" },
        { label: "Utah", value: "Utah" },
        { label: "Vermont", value: "Vermont" },
        { label: "Virginia", value: "Virginia" },
        { label: "Washington", value: "Washington" },
        { label: "West Virginia", value: "West Virginia" },
        { label: "Wisconsin", value: "Wisconsin" },
        { label: "Wyoming", value: "Wyoming" }
    ];


    const handlePress = () => {

    }
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
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {/* add a Licence Sestion */}
                <View style={styles.addLicense}>
                    <Text style={{ fontSize : 24, color : "#000", fontWeight : "600", paddingLeft : 10}}>Add a License</Text>
                    <View style={{ width : "100%", height : height*0.05}}></View>


                    {/* License Type Dropdown */}
                    <Text style={{ color : "#000", padding : 5}}>License Type</Text>
                    {/* <View style={{width : "100%", flex : 1, justifyContent : 'flex-start', alignItems : 'center', backgroundColor: "#e60508"}}> */}
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

                    {/* </View> */}
                    <View style={{ width : "100%", height : height*0.05}}></View>
                        {/* License State Dropdown */}
                        <Text style={{ color : "#000", padding : 5}}>License State</Text>
                    
                        <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={usaStates} // map data
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select"
                        searchPlaceholder="Search..."
                        value={selectedState}
                        onChange={item => {
                            setSelectedState(item.value);
                            console.log(selectedState);
                        }}
                        />

                        <View style={{ width : "100%", height : height*0.05}}></View>

                        {/* License Number Input */}
                        <Text style={{ color : "#000", padding : 5}}>License Number</Text>
                        

                        {/* --- PUT ON HOLD don't know the Licensing Params for the Inputs
                        <TextInput
                                style={[
                                styles.input,
                                isFocused && !isValidLength ? styles.inputError : null,
                                ]}
                                value={licenseNumber}
                                onChangeText={handleInputChange}
                                // keyboardType="numeric"
                                maxLength={9} // Limit input to 9 digits
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                            {!isValidLength && isFocused && (
                                <Text style={styles.errorText}>
                                License number must be 9 digits long.
                                </Text>
                            )} */}
                        <TextInput
                            style={styles.input}
                            value={licenseNumber}
                            onChangeText={setLicenseNumber}
                            placeholder="Enter your license number"
                            
                        />



                    {/* Expiration date */}
                    <View style={{ width : "100%", height : height*0.05}}></View>
                        <Text style={{ color : "#000", padding : 5}}>Expiration date</Text>
                        <TouchableOpacity onPress={handlePress}>
                                <View style={styles.calender}>
                                    <Text style={{color: "#B8AEAE",}}>MM/DD/YYYY</Text>
                                    <Calender width={40} height={40} color={"#000"} />
                                </View>
                        </TouchableOpacity>
                    <View style={{ width : "100%", height : height*0.05}}></View>
                    {/* Line */}
                    <View style={{ width : "100%", height : height * 0.001, backgroundColor: "#B8AEAE"}}></View> 


                    
                </View>
                <View style={{ width : "100%", height : height*0.05}}></View>
                    
                    {/* <View style={{width: width, height: 1000, backgroundColor: "#e60508"}}></View> */}
                    <View style={{width: "100%", height: 1000, backgroundColor: "#e60508"}}></View> 
                    <View style={{flex: 1, width: "100%", height: height * 0.4, backgroundColor: "#14e35d"}}></View>

                
                
            </ScrollView>
        </View>
        

  )
}


const CalendarModal = () => {
    const [date, setDate] = useState(new Date()); // Default to today's date
    const [open, setOpen] = useState(false);
  
    return (
      <View style={calendarStyles.container}>
        {/* <Text style={calendarStyles.label}>Select Date</Text> */}
  
        {/* Touchable container to open the date picker modal */}
        <TouchableOpacity style={calendarStyles.dateContainer} onPress={() => setOpen(true)}>
          <Text style={calendarStyles.dateText}>{date.toDateString()}</Text>
        </TouchableOpacity>
  
        {/* Date Picker Modal */}
        <Modal
          transparent={true}
          animationType="slide"
          visible={open}
          onRequestClose={() => setOpen(false)}
        >
          <View style={calendarStyles.modalContainer}>
            <View style={calendarStyles.modalContent}>
              <Text style={calendarStyles.modalTitle}>Pick a Date</Text>
              <DatePicker
                date={date}
                onDateChange={setDate}
                mode="date"
                minimumDate={new Date()} // Prevent selecting past dates
              />
              <TouchableOpacity onPress={() => setOpen(false)} style={calendarStyles.closeButton}>
                <Text style={calendarStyles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

export default UpdateLicense

const styles = StyleSheet.create({
    main:{
        width : width,
        height : height,
        backgroundColor: '#FFF',
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
        padding : 15,
        paddingTop : 30, 

    },
    // drop down css
    dropdown: {
        // marginLeft: 15,
        // marginRight: "8%",
        width : "100%",
        height: height * 0.08,
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
        padding: 10,
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
    input: {
        width: '100%',
        height: height * 0.08,
        borderColor: '#B8AEAE',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        elevation: 5, // This will add a box shadow for Android
        shadowColor: '#000', // This will add a box shadow for iOS
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      inputError: {
        borderColor: 'red', // Highlight red if input is invalid
      },
      errorText: {
        color: 'red',
        paddingTop: 5,
        fontSize: 12,
      },
      calender:{
        width: '100%',
        height: height * 0.08,
        borderColor: '#B8AEAE',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        elevation: 5, // This will add a box shadow for Android
        shadowColor: '#000', // This will add a box shadow for iOS
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        flex: 1, 
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
      },
});


const calendarStyles = StyleSheet.create({
    container: {
      paddingHorizontal: 15,
      marginBottom: 20,
    },
    label: {
      color: '#000',
      paddingBottom: 5,
    },
    dateContainer: {
      width: '100%',
      height: 40,
      justifyContent: 'center',
      borderColor: '#B8AEAE',
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: '#FFF',
      paddingHorizontal: 10,
      elevation: 5, // Shadow for Android
      shadowColor: '#000', // Shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    dateText: {
      color: '#000',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    closeButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#2196F3',
      borderRadius: 5,
    },
    closeButtonText: {
      color: '#FFF',
      fontWeight: 'bold',
    },
  });