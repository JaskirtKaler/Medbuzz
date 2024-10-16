
import { Button, StyleSheet, View, Text, ScrollView, TextInput, Touchable, TouchableOpacity, ActivityIndicator, Alert, Platform} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Profile from "../Components/Svg/Profile.tsx"
// import { useNavigation } from '@react-navigation/native';
import { disciplineOptions, categoryOptions, certificationMap } from '../mapVariables/optionsData.tsx';
import { usaStates } from '../mapVariables/optionsData.tsx';
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
interface OptionType { // Option type is for Certificaion mapping
  label: string;
  value: string;
}

// Degrees for use with degree Dropdown selector
const degrees = [
  {label: 'AA', value: 'aa'}, {label: 'AS', value: 'as'},
  {label: 'BA', value: 'ba'}, {label: 'BS', value: 'bs'},
  {label: 'MA', value: 'ma'}, {label: 'MS', value: 'ms'},
  {label: 'PHD', value: 'phd'}
];

// months and years, respectively, for use with graduation date Dropdown selector
const months = [
  {label: 'January', value: 'january'}, {label: 'February', value: 'february'},
  {label: 'March', value: 'march'}, {label: 'April', value: 'april'},
  {label: 'May', value: 'may'}, {label: 'June', value: 'june'},
  {label: 'July', value: 'july'}, {label: 'August', value: 'august'},
  {label: 'September', value: 'september'}, {label: 'October', value: 'october'},
  {label: 'November', value: 'november'}, {label: 'December', value: 'december'},
];

const years = [
  {label: '1975', value: '1975'}, {label: '1976', value: '1976'}, 
  {label: '1977', value: '1977'}, {label: '1978', value: '1978'},
  {label: '1979', value: '1979'}, {label: '1980', value: '1980'},
  {label: '1981', value: '1981'}, {label: '1982', value: '1982'},
  {label: '1983', value: '1983'}, {label: '1984', value: '1984'},
  {label: '1985', value: '1985'}, {label: '1986', value: '1986'},
  {label: '1987', value: '1987'}, {label: '1988', value: '1988'},
  {label: '1989', value: '1989'}, {label: '1990', value: '1990'},
  {label: '1991', value: '1991'}, {label: '1992', value: '1992'},
  {label: '1993', value: '1993'}, {label: '1994', value: '1994'},
  {label: '1995', value: '1995'}, {label: '1996', value: '1996'},
  {label: '1997', value: '1997'}, {label: '1998', value: '1998'},
  {label: '1999', value: '1999'}, {label: '2000', value: '2000'},
  {label: '2001', value: '2001'}, {label: '2002', value: '2002'},
  {label: '2003', value: '2003'}, {label: '2004', value: '2004'},
  {label: '2005', value: '2005'}, {label: '2006', value: '2006'},
  {label: '2007', value: '2007'}, {label: '2008', value: '2008'},
  {label: '2009', value: '2009'}, {label: '2010', value: '2010'},
  {label: '2011', value: '2011'}, {label: '2012', value: '2012'},
  {label: '2013', value: '2013'}, {label: '2014', value: '2014'},
  {label: '2015', value: '2015'}, {label: '2016', value: '2016'},
  {label: '2017', value: '2017'}, {label: '2018', value: '2018'},
  {label: '2019', value: '2019'}, {label: '2020', value: '2020'},
  {label: '2021', value: '2021'}, {label: '2022', value: '2022'},
  {label: '2023', value: '2023'}, {label: '2024', value: '2024'},
  {label: '2025', value: '2025'}, {label: '2026', value: '2026'},
  {label: '2027', value: '2027'}, {label: '2028', value: '2028'},
];


