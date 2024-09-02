/* This is the parent page for Discipline, Certificate, License and License location page.
   it serves as a reusable component
*/

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Bar } from 'react-native-progress';
import { Dropdown } from 'react-native-element-dropdown';
import Backarrow from '../Components/Svg/Backarrow';
import { useNavigation } from '@react-navigation/native';

// Define the prop types for the ParentPage component, make the ones which wont be used in every page optional
interface ParentPageProps {
    progress: number;
    options: Array<{ label: string; value: string }>;
    discipline?: string;
    setDiscipline?: (value: string) => void;
    certificate?: string;
    setCertificate?: (value: string) => void;
    licenses?: string;
    setLicenses?: (value: string) => void;
    licenseLocation?: string;
    setLicenseLocation?: (value: string) => void;
    title: string;
    nextScreen: string;
}

const ParentPage: React.FC<ParentPageProps> = ({
    progress,
    options,
    discipline,
    setDiscipline,
    certificate,
    setCertificate,
    licenses,
    setLicenses,
    licenseLocation,
    setLicenseLocation,
    title,
    nextScreen,
   
}) => {
  const navigation = useNavigation<any>();

  const handleBack = () => {
    navigation.goBack();
    console.log('Back button clicked');
  };

  //this will handle the continue with each page, each page's specific logic can be entered inside the respective IF statement
  //will store those values in local storage temporarily.
  const handleContinue = () => {

     if (discipline !== undefined) {
        console.log('Discipline:', discipline);
    }
    if (certificate !== undefined) {
        console.log('Certificate:', certificate);
    }
    if (licenses !== undefined) {
        console.log('Licenses:', licenses);
    }
    if (licenseLocation !== undefined) {
        console.log('License Location:', licenseLocation);
    }

    navigation.navigate(nextScreen);
    console.log('Continue button clicked');
  };

  // Function to get the currently selected value based on which prop is provided
  const getSelectedValue = () => {
    if (discipline !== undefined) return discipline;
    if (certificate !== undefined) return certificate;
    if (licenses !== undefined) return licenses;
    if (licenseLocation !== undefined) return licenseLocation;
    return '';
  };

  //update whatever state based on if its provided
  const handleDropdownChange = (item: { value: string }) => {
    if (setDiscipline) setDiscipline(item.value);
    if (setCertificate) setCertificate(item.value);
    if (setLicenses) setLicenses(item.value);
    if (setLicenseLocation) setLicenseLocation(item.value);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={{ position: 'absolute', top: 10, left: 0 }}>
        <TouchableOpacity onPress={handleBack}>
          <Backarrow width={40} height={40} color={'#FFF'} />
        </TouchableOpacity>
      </View>

      {/* Logo Placement */}
      <View style={styles.logo}>
        <Text style={{ color: '#0EA68D', fontSize: 65, fontWeight: 'bold' }}>M</Text>
      </View>

      {/* Progress Text */}
      <Text style={styles.progressText}>Progress: {progress}%</Text>

      {/* Progress Bar */}
      <Bar
        progress={progress / 100}
        width={Dimensions.get('window').width * 0.8}
        color={'black'}
        borderRadius={0}
        unfilledColor={'#D9D9D9'}
        height={20}
      />

      {/* Title */}
      <Text style={styles.question}>{title}</Text>

      {/* Dropdown */}
      <Dropdown
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={options}
        search
        maxHeight={Dimensions.get('window').height * 0.3}
        labelField="label"
        valueField="value"
        placeholder="Select an option"
        searchPlaceholder="Search..."
        value={getSelectedValue()}
        onChange={handleDropdownChange}
      />

      {/* Continue Button */}
      <TouchableOpacity onPress={handleContinue} style={styles.continueTouch}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ParentPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0EA68D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    width: '80%',
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: '60%',
    backgroundColor: 'white',
    padding: '2%',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },
  continueText: {
    color: '#0EA68D',
    fontSize: 25,
    fontWeight: 'bold',
  },
  continueTouch: {
    backgroundColor: 'white',
    paddingHorizontal: '25%',
    paddingVertical: '2%',
    elevation: 5,
    marginBottom: '15%',
    borderRadius: 6,
  },
  progressText: {
    color: 'black',
    marginTop: '10%',
    marginLeft: '12%',
    fontSize: 25,
    alignSelf: 'flex-start',
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    color: 'black',
    marginTop: '7%',
    marginRight: '3%',
    marginBottom: '2%',
    fontSize: 25,
  },
});