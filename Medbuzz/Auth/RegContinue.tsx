/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
// RegContinue.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import Backarrow from '../Components/Svg/Backarrow';
const {height, width} = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';

//creating a new typescript interface so that it be passed when creating the user state
// this is needed when using the spread operator, because spread operator can only be used with object types
interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  referral?: string;
}

const RegContinue = () => {
  const [isSelected, setSelection] = useState(false);
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [referral, setReferral] = useState('');
  const [user, setUser] = useState<User>();
  const navigation = useNavigation<any>();

  const allInputsFilled = password && phoneNumber && referral && isSelected;

  //everytime the page mounts, this use effect would be called and the user object from local storage will be retrieved
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData !== null) {
          setUser(JSON.parse(userData)); // Parse the user data and set it in the state
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUser();
  }, []);

  const handleContinue = async () => {
    if (allInputsFilled) {
      try {
        const updatedUser: User = {
          ...user,
          password,
          phoneNumber,
          referral,
        };
        // Save the updated user object back to AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

        console.log('Updated user object with 4 new attributes' + JSON.stringify(updatedUser));

        navigation.navigate('Discipline');
      } catch (error) {
        console.log(
          'There was an error while saving the updated user info' + error,
        );
      }
    } else {
      Alert.alert(
        'Incomplete Form',
        'Please fill all the inputs and agree to the terms to continue.',
        [{text: 'OK'}],
      );
    }
  };

  // Ensures that only numbers are entered and limits the input to 2 digits
  const handleExperienceInput = (text: string) => {

    // Remove non-numeric characters
    const numericValue = text.replace(/\D/g, '');

    // Format the value to (***)***-****
    let formattedNumber = numericValue;

    if (numericValue.length === 3) {
      // Add first '('  and ')' after first 3 numbers
      formattedNumber = '(' + numericValue.slice(0, 3) + ')';
    } else if (numericValue.length > 3 && numericValue.length <= 6) {
      // Add next 3 numbers after parentheses
      formattedNumber = '(' + numericValue.slice(0, 3) + ')' + numericValue.slice(3, 6)
    } else if (numericValue.length > 6) {
      // Add '-' between the last 4 numers and the previous numbers
      formattedNumber = '(' + numericValue.slice(0, 3) + ')' + numericValue.slice(3, 6) + '-' + numericValue.slice(6)
    }

    return formattedNumber
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.select({ios: 60, android: 80})}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Backarrow width={40} height={40} color={'white'} />
        </TouchableOpacity>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>M</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            placeholderTextColor="#ddd"
            secureTextEntry
          />
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={(text) => {setPhoneNumber(handleExperienceInput(text))}}
            placeholderTextColor="#ddd"
            keyboardType="phone-pad"
            maxLength={13}
          />
          <Text style={styles.label}>How did you hear about us?</Text>
          <TextInput
            style={styles.input}
            onChangeText={setReferral}
            placeholderTextColor="#ddd"
          />
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
              tintColors={{true: 'white', false: 'white'}}
            />
            <Text style={styles.termsText}>
              By tapping continue you're agreeing with our terms of service and
              privacy policies
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !allInputsFilled ? styles.disabledButton : {},
            ]}
            onPress={handleContinue}
            disabled={!allInputsFilled}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Styles
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#0EA68D', // Set the background color to match the design
  },
  formContainer: {
    paddingHorizontal: 30, // Adjust padding as needed
    paddingTop: 250, // Start the form a bit lower from the top
  },
  logoBox: {
    height: 100,
    width: 100,
    position: 'absolute',
    top: height * 0.1,
    left: width * 0.5 - 50, // Center the logo horizontally
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoText: {
    fontSize: 65,
    color: '#0EA68D',
    fontWeight: 'bold',
  },
  label: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',//good
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 30, //good
    fontSize: 18,//good
    borderWidth: 0.5, //good
    borderColor: 'grey', //good
    elevation: 5, //good
    shadowColor: '#010', //good
    shadowOffset: {width: 0, height: 2}, //good
    shadowOpacity: 0.1, //good
    shadowRadius: 8, //good
    marginBottom: 15, //good
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    alignSelf: 'center',
    marginRight: 8,
  },
  termsText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: 'white',
    borderRadius: 6,
    marginHorizontal: '6%',
    marginTop: '15%',
    paddingVertical: '2.5%',
    alignItems: 'center',
    elevation: 5
  },
  continueButtonText: {
    color: '#0EA68D',
    fontSize: 25,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    left: 3,
    top: Platform.OS === 'ios' ? 60 : 10,
  },

  backButtonText: {
    color: 'white',
    fontSize: 50,
  },
});

export default RegContinue;