// Screen - Edit Basic Details
const EditBasicDetails: React.FC<EditBasicDetailsProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [discipline, setDiscipline] = useState("");
  const [schoolState, setSchoolState] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [degreeType, setDegreeType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [profesionalSummary, setProfessionalSummary] = useState("");
  const [dob, setDob] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolCountry, setSchoolCountry] = useState("");
  const [schoolCity, setSchoolCity] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [homeCity, setHomeCity] = useState("");
  const [homeState, setHomeState] = useState("");
  const [yearsOfSpecialty, setYearsOfSpecialty] = useState("");
  const[zipCode, setZipCode] = useState("");
  const[ssn, setSSN] = useState("");
  const[legalFirstName, setLegalFirstName] = useState("");
  const[legalLastName, setLegalLastName] = useState("");
  const [isValidZipCode, setIsValidZipCode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [certificationOptions, setCertificationOptions] = useState<OptionType[]>(categoryOptions); // Initially, it holds categories
  const [selectedCertification, setSelectedCertification] = useState<string | null>(null);
  const [isCategorySelected, setIsCategorySelected] = useState(false); // Boolean to check if category is selected

  useEffect(() => {
    // Fetch existing user data when the component mounts
    const fetchData = async () => {
      try {
        // Simulating an API call
        const response = await fetch('https://api.example.com/user'); // Replace with your API endpoint
        const data = await response.json();
        
        // Set state with the fetched data
        setFirstName(data.firstName);
        setMiddleName(data.middleName);
        setLastName(data.lastName);
        setPhoneNumber(data.phoneNumber);
        setEmail(data.email);
        setDob(data.dob);
        setSchoolName(data.schoolName);
        setSchoolCountry(data.schoolCountry);
        setSchoolCity(data.schoolCity);
        setFieldOfStudy(data.fieldOfStudy);
        setHomeAddress(data.homeAddress);
        setHomeCity(data.homeCity);
        setHomeState(data.homeState);
        setZipCode(data.zipCode);
        setSSN(data.ssn);
        setLegalFirstName(data.legalFirstName);
        setLegalLastName(data.legalLastName);
        setDiscipline(data.discipline);
        setSchoolState(data.schoolState);
        setDegreeType(data.degreeType);
        setYearsOfSpecialty(data.yearsOfSpecialty);
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "Could not fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle the dropdown change
  const handleDropdownChange = (value: string) => {
    if (value === 'back') {
      // Handle the case where the user wants to go back to category selection
      resetDropdown();
    } else if (!isCategorySelected) {
      // User selected a category, now we show certifications
      setSelectedCategory(value as CategoryType);
      const certifications = certificationMap[value as CategoryType] || [];
      setCertificationOptions([{ label: 'Back to Category', value: 'back' }, ...certifications]); // Add the back option to certifications
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

  // prints all inputs when 'Save' button is pressed
  // Temporary function. Later this information will be saved to the database.
  function printInputs() {
    console.log("First name: " + firstName);
    console.log("Middle name: " + middleName);
    console.log("Last name: " + lastName);
    console.log("Phone number: " + phoneNumber);
    console.log("Email: " + email);
    console.log("Professional summary: " + profesionalSummary);
    console.log("Date of birth: " + dob);
    console.log("School name: " + schoolName);
    console.log("School country: " + schoolCountry);
    console.log("School City: " + schoolCity);
    console.log("SChool state: " + schoolState);
    console.log("Graduation date: " + month + " " + year);
    console.log("Degree type: " + degreeType);
    console.log("Field of study: " + fieldOfStudy);
    console.log("Home address: " + homeAddress);
    console.log("Home city: " + homeCity);
    console.log("Home state: " + homeState);
    console.log("Discipline: " + discipline);
    console.log("Years of specialty: " + yearsOfSpecialty);
    console.log("Certificate: " + selectedCertification);
    console.log("ZIP Code: " + zipCode);
    console.log("SSN: " + ssn)
    console.log("Legal first name: " + legalFirstName);
    console.log("Legal last name: " + legalLastName);
    console.log("Valid ZIP code: " + isValidZipCode);
  }

  const handleSave = async () => {
    try {
      // Add validation checks here if needed
      if (!isValidZipCode) {
        Alert.alert("Error", "Please enter a valid zip code.");
        return;
      }

      // Simulating API call to save updated data
      setLoading(true);
      const response = await fetch('https://api.example.com/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          middleName,
          lastName,
          phoneNumber,
          email,
          profesionalSummary,
          dob,
          schoolName,
          schoolCountry,
          schoolCity,
          discipline,
          schoolState,
          degreeType,
          yearsOfSpecialty,
          homeAddress,
          homeCity,
          homeState,
          zipCode,
          ssn,
          legalFirstName,
          legalLastName,
          selectedCertification
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Profile updated successfully.");
        navigation.goBack(); // Navigate back on successful save
      } else {
        console.error("Update failed:", result);
        Alert.alert("Error", "Could not update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Could not update profile.");
    } finally {
      setLoading(false);
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

  
  return(
    <ScrollView style={{backgroundColor:'white', marginVertical: Platform.OS === 'ios' ? '8%' : 0}}>
      
      {/* About you header */}
      <Text style={styles.headerTextStyle}>About You</Text>

      {/* Profile image and 'Upload Photo' button */}
      <View style={{flexDirection: 'row', justifyContent: "space-between", width: '60%', alignItems: 'center'}}>
        <Profile style= {{marginLeft: 15}} width={50} height={50} color={"#000"}/>
        <TouchableOpacity style={styles.uplaodPhotoButton}>
          <Text style={{color: '#0EA68D', fontWeight: 'bold'}}>Upload Photo</Text>
        </TouchableOpacity>
      </View>

      {/* First name field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>First name</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput testID="firstNameInput" value={firstName} onChangeText={setFirstName} style={styles.textBoxStyle}></TextInput> 

      {/* Middle name field and TextBox */}
      <Text style={styles.fieldTextStyle}>Middle name</Text>
      <TextInput testID="middleNameInput" value={middleName} onChangeText={setMiddleName}style={styles.textBoxStyle}></TextInput>

      {/* Last name field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>Last name</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput testID="lastNameInput" value={lastName} onChangeText={setLastName} style={styles.textBoxStyle}></TextInput>

      {/* Phone number field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>Phone number</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput testID="phoneNumberInput" value={phoneNumber} onChangeText={setPhoneNumber} style={styles.textBoxStyle}></TextInput>

      {/* Email field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>Email</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput testID="emailInput" value={email} onChangeText={setEmail} style={styles.textBoxStyle}></TextInput> 

      {/* Professional summary field and TextBox */}
      <Text style={styles.fieldTextStyle}>Professional summary</Text>
      <TextInput testID="professionalSummaryInput" value={profesionalSummary} onChangeText={setProfessionalSummary} style={styles.bigTextBoxStyle}></TextInput>

      {/* Education header */}
      <Text style={styles.headerTextStyle}>Education</Text>

      {/* School name field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>School name</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput testID="schoolNameInput" value={schoolName} onChangeText={setSchoolName} style={styles.textBoxStyle}></TextInput> 

      {/* School country field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>Country</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput testID="countryInput" value={schoolCountry} onChangeText={setSchoolCountry} style={styles.textBoxStyle}></TextInput>

      {/* School city field and TextBox */}
      <Text style={styles.fieldTextStyle}>City</Text>
      <TextInput testID="cityInput" value={schoolCity} onChangeText={setSchoolCity} style={styles.textBoxStyle}></TextInput>

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

      {/* Graduation date field and Dropdown selectors for month and year, respectively */}
      <Text style={styles.fieldTextStyle}>
        <Text>Graduation date, or expected</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <View style={{flexDirection: 'row', justifyContent: "space-between", width:'60%' }}>
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
      <TextInput testID="fieldOfStudyInput" value={fieldOfStudy} onChangeText={setFieldOfStudy} style={styles.textBoxStyle}></TextInput>
      <Text style={{color: 'grey', marginLeft: 15}}>Ex. Health Science, Biology, Public Health, etc.</Text>

      {/* Home address header */}
      <Text style={styles.headerTextStyle}>Permanent home address</Text>

      {/* Home street address field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>Home street address</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput testID="homeStreetAddressInput"
      value={homeAddress} onChangeText={setHomeAddress} style={styles.textBoxStyle}></TextInput>

      {/* Home city field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>City</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput testID="homeCityInput"
        value={homeCity} onChangeText={setHomeCity} style={styles.textBoxStyle}></TextInput>

      {/* Home state field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>State</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput testID="homeStateInput"
        value={homeState} onChangeText={setHomeState} style={styles.textBoxStyle}></TextInput>

      {/* Zip code field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>ZIP Code</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput testID="zipCodeInput"
        value={zipCode} onChangeText={validateZipCode} style={styles.textBoxStyle}></TextInput>

      {/* Your Expertise header */}
      <Text style={styles.headerTextStyle}>Your expertise</Text>

      {/* Discipline field and Dropdown selector */}
      <Text style={styles.fieldTextStyle}>
        <Text>Discipline</Text>
        <Text style={{color:'red'}}> *</Text>
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
        <Text style={{color:'red'}}> *</Text>
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
        onChange={
          (item) => handleDropdownChange(item.value)
        }
      />

      {/* Years of specialty experience field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>Years of experience</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput testID="yearsOfExperienceInput"
        value={yearsOfSpecialty} onChangeText={setYearsOfSpecialty} style={styles.textBoxStyle}></TextInput>

      {/* IDENTITY VERIFICATION SECTION */}
      {/* Richard Varela add the identity verification section related to SCRUM - 106 */}
      <Text style={styles.headerTextStyle}>Identity verfication</Text>

      {/* Date of birth field and TextBox */}
      <Text style = {styles.fieldTextStyle}>
        <Text>Date of birth</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput testID="dateOfBirthInput"
        value={dob} onChangeText={setDob} style={styles.textBoxStyle} placeholder='MM/DD/YYYY' placeholderTextColor={'grey'}></TextInput>

      {/* Input field for last four of SSN */}
      <Text style={styles.fieldTextStyle}>
        <Text>Last four of SSN</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput testID="ssnLastFourInput"
        value={ssn} onChangeText={setSSN} style={styles.textBoxStyle}></TextInput>

      {/* Input field for legal first name */}
      <Text style={styles.fieldTextStyle}>
        <Text>Legal First Name</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput testID="legalFirstNameInput"
        value={legalFirstName} onChangeText={setLegalFirstName} style={styles.textBoxStyle}></TextInput>

      {/* Input field for legal last name */}
      <Text style={styles.fieldTextStyle}>
        <Text>Legal Last Name</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput testID="legalLastNameInput"
        value={legalLastName} onChangeText={setLegalLastName} style={styles.textBoxStyle}></TextInput>

      {/* Save button */}
      <TouchableOpacity style={styles.saveButton} onPress={printInputs}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>SAVE</Text>
      </TouchableOpacity>

      {/* Cancel button */}
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>CANCEL</Text>
      </TouchableOpacity>
      
    </ScrollView>    
  )
}

  // Styles
const styles = StyleSheet.create({

  // custom styles. Subject to change  
  textBoxStyle: {
    borderColor: 'black',
    borderWidth: 1, 
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    height: 40
  },

  bigTextBoxStyle: {
    borderColor: 'black',
    borderWidth: 1, 
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    height: 100
  }, 

  fieldTextStyle: {
    marginTop: 10,
    marginLeft: 15, 
    marginRight: 15, 
    marginBottom:5, 
    color:'black'
  }, 

  headerTextStyle: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 30, 
    marginBottom: 10, 
    color: 'black',
    fontSize: 20, 
    fontWeight: 'bold'
  }, 

  saveButton: {
    marginTop: 20, 
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10, 
    height: 40, 
    borderRadius: 10, 
    backgroundColor: "#0EA68D", 
    alignItems: "center", 
    padding: 10
  }, 

  cancelButton: {
    marginTop: 10, 
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10, 
    height: 40, 
    borderRadius: 10, 
    backgroundColor: "#E6E6E6", 
    alignItems: "center", 
    padding: 10
  }, 

  uplaodPhotoButton: {
    padding:5,
    borderWidth: 1,
    borderRadius: 10,
    height: 35,
    borderColor: "#0EA68D", 
    backgroundColor: 'white',
    alignItems: "center",
    width: 150,
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
    borderRadius: 10
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
    borderRadius: 10
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

  iconStyle: {
    width: 20,
    height: 20,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  }
});

export default EditBasicDetails
