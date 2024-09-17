/* This is the parent page for Discipline, Certificate, License and License location page.
   it serves as a reusable component
*/

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Bar} from 'react-native-progress';
import {Dropdown} from 'react-native-element-dropdown';
import Backarrow from '../Components/Svg/Backarrow';
import {useNavigation} from '@react-navigation/native';
import {loadUser, saveUser, User} from '../Utility/userStorage';

// Define the prop types for the ParentPage component, make the ones which wont be used in every page optional by (?)
interface ParentPageProps {
  progress: number;
  options: Array<{label: string; value: string}>;
  certificate?: string;
  setCertificate?: (value: string) => void;
  license?: string;
  setLicense?: (value: string) => void;
  licenseLocation?: string;
  setLicenseLocation?: (value: string) => void;
  title: string;
  nextScreen?: string;
}

const ParentPage: React.FC<ParentPageProps> = ({
  progress,
  options,
  certificate,
  setCertificate,
  license,
  setLicense,
  licenseLocation,
  setLicenseLocation,
  title,
  nextScreen,
}) => {
  const navigation = useNavigation<any>();
  const [user, setUser] = useState<User | null>();

  //everytime the page mounts, this use effect would be called and the user object from local storage will be retrieved
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await loadUser();
      setUser(userData);
    };

    fetchUserData();
  }, []);

  const handleBack = () => {
    navigation.goBack();
    console.log('Back button clicked');
  };

  //this will handle the continue with each page, each page's specific logic can be entered inside the respective IF statement
  //will store those values in local storage temporarily.
  const handleContinue = async () => {
    try {
      // Create an updated user object with relevant fields to save locally later
      const updatedUser: User = {
        ...user,
        ...(certificate !== undefined && {certificate}),
        ...(license !== undefined && {license}),
        ...(licenseLocation !== undefined && {licenseLocation}),
      };

      // Save the updated user data
      await saveUser(updatedUser);

      console.log(
        'User data saved successfully, updatedUser:',
        JSON.stringify(updatedUser),
      );

      // Navigate to the next screen
      navigation.navigate(nextScreen);
      console.log('Continue button clicked');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  // Function to get the currently selected value based on which prop is provided
  const getSelectedValue = () => {
    if (certificate !== undefined) return certificate;
    if (license !== undefined) return license;
    if (licenseLocation !== undefined) return licenseLocation;
    return '';
  };

  //update whatever state based on if its provided
  const handleDropdownChange = (item: {value: string}) => {
    if (setCertificate) setCertificate(item.value);
    if (setLicense) setLicense(item.value);
    if (setLicenseLocation) setLicenseLocation(item.value);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={{position: 'absolute', top: 10, left: 0}}>
        <TouchableOpacity onPress={handleBack}>
          <Backarrow width={40} height={40} color={'#FFF'} />
        </TouchableOpacity>
      </View>

      {/* Logo Placement */}
      <View style={styles.logo}>
        <Text style={{color: '#0EA68D', fontSize: 65, fontWeight: 'bold'}}>
          M
        </Text>
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

export const styles = StyleSheet.create({
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
    marginTop:'70%',
   
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
