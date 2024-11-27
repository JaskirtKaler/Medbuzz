import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform, Alert, PermissionsAndroid, ScrollView, TextInput } from 'react-native';
import RNFS from 'react-native-fs';
const { width, height } = Dimensions.get('window'); // screen max width and height
import Backarrow from '../Components/Svg/Backarrow.tsx'
import { useNavigation } from '@react-navigation/native'
import { Dropdown } from 'react-native-element-dropdown';
import Calender from '../Components/Svg/Calender.tsx';
import Plus from '../Components/Svg/Plusarrow.tsx';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import Download from '../Components/Svg/Download.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { licenseType as licsenseOptions } from '../mapVariables/optionsData.tsx';
import { usaStates } from '../mapVariables/optionsData.tsx';
import Toast from 'react-native-toast-message'; 

interface License{
  licenseType: string;
  licenseState: string;
  licenseNumber: string;
  expirationDate: string;
  firstName: string;
  lastName: string;
  licenseFile: string | null;
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
    // const [expirationDate, setExpirationDate] = useState<string>('');
    const [upload, setUpload] = useState<boolean>(false);
    const [expirationDate, setExpirationDate] = useState<string>('');
    const [selectedDocument, setSelectedDocument] = useState<DocumentPickerResponse | null>(null);

    useEffect(() => {
      const loadLicenseData = async () => {
        const profileData = await AsyncStorage.getItem('userProfile');
        if (profileData) {
          const profile = JSON.parse(profileData);
          const licenseData = profile.uploadedFiles?.license || {};
          
          setSelectedLicenseType(licenseData.licenseType || '');
          setSelectedState(licenseData.licenseState || '');
          setLicenseNumber(licenseData.licenseNumber || '');
          setExpirationDate(licenseData.expirationDate || '');
          setFirstName(licenseData.firstName || '');
          setLastName(licenseData.lastName || '');
    
          if (licenseData.licenseFile) {
            setSelectedDocument({
              uri: licenseData.licenseFile,
              name: 'License Document',
              type: 'application/pdf',
              size: 0,
              fileCopyUri: null,
            });
          }
        }
      };
    
      loadLicenseData();
    }, []);
    const isValidLength = licenseNumber.length === 9; // Assuming 9 digits as the valid length

    // testing if object is stored in async storage
    const printLicenseData = async () => {
      try {
        const profileData = await AsyncStorage.getItem('userProfile');
        if (profileData) {
          const profile = JSON.parse(profileData);
          console.log("License Data:", profile.uploadedFiles.license);
        } else {
          console.log("No profile data found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Failed to load license data:", error);
      }
    };
    
    const handleUpload = async () => {
      try {
        const doc = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
        });
        setSelectedDocument(doc);
        setUpload(true); // Set upload status to true
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('User cancelled the upload', err);
        } else {
          throw err;
        }
      }
      await printLicenseData();
    };

    

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

   

    
    const handleSave = async () => {
      try {
        // Retrieve the current profile from AsyncStorage
        const profileData = await AsyncStorage.getItem('userProfile');
        const profile = profileData ? JSON.parse(profileData) : { uploadedFiles: {} };
    
        // Ensure `uploadedFiles.license` exists in the profile
        profile.uploadedFiles.license = profile.uploadedFiles.license || {};
    
        // Update the `license` object with new data
        profile.uploadedFiles.license = {
          licenseType: selectedLicenseType,
          licenseState: selectedState,
          licenseNumber,
          expirationDate,
          firstName,
          lastName,
          licenseFile: selectedDocument ? selectedDocument.uri : null,
        };
    
        // Save the updated profile back to AsyncStorage
        await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
    
        console.log('Updated License Data:', profile);
        Alert.alert('Success', 'License information saved successfully.');
      } catch (error) {
        console.error('Error saving license data:', error);
        Alert.alert('Error', 'Failed to save license information.');
      }
    };

    const getRealPathFromURI = async (uri: string): Promise<string> => {
      if (uri.startsWith('content://')) {
        const newFilePath = `${RNFS.DocumentDirectoryPath}/${uri.split('/').pop()}`;
        await RNFS.copyFile(uri, newFilePath);
        console.log('File copied to: ', newFilePath);
        return newFilePath;
      }
      return uri;
    };

      // Request permissions for Android
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ];
      const granted = await PermissionsAndroid.requestMultiple(permissions);

      if (
        granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        Toast.show({ type: 'error', text1: 'Permission Denied', text2: 'You need to allow storage permissions.' });
        return false;
      }
    }
    return true;
  };
    
  const handleDownload = async () => {
    if (selectedDocument && selectedDocument.uri) {
      try {
        const filePath = await getRealPathFromURI(selectedDocument.uri);
        const downloadDest = Platform.OS === 'android'
          ? `${RNFS.DownloadDirectoryPath}/${selectedDocument.name}` // Downloads folder on Android
          : `${RNFS.DocumentDirectoryPath}/${selectedDocument.name}`; // Internal storage for iOS

        Toast.show({ type: 'info', text1: 'Download Started', text2: 'Your file is being downloaded...' });

        await RNFS.copyFile(filePath, downloadDest);

        Toast.show({ type: 'success', text1: 'Download Complete', text2: 'File saved to Downloads!' });
        console.log('File downloaded to: ', downloadDest);
      } catch (error) {
        console.error('Error downloading file: ', error);
        Toast.show({ type: 'error', text1: 'Download Failed', text2: 'Error occurred while downloading.' });
      }
    } else {
      Alert.alert('Error', 'No document selected to download.');
    }
  };


  return (
        <View style={styles.main}>
        {/* Header Section */}
            <View style={styles.header}>
                <View style={{width : "100%", height : "100%", justifyContent : "center"}}>
                <Toast />
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
                      <Text style={{ color: "#000", paddingLeft: 10, fontSize: 16 }}>Provide your name as stated on your License</Text>

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
        paddingHorizontal: Platform.OS === 'ios' ? '5%' : 0,
        paddingTop: Platform.OS === 'ios' ? '12%' : 0,
        height: Platform.OS === 'ios' ? height * 0.125 : height * 0.1,
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


