import { Button, StyleSheet, View, Text, ScrollView, TextInput, Touchable, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Profile from "../Components/Svg/Profile.tsx"
import { useNavigation } from '@react-navigation/native';

/*
  functionality to be added: convert to flex, generate years dynamically for graduation date,
  add test to ensure that all required fields were actually entered and if they weren't reprompt
  the user, possibly add US territories: US virgin islands, Guam, Puerto Rico, etc to State options, 
  add cancel button functionality, add upload photo button functionality
*/


// States for use with school state selector and home state selector
const states = [
  { label: 'AL', value: 'al' }, { label: 'AK', value: 'ak' },
  { label: 'AZ', value: 'az' }, { label: 'AR', value: 'ar' },
  { label: 'CA', value: 'ca' }, { label: 'CO', value: 'co' },
  { label: 'CT', value: 'ct' }, { label: 'DE', value: 'de' },
  { label: 'FL', value: 'fl' }, { label: 'GA', value: 'ga' },
  { label: 'HI', value: 'hi' }, { label: 'ID', value: 'id' },
  { label: 'IL', value: 'il' }, { label: 'IN', value: 'in' },
  { label: 'IA', value: 'ia' }, { label: 'KS', value: 'ks' },
  { label: 'KY', value: 'ky' }, { label: 'LA', value: 'la' },
  { label: 'ME', value: 'me' }, { label: 'MD', value: 'md' },
  { label: 'MA', value: 'ma' }, { label: 'MI', value: 'mi' },
  { label: 'MN', value: 'mn' }, { label: 'MS', value: 'ms' },
  { label: 'MO', value: 'mo' }, { label: 'MT', value: 'mt' },
  { label: 'NE', value: 'ne' }, { label: 'NV', value: 'nv' },
  { label: 'NH', value: 'nh' }, { label: 'NJ', value: 'nj' },
  { label: 'NM', value: 'nm' }, { label: 'NY', value: 'ny' },
  { label: 'NC', value: 'nc' }, { label: 'ND', value: 'nd' },
  { label: 'OH', value: 'oh' }, { label: 'OK', value: 'ok' },
  { label: 'OR', value: 'or' }, { label: 'PA', value: 'pa' },
  { label: 'RI', value: 'ri' }, { label: 'SC', value: 'sc' },
  { label: 'SD', value: 'sd' }, { label: 'TN', value: 'tn' },
  { label: 'TX', value: 'tx' }, { label: 'UT', value: 'ut' },
  { label: 'VT', value: 'vt' }, { label: 'VA', value: 'va' },
  { label: 'WA', value: 'wa' }, { label: 'WV', value: 'wv' },
  { label: 'WI', value: 'wi' }, { label: 'WY', value: 'wy' }
];

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

// Disciplines for use with discipline Dropdown selector
const disciplines = [
  {label: 'Registered Nurse', value: 'Registered Nurse'},
  {label: 'Licensed Practical Nurse', value: 'Licensed Practical Nurse'},
  {label: 'CMA', value: 'CMA'},
  {label: 'Faculty Staff', value: 'Faculty Staff'},
  {label: '---', value: '---'}
];

// Screen - Edit Basic Details
const EditBasicDetails = () => {
  const navigation = useNavigation<any>(); // Stack Navigation
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

  // prints all inputs when 'Save' button is pressed
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
  }
  
  
  return(
    
    <ScrollView style={{backgroundColor:'white'}}>
      
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
      <TextInput onChangeText={setFirstName} style={styles.textBoxStyle}></TextInput> 

      {/* Middle name field and TextBox */}
      <Text style={styles.fieldTextStyle}>Middle name</Text>
      <TextInput onChangeText={setMiddleName}style={styles.textBoxStyle}></TextInput>

      {/* Last name field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>Last name</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput onChangeText={setLastName} style={styles.textBoxStyle}></TextInput>

      {/* Phone number field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>Phone number</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput onChangeText={setPhoneNumber} style={styles.textBoxStyle}></TextInput>

      {/* Email field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>Email</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput onChangeText={setEmail} style={styles.textBoxStyle}></TextInput> 

      {/* Professional summary field and TextBox */}
      <Text style={styles.fieldTextStyle}>Professional summary</Text>
      <TextInput onChangeText={setProfessionalSummary} style={styles.bigTextBoxStyle}></TextInput>

      {/* Date of birth field and TextBox */}
      <Text style = {styles.fieldTextStyle}>
        <Text>Date of birth</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput onChangeText={setDob} style={styles.textBoxStyle} placeholder='MM/DD/YYYY' placeholderTextColor={'grey'}></TextInput>

      {/* Education header */}
      <Text style={styles.headerTextStyle}>Education</Text>

      {/* School name field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>School name</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput onChangeText={setSchoolName} style={styles.textBoxStyle}></TextInput> 

      {/* School country field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>Country</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput onChangeText={setSchoolCountry} style={styles.textBoxStyle}></TextInput>

      {/* School city field and TextBox */}
      <Text style={styles.fieldTextStyle}>City</Text>
      <TextInput onChangeText={setSchoolCity} style={styles.textBoxStyle}></TextInput>

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
        data={states}
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
      <TextInput onChangeText={setFieldOfStudy} style={styles.textBoxStyle}></TextInput>
      <Text style={{color: 'grey', marginLeft: 15}}>Ex. Health Science, Biology, Public Health, etc.</Text>

      {/* Home address header */}
      <Text style={styles.headerTextStyle}>Permanent home address</Text>

      {/* Home street address field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>Home street address</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput onChangeText={setHomeAddress} style={styles.textBoxStyle}></TextInput>

      {/* Home city field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>City</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput onChangeText={setHomeCity} style={styles.textBoxStyle}></TextInput>

      {/* Home state field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>State</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput onChangeText={setHomeState} style={styles.textBoxStyle}></TextInput>

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
        data={disciplines}
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

      {/* Years of specialty experience field and TextBox */}
      <Text style={styles.fieldTextStyle}>
        <Text>Years of specialty experience</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <TextInput onChangeText={setYearsOfSpecialty} style={styles.textBoxStyle}></TextInput>

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
