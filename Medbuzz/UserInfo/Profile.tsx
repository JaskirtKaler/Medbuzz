/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  Image,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Modal,
  TextInput,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Backarrow from '../Components/Svg/Backarrow.tsx';
import CancelX from '../Components/Svg/CancelX.tsx';
import Editbutton from '../Components/Svg/Editbutton.tsx';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import UploadDoc from '../Screens/UploadDoc.tsx';
import CheckBox from '@react-native-community/checkbox';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import Calendar from '../Components/Svg/Calender.tsx';
import {hourlyPay} from '../mapVariables/optionsData.tsx';

// Interface for user's Staff Role Preferences
interface StaffRoles {
  startDate: string;
  preferredLocation: string;
  relocate: boolean;
  desiredPay: string;
  preferredHours: string;
}

// Interface for user's Local Contracts Preferences
interface LocalContracts {
  startDate: string;
  preferredLocation: string;
  relocate: boolean;
  desiredPay: string;
  preferredHours: string;
}

// Interface for user's Travel Contracts Preferences
interface TravelContracts {
  startDate: string;
  preferredLocation: string;
  relocate: boolean;
  desiredPay: string;
  preferredHours: string;
}

const Profile = () => {
  // useStates for the Calendar Date Picker
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  // Use State for user's Staff Role Preferences
  const [staffRolePrefs, setStaffRolePrefs] = useState<StaffRoles>({
    startDate: '',
    preferredLocation: '',
    relocate: false,
    desiredPay: '',
    preferredHours: '',
  });

  // Use State for user's Local Contracts Preferences
  const [localContractsPrefs, setLocalContractsPrefs] =
    useState<LocalContracts>({
      startDate: '',
      preferredLocation: '',
      relocate: false,
      desiredPay: '',
      preferredHours: '',
    });

  // Use State for user's Travel Contracts Preferences
  const [travelContractsPrefs, setTravelContractsPrefs] =
    useState<TravelContracts>({
      startDate: '',
      preferredLocation: '',
      relocate: false,
      desiredPay: '',
      preferredHours: '',
    });

  const [prefHours, setPrefHours] = useState(''); // state for the preferred hours selection in the preference Modals
  const [isRelocateSelected, setRelocateSelection] = useState(false); // State for checkbox in Job Preferences

  // Temporary useSates to handle changes to the user's Staff Role Preferences. Updates staffRolePrefs after confirmation
  const [tmpStartDate, setTmpStartDate] = useState('');
  const [tmpPreferredLocation, setTmpPreferredLocation] = useState('');
  const [tmpDesiredPay, setTmpDesiredPay] = useState('');
  // checkbox isRelocateSelcted value functions as the value for the relocate attribute of the staffRolePrefs
  // value for preffered hours is determined by the time checkboxe(s) which passes a string to the preferred hours use state

  // Used for profile strength indication on the page
  const [profileStrength, setProfileStrength] = useState(0);

  // resets the temporary useState variables
  const resetTmps = () => {
    setTmpStartDate('');
    setTmpPreferredLocation('');
    setTmpDesiredPay('');
    setRelocateSelection(false);
    setPrefHours('');
  };

  // funtion to update StaffRollPrefs based on tmp variable use states
  const updateStaffRolePrefs = () => {
    setStaffRolePrefs({
      startDate: tmpStartDate,
      preferredLocation: tmpPreferredLocation,
      relocate: isRelocateSelected,
      desiredPay: tmpDesiredPay,
      preferredHours: determinePrefHours(prefHours)
    });

    resetTmps();
  };

  // funtion to update LocalContractPrefs based on tmp variable use states
  const updateLocalContractsPrefs = () => {
    setLocalContractsPrefs({
      startDate: tmpStartDate,
      preferredLocation: tmpPreferredLocation,
      relocate: isRelocateSelected,
      desiredPay: tmpDesiredPay,
      preferredHours: determinePrefHours(prefHours)
    });

    resetTmps();
  };

  // funtion to update TravelContractsPrefs
  const updateTravelContractsPrefs = () => {
    setTravelContractsPrefs({
      startDate: tmpStartDate,
      preferredLocation: tmpPreferredLocation,
      relocate: isRelocateSelected,
      desiredPay: tmpDesiredPay,
      preferredHours: determinePrefHours(prefHours)
    });

    resetTmps();
  };

  // function to return the preferred hours or return an error if there is a problem
  const determinePrefHours = (chosenHours: string) => {
    return chosenHours || 'ERROR: cannot determine preferred hours';
  };

  // Precondition: a UserObject must have come from AsyncStorage.
  // This function takes quite a naive approach. But it works.
  const calculateProfileStrength = async (userObject:any) => {
    // If userObject is null, then set profile strength to zero and return
    if (userObject === null) {
      setProfileStrength(0);
      return;
    }

    var profileStrengthScore:number = 0 // Used in this function to accumulate the score of the profile strength
    const numberOfProfileDataPoints:number = 19; // How many fileds that need to be filled for 100% profile strength
    // console.log("In calculateProfileStrength"); // For debugging
    // console.log(userObject); // For debugging
    
    if (userObject.profilePicture !== null) {
      // console.log("Add picture to score"); // For debugging
      profileStrengthScore += 1;
    }

    if (userObject.personalInfo.firstName !== '' && userObject.personalInfo.firstName !== null) {
      // console.log("Add firstName to score"); // For debugging
      profileStrengthScore += 1;
    }

    if (userObject.personalInfo.lastName !== '' && userObject.personalInfo.lastName !== null) {
      // console.log("Add lastName to score"); // For debugging
      profileStrengthScore += 1;
    }

    if (userObject.personalInfo.phoneNumber !== '' && userObject.personalInfo.phoneNumber !== null) {
      // console.log("Add phoneNumber to score"); // For debugging
      profileStrengthScore += 1;
    }

    if (userObject.personalInfo.email !== '' && userObject.personalInfo.email !== null) {
      // console.log("Add email to score"); // For debugging
      profileStrengthScore += 1;
    }

    if (userObject.education.schoolName !== '' && userObject.education.schoolName !== null) {
      // console.log("Add schoolName to score"); // For debugging
      profileStrengthScore += 1;
    }

    // if (userObject.education.schoolCountry !== '' && userObject.education.schoolCountry !== null) {
    //   console.log("Add school country to score"); // For debugging
    //   profileStrengthScore += 1;
    // }
    
    if (userObject.homeAddress.street !== '' && userObject.homeAddress.street !== null) {
      // console.log("Add homeAddress street to score"); // For debugging
      profileStrengthScore += 1;
    }

    if (userObject.homeAddress.city !== '' && userObject.homeAddress.city !== null) {
      // console.log("Add city to score"); // For debugging
      profileStrengthScore += 1;
    }

    if (userObject.homeAddress.state !== '' && userObject.homeAddress.state !== null) {
      // console.log("Add state to score"); // For debugging
      profileStrengthScore += 1;
    }

    if (userObject.homeAddress.zipcode !== '' && userObject.homeAddress.zipcode !== null) {
      // console.log("Add zipcode to score"); // For debugging
      profileStrengthScore += 1;
    }

    if (userObject.expertise.discipline !== '' && userObject.expertise.discipline !== null) {
      // console.log("Add disciplineto score"); // For debugging
      profileStrengthScore += 1;
    }

    if (userObject.expertise.certification !== '' && userObject.expertise.certification !== null) {
      // console.log("Add certification to score"); // For debugging
      profileStrengthScore += 1;
    }

    if (userObject.expertise.yearsOfExperience !== '' && userObject.expertise.yearsOfExperience !== null) {
      // console.log("Add yearsOfExperience to score"); // For debugging
      profileStrengthScore += 1;
    }

    if (userObject.identityVerification.DOB !== '' && userObject.identityVerification.DOB !== null) {
      // console.log("Add DOB to score"); // For debugging
      profileStrengthScore += 1;
    }

    if (userObject.identityVerification.last4ssn !== '' && userObject.identityVerification.last4ssn !== null) {
      // console.log("Add last4ssn to score"); // For debugging
      profileStrengthScore += 1;
    }

    if (userObject.identityVerification.legalFirstName !== '' && userObject.identityVerification.legalFirstName !== null) {
      // console.log("Add legalFirstName to score"); // For debugging
      profileStrengthScore += 1;
    }

    if (userObject.identityVerification.legalLastName == '' && userObject.identityVerification.legalLastName !== null) {
      // console.log("Add legalLastName to score"); // For debugging
      profileStrengthScore += 1;
    }

    // if (userObject.uploadedFiles.resume !== '' && userObject.uploadedFiles.resume !== null) {
    //   console.log("Add resume to score"); // For debugging
    //   profileStrengthScore += 1;
    // }

    if (userObject.degree !== '' && userObject.degree !== null) {
      // console.log("Add degree to score"); // For debugging
      profileStrengthScore += 1;
    }

    if (userObject.certifications !== '' && userObject.certifications !== null) {
      // console.log("Add certifications to score"); // For debugging
      profileStrengthScore += 1;
    }
    
    profileStrengthScore = Math.floor(100 * (profileStrengthScore / numberOfProfileDataPoints));
    // console.log(`profile strength: ${profileStrengthScore}`);  // For debugging

    setProfileStrength(profileStrengthScore);
  };

  // Modals
  const [staffRoleModalVisible, setStaffRoleModalVisible] = useState(false); // State for edit Modal
  const [travelContractsModalVisible, setTravelContractsModalVisible] = useState(false); // State for edit Modal
  const [localContractsModalVisible, setLocalContractsModalVisible] = useState(false); // State for edit Modal
  
  // Declare useState variables for profile data
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  // Load profile data from AsyncStorage
  /**
   * Focus Effect update the locate variabels right away after you nav from editbasic details
   * can also load in other Job Preference Objects 
   */
  useFocusEffect(
    React.useCallback(() => {
      const loadProfile = async () => {
        try {
          const storedProfile = await AsyncStorage.getItem('userProfile');
          if (storedProfile !== null) {
            const profileData = JSON.parse(storedProfile);
  
            // Update state variables with stored data
            setFirstName(profileData.personalInfo.firstName || '');
            setLastName(profileData.personalInfo.lastName || '');
            setEmail(profileData.personalInfo.email || '');
            setPhoneNumber(profileData.personalInfo.phoneNumber || '');
            calculateProfileStrength(profileData);
          } else {
            console.log('No Profile found in async storage');
          }
        } catch (error) {
          console.log('Error loading profile data:', error);
        }
      };
  
      loadProfile();
    }, [])
  );


  const [staffRoles, setStaffRoles] = useState(false); // State for actively looking switch (Staff Roles)
  const [localContracts, setLocalContracts] = useState(false); // State for actively looking switch (Local Contracts)
  const [travelContracts, setTravelContracts] = useState(false); // State for actively looking switch (Travel Contracts)
  const [showStaffDetails, setShowStaffDetails] = useState(false); // State for staff roles details
  const [showTravelDetails, setShowTravelDetails] = useState(false); // State for travel contracts details
  const [showLocalDetails, setShowLocalDetails] = useState(false); // State for local contracts details
  const navigation = useNavigation<any>(); // Stack Navigation

  // Function to toggle visibility of staff roles details
  const toggleStaffDetails = () => {
    setShowStaffDetails(!showStaffDetails);
    console.log('staff roles see more details clicked');
  };

  // Function to toggle visibility of travel contracts details
  const toggleTravelDetails = () => {
    setShowTravelDetails(!showTravelDetails);
    console.log('travel contracts see more details clicked');
  };

  // Function to toggle visibility of local contracts details
  const toggleLocalDetails = () => {
    setShowLocalDetails(!showLocalDetails);
    console.log('local contracts see more details clicked');
  };

  const handleEdit = () => {
    navigation.navigate('EditBasicDetails');
    console.log('edit clicked');
  };

  const handleDoc = () => {
    console.log('doc pressed');
  };

  const handleStaffSwitch = () => {
    console.log('Staff roles switch clicked');
  };

  const handleTravelSwitch = () => {
    console.log('Travel contracts switch clicked');
  };

  const handleLocalSwitch = () => {
    console.log('Local contracts switch clicked');
  };

  const handleStringProp = (stringProp: string) => {
    switch (stringProp) {
      case 'Resume':
        navigation.navigate('UploadDoc', {header: 'Resume'});
        break;
      case 'Degree':
        navigation.navigate('UploadDoc', {header: 'Degree'});
        break;
      case 'Certifications':
        navigation.navigate('UploadDoc', {header: 'Certifications'});
        break;
      case 'References':
        navigation.navigate('UploadDoc', {header: 'References'});
        break;
      case 'Vaccination':
        navigation.navigate('UploadDoc', {header: 'Vaccination'});
        break;
      default:
        navigation.navigate(UploadDoc, {header: 'Error'});
        break;
    }
    console.log(stringProp);
  };

  // When License btn is clicked
  const handleLicense = () => {
    navigation.navigate('UpdateLicense');
    console.log('License');
  };

  return (
    <View style={styles.container}>
      {/* Modal for editing Staff Role Preferences */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={staffRoleModalVisible}
        onRequestClose={() => {
          setStaffRoleModalVisible(!staffRoleModalVisible);
        }}>
        <View style={{flex: 1}}>
          <View style={styles.modalStyle}>
            <View style={{flexDirection: 'row'}}>
              {/* Modal Title */}
              <Text style={styles.modalTitle}>Staff Role Preferences</Text>

              {/* Cancel Button */}
              <TouchableOpacity
                style={styles.cancelModalButton}
                onPress={() => {
                  setStaffRoleModalVisible(!staffRoleModalVisible);
                }}>
                <CancelX width={20} height={20} color={'#000'}></CancelX>
              </TouchableOpacity>
            </View>

            {/* Start Date selection */}
            <Text style={styles.modalQuestion}>
              When would you like to start?
            </Text>

            {/* Calendar Date Picker */}
            <TouchableOpacity
              style={styles.calendarTextBoxStyle}
              onPress={() => setOpen(true)}>
              <Text style={{marginLeft: 3}}>{tmpStartDate}</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginRight: 3,
                }}>
                <Calendar height={30} width={30} color="#555"></Calendar>
                <DatePicker
                  mode="date"
                  modal={true}
                  open={open}
                  date={date}
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                    setTmpStartDate(date.toLocaleDateString());
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </View>
            </TouchableOpacity>

            {/* Preferred Location Selection */}
            <Text style={styles.modalQuestion}>Choose preferred locations</Text>
            <TextInput
              placeholder="Type any cities, states, or regions"
              onChangeText={newText => setTmpPreferredLocation(newText)}
              style={styles.textBoxStyle}></TextInput>

            {/* Open to relocation selection */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '2%',
              }}>
              <CheckBox
                value={isRelocateSelected}
                onValueChange={setRelocateSelection}
              />
              <Text style={styles.modalQuestion}>Open to relocation</Text>
            </View>

            {/* Desired Pay dropdown menu selection */}
            <View style={{marginTop: '2%'}}>
              <Text style={styles.modalQuestion}>Desired Pay (Hourly)</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={hourlyPay}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="$"
                searchPlaceholder="Search..."
                value={tmpDesiredPay}
                onChange={item => {
                  setTmpDesiredPay(item.value);
                }}
              />
            </View>

            {/* Checkbox selection for preferred shift time */}
            <View>
              <Text style={styles.modalQuestion}>
                Preferred Hours (select one)
              </Text>
              <View style={styles.timeSelectionStyle}>
                <CheckBox
                  value={prefHours === 'Morning'}
                  onValueChange={() => setPrefHours('Morning')}
                />
                <Text style={styles.timeOptionStyle}>Morning</Text>
                <CheckBox
                  value={prefHours === 'Afternoon'}
                  onValueChange={() => setPrefHours('Afternoon')}
                />
                <Text style={styles.timeOptionStyle}>Afternoon</Text>
                <CheckBox
                  value={prefHours === 'Evening'}
                  onValueChange={() => setPrefHours('Evening')}
                />
                <Text style={styles.timeOptionStyle}>Evening</Text>
                <CheckBox
                  value={prefHours === 'Flexible'}
                  onValueChange={() => setPrefHours('Flexible')}
                />
                <Text style={styles.timeOptionStyle}>Flexible</Text>
              </View>
            </View>

            {/* Confirm Choices Button */}
            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.exitModalButton}
                onPress={() => {
                  updateStaffRolePrefs();
                  // updateUserObject();
                  setStaffRoleModalVisible(!staffRoleModalVisible);
                }}>
                <Text style={styles.exitModalButtonText}>Confirm Choices</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for editing Travel Contract Preferences */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={travelContractsModalVisible}
        onRequestClose={() => {
          setTravelContractsModalVisible(!travelContractsModalVisible);
        }}>
        <View style={{flex: 1}}>
          <View style={styles.modalStyle}>
            <View style={{flexDirection: 'row'}}>
              {/* Modal Title */}
              <Text style={styles.modalTitle}>Travel Contract Preferences</Text>

              {/* Cancel Button */}
              <TouchableOpacity
                style={styles.cancelModalButton}
                onPress={() => {
                  setTravelContractsModalVisible(!travelContractsModalVisible);
                }}>
                <CancelX width={20} height={20} color={'#000'}></CancelX>
              </TouchableOpacity>
            </View>

            {/* Start Date selection */}
            <Text style={styles.modalQuestion}>
              When would you like to start?
            </Text>

            {/* Calendar Date Picker */}
            <TouchableOpacity
              style={styles.calendarTextBoxStyle}
              onPress={() => setOpen(true)}>
              <Text style={{marginLeft: 3}}>{tmpStartDate}</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginRight: 3,
                }}>
                <Calendar height={30} width={30} color="#555"></Calendar>
                <DatePicker
                  mode="date"
                  modal={true}
                  open={open}
                  date={date}
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                    setTmpStartDate(date.toLocaleDateString());
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </View>
            </TouchableOpacity>

            {/* Preferred Location Selection */}
            <Text style={styles.modalQuestion}>Choose preferred locations</Text>
            <TextInput
              placeholder="Type any cities, states, or regions"
              onChangeText={newText => setTmpPreferredLocation(newText)}
              style={styles.textBoxStyle}></TextInput>

            {/* Open to relocation selection */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '2%',
              }}>
              <CheckBox
                value={isRelocateSelected}
                onValueChange={setRelocateSelection}
              />
              <Text style={styles.modalQuestion}>Open to relocation</Text>
            </View>

            {/* Desired Pay dropdown menu selection */}
            <View style={{marginTop: '2%'}}>
              <Text style={styles.modalQuestion}>Desired Pay (Hourly)</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={hourlyPay}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="$"
                searchPlaceholder="Search..."
                value={tmpDesiredPay}
                onChange={item => {
                  setTmpDesiredPay(item.value);
                }}
              />
            </View>

            {/* Checkbox selection for preferred shift time */}
            <View>
              <Text style={styles.modalQuestion}>
                Preferred Hours (select one)
              </Text>
              <View style={styles.timeSelectionStyle}>
                <CheckBox
                  value={prefHours === 'Morning'}
                  onValueChange={() => setPrefHours('Morning')}
                />
                <Text style={styles.timeOptionStyle}>Morning</Text>
                <CheckBox
                  value={prefHours === 'Afternoon'}
                  onValueChange={() => setPrefHours('Afternoon')}
                />
                <Text style={styles.timeOptionStyle}>Afternoon</Text>
                <CheckBox
                  value={prefHours === 'Evening'}
                  onValueChange={() => setPrefHours('Evening')}
                />
                <Text style={styles.timeOptionStyle}>Evening</Text>
                <CheckBox
                  value={prefHours === 'Flexible'}
                  onValueChange={() => setPrefHours('Flexible')}
                />
                <Text style={styles.timeOptionStyle}>Flexible</Text>
              </View>
            </View>

            {/* Confirm Choices Button */}
            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.exitModalButton}
                onPress={() => {
                  updateTravelContractsPrefs();
                  setTravelContractsModalVisible(!travelContractsModalVisible);
                }}>
                <Text style={styles.exitModalButtonText}>Confirm Choices</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for editing Local Contract Preferences */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={localContractsModalVisible}
        onRequestClose={() => {
          setLocalContractsModalVisible(!localContractsModalVisible);
        }}>
        <View style={{flex: 1}}>
          <View style={styles.modalStyle}>
            <View style={{flexDirection: 'row'}}>
              {/* Modal Title */}
              <Text style={styles.modalTitle}>Local Contract Preferences</Text>

              {/* Cancel Button */}
              <TouchableOpacity
                style={styles.cancelModalButton}
                onPress={() => {
                  setLocalContractsModalVisible(!localContractsModalVisible);
                }}>
                <CancelX width={20} height={20} color={'#000'}></CancelX>
              </TouchableOpacity>
            </View>

            {/* Start Date selection */}
            <Text style={styles.modalQuestion}>
              When would you like to start?
            </Text>

            {/* Calendar Date Picker */}
            <TouchableOpacity
              style={styles.calendarTextBoxStyle}
              onPress={() => setOpen(true)}>
              <Text style={{marginLeft: 3}}>{tmpStartDate}</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginRight: 3,
                }}>
                <Calendar height={30} width={30} color="#555"></Calendar>
                <DatePicker
                  mode="date"
                  modal={true}
                  open={open}
                  date={date}
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                    setTmpStartDate(date.toLocaleDateString());
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </View>
            </TouchableOpacity>

            {/* Preferred Location Selection */}
            <Text style={styles.modalQuestion}>Choose preferred locations</Text>
            <TextInput
              placeholder="Type any cities, states, or regions"
              onChangeText={newText => setTmpPreferredLocation(newText)}
              style={styles.textBoxStyle}></TextInput>

            {/* Open to relocation selection */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '2%',
              }}>
              <CheckBox
                value={isRelocateSelected}
                onValueChange={setRelocateSelection}
              />
              <Text style={styles.modalQuestion}>Open to relocation</Text>
            </View>

            {/* Desired Pay dropdown menu selection */}
            <View style={{marginTop: '2%'}}>
              <Text style={styles.modalQuestion}>Desired Pay (Hourly)</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={hourlyPay}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="$"
                searchPlaceholder="Search..."
                value={tmpDesiredPay}
                onChange={item => {
                  setTmpDesiredPay(item.value);
                }}
              />
            </View>

            {/* Checkbox selection for preferred shift time */}
            <View>
              <Text style={styles.modalQuestion}>
                Preferred Hours (select one)
              </Text>
              <View style={styles.timeSelectionStyle}>
                <CheckBox
                  value={prefHours === 'Morning'}
                  onValueChange={() => setPrefHours('Morning')}
                />
                <Text style={styles.timeOptionStyle}>Morning</Text>
                <CheckBox
                  value={prefHours === 'Afternoon'}
                  onValueChange={() => setPrefHours('Afternoon')}
                />
                <Text style={styles.timeOptionStyle}>Afternoon</Text>
                <CheckBox
                  value={prefHours === 'Evening'}
                  onValueChange={() => setPrefHours('Evening')}
                />
                <Text style={styles.timeOptionStyle}>Evening</Text>
                <CheckBox
                  value={prefHours === 'Flexible'}
                  onValueChange={() => setPrefHours('Flexible')}
                />
                <Text style={styles.timeOptionStyle}>Flexible</Text>
              </View>
            </View>

            {/* Confirm Choices Button */}
            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.exitModalButton}
                onPress={() => {
                  updateLocalContractsPrefs();
                  setLocalContractsModalVisible(!localContractsModalVisible);
                }}>
                <Text style={styles.exitModalButtonText}>Confirm Choices</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.topThird}>
        {/* Back Arrow */}
        <View style={styles.svgContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.backArrowTopLeft}>
              <Backarrow width={40} height={40} color={'#000'} />
            </View>
          </TouchableOpacity>
          {/* Edit Button */}
          <TouchableOpacity onPress={handleEdit}>
            <View style={styles.editButtonTopRight}>
              <Editbutton width={40} height={40} color={'#000'} />
            </View>
          </TouchableOpacity>
        </View>
        {/* Profile Picture section */}
        <View style={styles.profilePictureContainer}>
          {/* While user does not have a profile picture uploaded, their initials are their profile picture */}
          <Text style={styles.profilePictureFirstInitial}>
            {firstName.charAt(0).toUpperCase()}
          </Text>
          <Text style={styles.profilePictureFirstInitial}>
            {lastName.charAt(0).toUpperCase()}
          </Text>
        </View>

        {/* Name section */}
        <View style={styles.nameContainer}>
          <Text style={styles.firstName}>{firstName}</Text>
          <Text style={styles.lastName}>{lastName}</Text>
        </View>

        {/* Specialty section */}
        <Text style={styles.specialty}>{}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.bottomTwoThirds}>
          {/* Profile strength section */}
          <View style={styles.profileStrengthSection}>
            <View style={styles.profileStrengthTextContainer}>
              <Text style={styles.profileStrengthText}>Profile Strength</Text>
              <Text style={styles.profileStrengthPercentage}>
                {profileStrength}%
              </Text>
            </View>

            {/* Profile strength bar */}
            <View style={styles.profileStrengthBarContainer}>
              <View style={styles.profileStrengthBarOutline}>
                <View
                  style={[
                    styles.profileStrengthBar,
                    {width: `${profileStrength}%`},
                  ]}
                />
              </View>
            </View>

            {/* Phone section */}
            <View style={styles.phoneContainer}>
              <Text style={styles.phoneLabel}>Phone</Text>
              <Text style={styles.phoneNumber}>{phoneNumber}</Text>
            </View>

            {/* Email section */}
            <View style={styles.emailContainer}>
              <Text style={styles.phoneLabel}>Email</Text>
              <Text style={styles.phoneNumber}>{email}</Text>
            </View>
          </View>

          {/* Line */}
          <View style={styles.line} />

          {/* Additional sections */}
          <View style={styles.additionalSectionsContainer}>
            {/* Resume */}
            <TouchableOpacity
              style={styles.additionalSectionRow}
              onPress={() => handleStringProp('Resume')}>
              <Text style={styles.additionalSection}>Resume</Text>
              <View style={styles.rightArrowAlign}>
                <Text style={styles.rightArrow}>{'>'}</Text>
              </View>
            </TouchableOpacity>

            {/* Licenses */}
            <TouchableOpacity
              style={styles.additionalSectionRow}
              onPress={handleLicense}>
              <Text style={styles.additionalSection}>Licenses</Text>
              <View style={styles.rightArrowAlign}>
                <Text style={styles.rightArrow}>{'>'}</Text>
              </View>
            </TouchableOpacity>

            {/* Degree */}
            <TouchableOpacity
              style={styles.additionalSectionRow}
              onPress={() => handleStringProp('Degree')}>
              <Text style={styles.additionalSection}>Degree</Text>
              <View style={styles.rightArrowAlign}>
                <Text style={styles.rightArrow}>{'>'}</Text>
              </View>
            </TouchableOpacity>

            {/* Certifications */}
            <TouchableOpacity
              style={styles.additionalSectionRow}
              onPress={() => handleStringProp('Certifications')}>
              <Text style={styles.additionalSection}>Certifications</Text>
              <View style={styles.rightArrowAlign}>
                <Text style={styles.rightArrow}>{'>'}</Text>
              </View>
            </TouchableOpacity>

            {/* References */}
            <TouchableOpacity
              style={styles.additionalSectionRow}
              onPress={() => handleStringProp('References')}>
              <Text style={styles.additionalSection}>References</Text>
              <View style={styles.rightArrowAlign}>
                <Text style={styles.rightArrow}>{'>'}</Text>
              </View>
            </TouchableOpacity>

            {/* Vaccination */}
            <TouchableOpacity
              style={styles.additionalSectionRow}
              onPress={() => handleStringProp('Vaccination')}>
              <Text style={styles.additionalSection}>Vaccination</Text>
              <View style={styles.rightArrowAlign}>
                <Text style={styles.rightArrow}>{'>'}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Line */}
          <View style={styles.line} />

          {/* Job Preferences section */}
          <View style={styles.jobPreferencesContainer}>
            <Text style={styles.jobPreferencesText}>Job Preferences</Text>

            {/* Staff Roles Actively Looking Switch */}
            <View style={styles.switchContainer}>
              <Text style={styles.activelyLookingText}>Actively Looking</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={staffRoles ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  setStaffRoles(!staffRoles);
                  handleStaffSwitch();
                }}
                value={staffRoles}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.jobTypeText}>Staff Roles</Text>

              {/* Edit button*/}
              <TouchableOpacity
                onPress={() =>
                  setStaffRoleModalVisible(!staffRoleModalVisible)
                }>
                <Editbutton
                  width={25}
                  height={25}
                  color={'#000'}
                  style={{marginRight: '10%', marginTop: 10}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.seeMoreDetailsContainer}>
              <TouchableOpacity onPress={toggleStaffDetails}>
                <Text style={styles.seeMoreDetailsText}>
                  {' '}
                  {'>'} See more details
                </Text>
              </TouchableOpacity>

              {/* Staff Roles See More Details Information*/}
              {showStaffDetails && (
                <View style={styles.seeMoreDetailsInformationContainer}>
                  <Text style={styles.seeMoreDetailsInformation}>
                    Preferred Start Date: {staffRolePrefs.startDate}
                  </Text>
                  <Text style={styles.seeMoreDetailsInformation}>
                    Preferred Location: {staffRolePrefs.preferredLocation}
                  </Text>
                  <Text style={styles.seeMoreDetailsInformation}>
                    Open to Relocation: {staffRolePrefs.relocate ? 'yes' : 'no'}
                  </Text>
                  <Text style={styles.seeMoreDetailsInformation}>
                    Desired Pay: {staffRolePrefs.desiredPay}
                  </Text>
                  <Text style={styles.seeMoreDetailsInformation}>
                    Preferred Hours: {staffRolePrefs.preferredHours}
                  </Text>
                </View>
              )}
            </View>

            {/* Travel Contracts Actively Looking Switch */}
            <View style={styles.switchContainer}>
              <Text style={styles.activelyLookingText}>Actively Looking</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={travelContracts ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  setTravelContracts(!travelContracts);
                  handleTravelSwitch();
                }}
                value={travelContracts}
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.jobTypeText}>Travel Contracts</Text>

              {/* Edit Button */}
              <TouchableOpacity
                onPress={() =>
                  setTravelContractsModalVisible(!travelContractsModalVisible)
                }>
                <Editbutton
                  width={25}
                  height={25}
                  color={'#000'}
                  style={{marginRight: '10%', marginTop: 10}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.seeMoreDetailsContainer}>
              <TouchableOpacity onPress={toggleTravelDetails}>
                <Text style={styles.seeMoreDetailsText}>
                  {' '}
                  {'>'} See more details
                </Text>
              </TouchableOpacity>

              {/* Travel Contracts See More Details Information*/}
              {showTravelDetails && (
                <View style={styles.seeMoreDetailsInformationContainer}>
                  <Text style={styles.seeMoreDetailsInformation}>
                    Preferred Start Date: {travelContractsPrefs.startDate}
                  </Text>
                  <Text style={styles.seeMoreDetailsInformation}>
                    Preferred Location: {travelContractsPrefs.preferredLocation}
                  </Text>
                  <Text style={styles.seeMoreDetailsInformation}>
                    Open To Relocation:{' '}
                    {travelContractsPrefs.relocate ? 'yes' : 'no'}
                  </Text>
                  <Text style={styles.seeMoreDetailsInformation}>
                    Desired Pay: {travelContractsPrefs.desiredPay}
                  </Text>
                  <Text style={styles.seeMoreDetailsInformation}>
                    Preferred Hours: {travelContractsPrefs.preferredHours}
                  </Text>
                </View>
              )}
            </View>

            {/* Local Contracts Actively Looking Switch */}
            <View style={styles.switchContainer}>
              <Text style={styles.activelyLookingText}>Actively Looking</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={localContracts ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  setLocalContracts(!localContracts);
                  handleLocalSwitch();
                }}
                value={localContracts}
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.jobTypeText}>Local Contracts</Text>

              {/* Edit Button */}
              <TouchableOpacity
                onPress={() =>
                  setLocalContractsModalVisible(!localContractsModalVisible)
                }>
                <Editbutton
                  width={25}
                  height={25}
                  color={'#000'}
                  style={{marginRight: '10%', marginTop: 10}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.seeMoreDetailsContainer}>
              <TouchableOpacity onPress={toggleLocalDetails}>
                <Text style={styles.seeMoreDetailsText}>
                  {' '}
                  {'>'} See more details
                </Text>
              </TouchableOpacity>

              {/* Local Contracts See More Details Information*/}
              {showLocalDetails && (
                <View style={styles.seeMoreDetailsInformationContainer}>
                  <Text style={styles.seeMoreDetailsInformation}>
                    Preferred Start Date: {localContractsPrefs.startDate}
                  </Text>
                  <Text style={styles.seeMoreDetailsInformation}>
                    Preferred Location: {localContractsPrefs.preferredLocation}
                  </Text>
                  <Text style={styles.seeMoreDetailsInformation}>
                    Open to Relocation:{' '}
                    {localContractsPrefs.relocate ? 'yes' : 'no'}
                  </Text>
                  <Text style={styles.seeMoreDetailsInformation}>
                    Desired Pay: {localContractsPrefs.desiredPay}
                  </Text>
                  <Text style={styles.seeMoreDetailsInformation}>
                    Preferred Hours: {localContractsPrefs.preferredHours}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  topThird: {
    height: Platform.OS === 'ios' ? '28%' : '22%',
    width: '100%',
    // paddingHorizontal: '5%',
    paddingHorizontal: Platform.OS === 'ios' ? '5%' : 0,
    paddingTop: Platform.OS === 'ios' ? '6%' : 0,
    backgroundColor: '#0EA68D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  backArrowTopLeft: {
    justifyContent: 'flex-start',
  },
  editButtonTopRight: {
    justifyContent: 'flex-end',
  },
  scrollViewContent: {
    paddingBottom: 5,
  },
  profilePictureContainer: {
    width: 70,
    height: 70,
    backgroundColor: 'lightgrey',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  profilePictureFirstInitial: {
    fontSize: 30,
    color: 'black',
    marginRight: 1,
    marginLeft: 1,
  },
  profilePictureLastInitial: {
    fontSize: 20,
    color: 'white',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  firstName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 5,
  },
  lastName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  specialty: {
    fontSize: 12,
    color: 'black',
    opacity: 0.5,
  },
  profileStrengthSection: {
    marginLeft: 15,
    marginRight: 15,
  },
  profileStrengthTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  profileStrengthText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 5,
  },
  profileStrengthPercentage: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  profileStrengthBarContainer: {
    height: 15,
    backgroundColor: 'white',
    marginTop: 5,
  },
  profileStrengthBarOutline: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  profileStrengthBar: {
    height: '100%',
    backgroundColor: '#0EA68D',
    borderRadius: 10,
  },
  phoneContainer: {
    marginTop: 30,
  },
  phoneLabel: {
    fontSize: 13,
    color: 'black',
  },
  phoneNumber: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  emailContainer: {
    marginTop: 20,
  },
  emailLabel: {
    fontSize: 13,
    color: 'black',
  },
  email: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: 'gray',
    marginTop: 30,
    opacity: 0.5,
  },
  additionalSectionsContainer: {
    marginTop: 10,
    marginLeft: 15,
  },
  additionalSection: {
    flex: 1,
    fontSize: 19,
    marginTop: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  additionalSectionRow: {
    flexDirection: 'row',
  },
  rightArrow: {
    fontSize: 20,
    color: 'black',
    marginRight: 35,
    marginTop: 20,
  },
  rightArrowAlign: {
    justifyContent: 'center',
  },
  jobPreferencesContainer: {
    marginTop: 30,
    marginLeft: 15,
  },
  jobPreferencesText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C2EEE7',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 25,
    marginLeft: 10,
    marginTop: 10,
  },
  activelyLookingText: {
    flex: 1,
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  jobTypeText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    marginLeft: 30,
    flex: 1,
  },
  seeMoreDetailsContainer: {
    marginBottom: 30,
  },
  seeMoreDetailsText: {
    fontSize: 14,
    color: 'black',
    marginTop: 15,
    marginLeft: 30,
  },
  seeMoreDetailsInformation: {
    fontSize: 14,
    color: 'black',
    marginLeft: 10,
    marginBottom: 10,
  },
  seeMoreDetailsInformationContainer: {
    marginTop: 5,
    marginLeft: 30,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.5)', // 0.5 opacity
    borderRadius: 7,
    marginRight: 25,
  },
  bottomTwoThirds: {
    flex: 4,
    backgroundColor: 'white',
  },

  exitModalButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 320,
    backgroundColor: '#0EA68D',
    borderRadius: 6,
    marginTop: '15%',
    borderColor: 'gray',
    borderWidth: 1,
    elevation: 5,
  },

  exitModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center',
  },

  modalTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'black',
    marginLeft: '4%',
    marginTop: '2%',
    marginBottom: '3%',
  },

  textBoxStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: '4%',
    marginRight: '4%',
    marginTop: '3%',
    marginBottom: '3%',
    height: 40,
  },

  calendarTextBoxStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: '4%',
    marginRight: '4%',
    marginTop: '3%',
    marginBottom: '3%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalQuestion: {
    color: 'black',
    marginLeft: '4%',
    fontSize: 18,
  },

  dropdown: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: '4%',
    marginRight: '4%',
    marginTop: '3%',
    marginBottom: '3%',
    height: 40,
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

  modalStyle: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1.5,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: Platform.OS === 'ios' ? '90%' : '60%',
  },

  timeOptionStyle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 17,
  },

  timeSelectionStyle: {
    flexDirection: 'row',
    justifyContent: Platform.OS === 'ios' ? 'space-between' : 'space-around',
    marginLeft: '2%',
    marginRight: '4%',
  },

  cancelModalButton: {
    flex: 1,
    marginRight: '4%',
    alignItems: 'flex-end',
    alignSelf: 'center',
  },
});

export default Profile;
