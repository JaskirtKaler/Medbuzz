import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Dimensions, Modal, TouchableOpacity, ScrollView, TextInput, Platform, KeyboardAvoidingView  } from 'react-native';
const { width, height } = Dimensions.get('window'); // screen max width and height
import Backarrow from '../Components/Svg/Backarrow.tsx'
import { useNavigation } from '@react-navigation/native'
import { Dropdown } from 'react-native-element-dropdown';
import Calender from '../Components/Svg/Calender.tsx';
import Plus from '../Components/Svg/Plusarrow.tsx';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import Download from '../Components/Svg/Download.tsx';
import { licenseType as licsenseOptions } from '../mapVariables/optionsData.tsx';
import { usaStates } from '../mapVariables/optionsData.tsx';
interface License{
  licenseType: string;
  licenseState: string;
  licenseNumber: string;
  expirationDate: string;
  firstName: string;
  lastName: string;
 
}
interface DropdownItem {
  label: string;
  value: string;
}
function UpdateLicense() {
    const navigation = useNavigation<any>(); // Stack Navigation
    // License for the selected license type in the dropdown
    // const [licenseType, setLicenseType] = useState<string>("");
    const [selectedLicenseType, setSelectedLicenseType] = useState<string>(''); // Changed name to selectedLicenseType
    // State for the selected state in the dropdown
    const [selectedState, setSelectedState] = useState<string>("");
    const [licenseNumber, setLicenseNumber] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [expirationDate, setExpirationDate] = useState<string>('');
    const [upload, setUpload] = useState<boolean>(false);


    const isValidLength = licenseNumber.length === 9; // Assuming 9 digits as the valid length

    const [selectedDocument, setSelectedDocument] = useState<DocumentPickerResponse | null>(null);
    const handleUpload = async () =>{
        try{
            const doc = await DocumentPicker.pickSingle({type:  [DocumentPicker.types.pdf, DocumentPicker.types.images],});
            setSelectedDocument(doc); // Save the document path to the state
            setUpload(true);
            console.log(doc);
        }catch (err){
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker
                console.log('user Cancelled the upload', err);
            } else {
                throw err;
            }
        }
    }

    

    const handleDateInput = (text: string) => {
      // Remove non-numeric characters
      const numericValue = text.replace(/\D/g, '');

      // Format the value to MM/DD/YYYY
      let formattedDate = numericValue;

      if (numericValue.length >= 3 && numericValue.length <= 4) {
        // Add first slash after MM
        formattedDate = numericValue.slice(0, 2) + '/' + numericValue.slice(2);
      } else if (numericValue.length > 4) {
        // Add second slash after DD
        formattedDate = numericValue.slice(0, 2) + '/' + numericValue.slice(2, 4) + '/' + numericValue.slice(4, 8);
      }

      // Limit the input to 10 characters (MM/DD/YYYY)
      setExpirationDate(formattedDate.slice(0, 10));
    };

   

    
    const handleSave = () => {
      const licenseData: License = {
        licenseType: selectedLicenseType,
        licenseState: selectedState,
        licenseNumber,
        expirationDate,
        firstName,
        lastName, 
      };
  
      console.log(licenseData);
      console.log(selectedDocument?.name || 'None');
    };
    // if user decides to download document
    const handleDownload = () =>{
      console.log('Download document')
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
                        <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={licsenseOptions} // map data
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select"
                        searchPlaceholder="Search..."
                        value={selectedLicenseType}
                        onChange={(item: DropdownItem) => {
                          setSelectedLicenseType(item.value);
                          console.log(item.value);
                        }}
                        />

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

                        <TextInput
                            style={styles.input}
                            value={licenseNumber}
                            onChangeText={setLicenseNumber}
                            placeholder="Enter your license number"
                            
                        />


                    {/* Expiration date */}
                    <View style={{ width : "100%", height : height*0.05}}></View>
                        <Text style={{ color : "#000", padding : 5}}>Expiration date</Text>
                          <TextInput
                              style={styles.calender}
                              value={expirationDate}
                              onChangeText={handleDateInput}
                              keyboardType='numeric'
                              placeholder="MM/DD/YYYY" 
                              maxLength={10}   
                          />
                          
                    <View style={{ width : "100%", height : height*0.05}}></View>
                    {/* Line */}
                    <View style={{ width : "100%", height : height * 0.001, backgroundColor: "#B8AEAE"}}></View> 
                    
                </View>
                <View style={{ width : "100%", height : height*0.05}}></View>
                    

                    {/* Name on License section */}
                    <View style={{width: "100%", padding : 15}}>
                      <Text style={{ color: "#000", paddingLeft: 10, fontWeight: "600", fontSize: 24 }}>License State</Text>
                      <View style={{ width : "100%", height : height*0.05}}></View>
                      <Text style={{ color: "#000", paddingLeft: 10, fontSize: 16 }}>Provide you name as stated on your license</Text>

                      <View style={{ width : "100%", height : height*0.05}}></View>
                        <Text style={{ color: "#000", paddingLeft: 10, fontWeight: "400", fontSize: 16 }}>First Name</Text>
                        <View style={{paddingTop: 5}}>
                          <TextInput
                                style={styles.input}
                                value={firstName}
                                onChangeText={setFirstName}
                                placeholder="First Name"
                
                            />
                        </View>
                        <View style={{ width : "100%", height : height*0.05}}></View>
                        <Text style={{ color: "#000", paddingLeft: 10, fontWeight: "400", fontSize: 16 }}>Last Name</Text>
                        <View style={{paddingTop: 5}}>
                          <TextInput
                                style={styles.input}
                                value={lastName}
                                onChangeText={setLastName}
                                placeholder="Last Name"
                
                            />
                        </View>


                        {/* Line */}
                        <View style={{ width : "100%", height : height*0.05}}></View>
                        <View style={{ width : "100%", height : height * 0.001, backgroundColor: "#B8AEAE"}}></View> 

                    </View> 
                    {/* Upload License */}
                    <View style={{flex: 1, width: "100%", padding: 15}}>
                      <View style={{paddingLeft: 10, paddingBottom: 5}}>

                      <Text style={{ color: "#000", fontWeight: "600", fontSize: 24,}}>Upload license</Text>

                        {/* Top part is if there is a file bottom is nothing is uploaded at the moment */}
                        {selectedDocument ? ( 
                          <TouchableOpacity onPress={handleDownload}> 
                            <View style={styles.file}>
                              <Text>{selectedDocument["name"]}</Text>
                              <Download width={50} height={50} color={'#000'} />
                            </View> 
                          </TouchableOpacity>
                          ) : (
                          <Text>File not uploaded</Text>
                          )}
                         <TouchableOpacity onPress={handleUpload} style={{paddingTop: 5}}>
                           <View style={styles.upload}>
                             <Plus width={40} height={30} color={'#0EA68D'} />
                             <Text style={{color: "#0EA68D", fontWeight: "500"}}>{upload ? 'Upload New File' : 'Upload File'}</Text>
                           </View>
                         </TouchableOpacity>

                

                      </View>
                            <View style={{width: "100%", height: height *0.08, paddingTop: 15}}>
                              <TouchableOpacity style={{backgroundColor: '#0EA68D', padding: 10, borderRadius: 5, flex: 1, justifyContent: "center", alignItems: "center"}} onPress={handleSave}>
                                  <Text style={{color: "#FFF", fontWeight: "500", fontSize: 16}}>Save</Text>
                              </TouchableOpacity>

                            </View>
                    </View>
                
            </ScrollView>
        </View>  
       

  )
}



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
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
      },
      closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#0EA68D',
        borderRadius: 5,
      },
      closeButtonText: {
        color: '#FFF',
        fontSize: 16,
      },
      upload:{
        width: width * 0.5, 
        height: height * 0.08, 
        borderWidth: 1, 
        borderColor:"#0EA68D",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
      },
      file:{
        width: width * 0.9, 
        height: height * 0.08, 
        borderWidth: 1, 
        borderColor:"#0EA68D",
        borderRadius: 10,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        padding: 10,
      }, 
});


