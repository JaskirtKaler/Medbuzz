/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import {
  Button,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Profile from '../Components/Svg/Profile.tsx';
// import { useNavigation } from '@react-navigation/native';
import {
  disciplineOptions,
  categoryOptions,
  certificationMap,
} from '../mapVariables/optionsData.tsx';
import {
  usaStates,
  degrees,
  months,
  years,
} from '../mapVariables/optionsData.tsx';
//import AsyncStorage from '@react-native-async-storage/async-storage';
/*
  functionality to be added: convert to flex, generate years dynamically for graduation date,
  add test to ensure that all required fields were actually entered and if they weren't reprompt
  the user, possibly add US territories: US virgin islands, Guam, Puerto Rico, etc to State options, 
  add cancel button functionality, add upload photo button functionality
*/

interface EditBasicDetailsProps {
  navigation: NavigationProp<any>; // Replace 'any' with your specific navigation parameter type if available
}

type CategoryType = keyof typeof certificationMap; // Create a union type from the certificationMap keys

interface OptionType {
  // Option type is for Certificaion mapping
  label: string;
  value: string;
}

// Screen - Edit Basic Details
const EditBasicDetails: React.FC<EditBasicDetailsProps> = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [discipline, setDiscipline] = useState('');
  const [schoolState, setSchoolState] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [degreeType, setDegreeType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [professionalSummary, setProfessionalSummary] = useState('');
  const [dob, setDob] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [schoolCountry, setSchoolCountry] = useState('');
  const [schoolCity, setSchoolCity] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [homeCity, setHomeCity] = useState('');
  const [homeState, setHomeState] = useState('');
  const [yearsOfSpecialty, setYearsOfSpecialty] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [ssn, setSSN] = useState('');
  const [legalFirstName, setLegalFirstName] = useState('');
  const [legalLastName, setLegalLastName] = useState('');
  const [isValidZipCode, setIsValidZipCode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null,
  );
  const [certificationOptions, setCertificationOptions] =
    useState<OptionType[]>(categoryOptions); // Initially, it holds categories
  const [selectedCertification, setSelectedCertification] = useState<
    string | null
  >(null);
  const [isCategorySelected, setIsCategorySelected] = useState(false); // Boolean to check if category is selected
  
  // Validation function for required fields
  const validateForm = () => {
    if (!firstName || !lastName || !phoneNumber || !email || !schoolName || !schoolState || !schoolCountry 
        || !month || !year || !degreeType || !homeAddress || !homeCity || !homeState || !zipCode ||
        !discipline || !yearsOfSpecialty || !dob || !ssn || !legalFirstName || !legalLastName
    ) {
      return false;
    }
    return true;
  };

  const handleChange = (text) => {
    // Allow only numeric input
    const numericValue = text.replace(/[^0-9]/g, '');
    setPhoneNumber(numericValue);
    setZipCode(numericValue);
    setSSN(numericValue);


  };

  // Fetch existing data from local storage at the start of page, to populate the fields
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem('userProfile');
        if (storedProfile !== null) {
          const parsedData = JSON.parse(storedProfile);
  
          // Set individual states based on the stored data
          setProfilePicture(parsedData.profilePicture || null);
          setFirstName(parsedData.personalInfo?.firstName || '');
          setMiddleName(parsedData.personalInfo?.middleName || '');
          setLastName(parsedData.personalInfo?.lastName || '');
          setPhoneNumber(parsedData.personalInfo?.phoneNumber || '');
          setEmail(parsedData.personalInfo?.email || '');
          setProfessionalSummary(parsedData.personalInfo?.professionalSummary || '');
  
          setSchoolName(parsedData.education?.schoolName || '');
          setSchoolCity(parsedData.education?.schoolCity || '');
          setSchoolCountry(parsedData.education?.schoolCountry || '');
          setMonth(parsedData.education?.gradDate?.month || '');
          setYear(parsedData.education?.gradDate?.year || '');
          setDegreeType(parsedData.education?.degreeType || '');
          setFieldOfStudy(parsedData.education?.fieldOfStudy || '');
  
          setHomeAddress(parsedData.homeAddress?.street || '');
          setHomeCity(parsedData.homeAddress?.city || '');
          setHomeState(parsedData.homeAddress?.state || '');
          setZipCode(parsedData.homeAddress?.zipcode || '');
  
          setDiscipline(parsedData.expertise?.discipline || '');
          setSelectedCertification(parsedData.expertise?.certification || '');
          setYearsOfSpecialty(parsedData.expertise?.yearsOfExperience || '');
  
          setDob(parsedData.identityVerification?.DOB || '');
          setSSN(parsedData.identityVerification?.last4ssn || '');
          setLegalFirstName(parsedData.identityVerification?.legalFirstName || '');
          setLegalLastName(parsedData.identityVerification?.legalLastName || '');
  
          console.log('Profile loaded successfully');
        } else {
          console.log('No profile found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Could not fetch user data.');
      } finally {
        setLoading(false); // Ensure loading state is updated here
      }
    };
  
    fetchData();
  }, []);

  const handleImagePick = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          setProfilePicture(imageUri); // Update state with the selected image
        } else {
          console.log('No URI found for the selected image');
        }
      } else {
        console.log('Error picking image:'); // Handle errors
      }
    });
  };

  //saves the data from the states back to the userProfile object so on the next fetch it reflects to most up to date information
  const handleSave1 = async () => {

          // Validate the form fields before proceeding
      const formIsValid = validateForm();

      // If the form is not valid, show an alert and stop the save process
      if (!formIsValid) {
        Alert.alert(
          'Error',
          'Please fill in all required fields before saving.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
        return; // Exit the function early to prevent saving
      }

    try {
      // Retrieve the existing profile from AsyncStorage
      const storedProfile = await AsyncStorage.getItem('userProfile');
      const existingProfile = storedProfile ? JSON.parse(storedProfile) : {};



      // Construct the updated profile by merging with the existing profile
      const currentProfile = {
        ...existingProfile, // this spread operator allow us to keep existing properties and only update the ones we explicitely mention
        profilePicture: profilePicture,
        personalInfo: {
          ...existingProfile.personalInfo,
          firstName,
          middleName,
          lastName,
          phoneNumber,
          email,
          professionalSummary,
        },
        education: {
          ...existingProfile.education,
          schoolName,
          schoolCity,
          schoolCountry,
          gradDate: {
            month,
            year,
          },
          degreeType,
          fieldOfStudy,
        },
        homeAddress: {
          ...existingProfile.homeAddress,
          street: homeAddress,
          city: homeCity,
          state: homeState,
          zipcode: zipCode,
        },
        expertise: {
          ...existingProfile.expertise,
          discipline,
          certification: selectedCertification,
          yearsOfExperience: yearsOfSpecialty,
        },
        identityVerification: {
          ...existingProfile.identityVerification,
          DOB: dob,
          last4ssn: ssn,
          legalFirstName,
          legalLastName,
        },
      };
  

      // Save the updated profile back to AsyncStorage
      await AsyncStorage.setItem('userProfile', JSON.stringify(currentProfile));
      console.log('Profile saved successfully');
      Alert.alert('Success', 'Profile has been saved.');
      navigation.goBack();

      // try {
      //   // Get all keys from AsyncStorage
      //   const keys = await AsyncStorage.getAllKeys();
  
      //   if (keys.length > 0) {
      //     // Fetch all key-value pairs
      //     const result = await AsyncStorage.multiGet(keys);
  
      //     // Display key-value pairs
      //     result.forEach(([key, value]) => {
      //       console.log(`Key: ${key}, Value: ${value}`);
      //     });
      //   } else {
      //     console.log('No data found in AsyncStorage.');
      //   }
      // } catch (error) {
      //   console.error('Error fetching data from AsyncStorage', error);
      // }
      
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Could not save user data.');
    }
  };

  // Handle the dropdown change
  const handleDropdownChange = (value: string) => {
    if (value === 'back') {
      // Handle the case where the user wants to go back to category selection
      resetDropdown();
    } else if (!isCategorySelected) {
      // User selected a category, now we show certifications
      setSelectedCategory(value as CategoryType);
      const certifications = certificationMap[value as CategoryType] || [];
      setCertificationOptions([
        {label: 'Back to Category', value: 'back'},
        ...certifications,
      ]); // Add the back option to certifications
      setIsCategorySelected(true); // Indicate that category is selected
    } else {
      // User selected a certification
      setSelectedCertification(value);
    }
  };

  // Reset the dropdown to category selection
  const resetDropdown = () => {
    setSelectedCategory(null);
    setCertificationOptions(categoryOptions); // Reset options to categories
    setIsCategorySelected(false); // Reset category selection
    setSelectedCertification(null); // Reset selected certification
  };

  const checkLocalItems = async () => {
    alert(
      'A function which gets all the item from local storage and prints it to terminal is bounded to this save button, add correct function',
    );
    try {
      // Get all keys from AsyncStorage
      const keys = await AsyncStorage.getAllKeys();

      if (keys.length > 0) {
        // Fetch all key-value pairs
        const result = await AsyncStorage.multiGet(keys);

        // Display key-value pairs
        result.forEach(([key, value]) => {
          console.log(`Key: ${key}, Value: ${value}`);
        });
      } else {
        console.log('No data found in AsyncStorage.');
      }
    } catch (error) {
      console.error('Error fetching data from AsyncStorage', error);
    }
  };

  // Created by Ashar from the UserLocation.tsx file
  const validateZipCode = (text: string) => {
    const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    const isValid = zipCodeRegex.test(text);
    setIsValidZipCode(isValid); // Update validity state
    setZipCode(text); // Update zip code state
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView
      style={{
        backgroundColor: 'white',
        marginVertical: Platform.OS === 'ios' ? '8%' : 0,
      }}>
      {/* About you header */}
      <Text style={styles.headerTextStyle}>About You</Text>

      {/* Profile image and 'Upload Photo' button */}
      <View style={styles.profileContainer}>
        {/* Display the profile picture or a default image */}
        <TouchableOpacity onPress={handleImagePick}>
          {profilePicture ? (
            <Image source={{uri: profilePicture}} style={styles.profileImage} />
          ) : (
            <Text style={styles.profileContainer}></Text>
          )}
        </TouchableOpacity>

        {/* Upload Photo button */}
        <TouchableOpacity
          onPress={handleImagePick}
          style={styles.uplaodPhotoButton}>
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
      </View>

      {/* First name field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>First name</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput
        testID="firstNameInput"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.textBoxStyle}></TextInput>

      {/* Middle name field and TextBox */}
      <Text style={styles.fieldTextStyle}>Middle name</Text>
      <TextInput
        testID="middleNameInput"
        value={middleName}
        onChangeText={setMiddleName}
        style={styles.textBoxStyle}></TextInput>

      {/* Last name field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>Last name</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput
        testID="lastNameInput"
        value={lastName}
        onChangeText={setLastName}
        style={styles.textBoxStyle}></TextInput>

      {/* Phone number field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>Phone number</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput
        testID="phoneNumberInput"
        value={phoneNumber}
        onChangeText={handleChange}
        
        style={styles.textBoxStyle}></TextInput>

      {/* Email field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>Email</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput
        testID="emailInput"
        value={email}
        onChangeText={setEmail}
        style={styles.textBoxStyle}></TextInput>

      {/* Professional summary field and TextBox */}
      <Text style={styles.fieldTextStyle}>Professional summary</Text>
      <TextInput
        testID="professionalSummaryInput"
        value={professionalSummary}
        onChangeText={setProfessionalSummary}
        style={styles.bigTextBoxStyle}></TextInput>

      {/* Education header */}
      <Text style={styles.headerTextStyle}>Education</Text>

      {/* School name field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>School name</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput
        testID="schoolNameInput"
        value={schoolName}
        onChangeText={setSchoolName}
        style={styles.textBoxStyle}></TextInput>

      {/* School city field and TextBox */}
      <Text style={styles.fieldTextStyle}>City</Text>
      <TextInput
        testID="cityInput"
        value={schoolCity}
        onChangeText={setSchoolCity}
        style={styles.textBoxStyle}></TextInput>

      {/* School state field and Dropdown selector */}
      <Text style={styles.fieldTextStyle}>
        <Text>State</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={usaStates}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="State"
        searchPlaceholder="Search..."
        value={schoolState}
        onChange={item => {
          setSchoolState(item.value);
        }}
      />

      {/* School country field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>Country</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput
        testID="countryInput"
        value={schoolCountry}
        onChangeText={setSchoolCountry}
        style={styles.textBoxStyle}></TextInput>

      {/* Graduation date field and Dropdown selectors for month and year, respectively */}
      <Text style={styles.fieldTextStyle}>
        <Text>Graduation date, or expected</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '60%',
        }}>
        <Dropdown
          style={styles.dropdownMonthYear}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={months}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Month"
          searchPlaceholder="Search..."
          value={month}
          onChange={item => {
            setMonth(item.value);
          }}
        />
        <Dropdown
          style={styles.dropdownMonthYear}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={years}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Year"
          searchPlaceholder="Search..."
          value={year}
          onChange={item => {
            setYear(item.value);
          }}
        />
      </View>

      {/* Degree type field and Dropdown selector */}
      <Text style={styles.fieldTextStyle}>
        <Text>Degree type</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={degrees}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={degreeType}
        onChange={item => {
          setDegreeType(item.value);
        }}
      />

      {/* Field of study field and TextBox, along with example*/}
      <Text style={styles.fieldTextStyle}>Field of study</Text>
      <TextInput
        testID="fieldOfStudyInput"
        value={fieldOfStudy}
        onChangeText={setFieldOfStudy}
        style={styles.textBoxStyle}></TextInput>
      <Text style={{color: 'grey', marginLeft: 15}}>
        Ex. Health Science, Biology, Public Health, etc.
      </Text>

      {/* Home address header */}
      <Text style={styles.headerTextStyle}>Permanent home address</Text>

      {/* Home street address field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>Home street address</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput
        testID="homeStreetAddressInput"
        value={homeAddress}
        onChangeText={setHomeAddress}
        style={styles.textBoxStyle}></TextInput>

      {/* Home city field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>City</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput
        testID="homeCityInput"
        value={homeCity}
        onChangeText={setHomeCity}
        style={styles.textBoxStyle}></TextInput>

      {/* Home state field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>State</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput
        testID="homeStateInput"
        value={homeState}
        onChangeText={setHomeState}
        style={styles.textBoxStyle}></TextInput>

      {/* Zip code field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>ZIP Code</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput
        testID="zipCodeInput"
        value={zipCode}
        onChangeText={handleChange}
        style={styles.textBoxStyle}></TextInput>

      {/* Your Expertise header */}
      <Text style={styles.headerTextStyle}>Your expertise</Text>

      {/* Discipline field and Dropdown selector */}
      <Text style={styles.fieldTextStyle}>
        <Text>Discipline</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={disciplineOptions}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={discipline}
        onChange={item => {
          setDiscipline(item.value);
        }}
      />

      {/* Certificate field and Dropdown selector */}
      <Text style={styles.fieldTextStyle}>
        <Text>Certification</Text>
      </Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={certificationOptions}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={isCategorySelected ? 'Select Certification' : 'Select Category'}
        onChange={item => handleDropdownChange(item.value)}
      />

      {/* Years of specialty experience field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>Years of experience</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput
        testID="yearsOfExperienceInput"
        value={yearsOfSpecialty}
        onChangeText={setYearsOfSpecialty}
        style={styles.textBoxStyle}></TextInput>

      {/* IDENTITY VERIFICATION SECTION */}
      {/* Richard Varela add the identity verification section related to SCRUM - 106 */}
      <Text style={styles.headerTextStyle}>Identity verfication</Text>

      {/* Date of birth field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>Date of birth</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput
        testID="dateOfBirthInput"
        value={dob}
        onChangeText={setDob}
        style={styles.textBoxStyle}
        placeholder="MM/DD/YYYY"
        placeholderTextColor={'grey'}></TextInput>

      {/* Input field for last four of SSN */}
      <Text style={styles.fieldTextStyle}>
        <Text>Last four of SSN</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput
        testID="ssnLastFourInput"
        value={ssn}
        onChangeText={handleChange}
        style={styles.textBoxStyle}></TextInput>

      {/* Input field for legal first name */}
      <Text style={styles.fieldTextStyle}>
        <Text>Legal First Name</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput
        testID="legalFirstNameInput"
        value={legalFirstName}
        onChangeText={setLegalFirstName}
        style={styles.textBoxStyle}></TextInput>

      {/* Input field for legal last name */}
      <Text style={styles.fieldTextStyle}>
        <Text>Legal Last Name</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput
        testID="legalLastNameInput"
        value={legalLastName}
        onChangeText={setLegalLastName}
        style={styles.textBoxStyle}></TextInput>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave1}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>SAVE</Text>
      </TouchableOpacity>

      {/* Cancel button */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>CANCEL</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  // custom styles. Subject to change
  textBoxStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    height: 40,
  },

  bigTextBoxStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    height: 100,
  },

  fieldTextStyle: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
    color: 'black',
  },

  headerTextStyle: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 30,
    marginBottom: 10,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },

  saveButton: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#0EA68D',
    alignItems: 'center',
    padding: 10,
  },

  cancelButton: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    padding: 10,
  },

  uplaodPhotoButton: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    height: 35,
    borderColor: '#0EA68D',
    backgroundColor: 'white',
    alignItems: 'center',
    width: 100,
    marginLeft: 15,
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 15,
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
  },

  uploadText: {
    color: '#007BFF',
    marginTop: 3,
  },

  // Styles below this pint were included in the Dropdown library

  dropdown: {
    marginLeft: 15,
    marginRight: 15,
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },

  dropdownMonthYear: {
    width: 120,
    marginLeft: 15,
    marginRight: 15,
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },

  placeholderStyle: {
    fontSize: 16,
    paddingLeft: 5,
  },

  selectedTextStyle: {
    color: 'black',
    fontSize: 16,
    paddingLeft: 5,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default EditBasicDetails;
