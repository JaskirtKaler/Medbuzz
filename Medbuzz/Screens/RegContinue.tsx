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
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, KeyboardAvoidingView, Platform, Alert} from 'react-native';
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
            onChangeText={setPhoneNumber}
            placeholderTextColor="#ddd"
            keyboardType="phone-pad"
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
    height: 120,
    width: 120,
    position: 'absolute',
    top: height * 0.1,
    left: width * 0.5 - 50, // Center the logo horizontally
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoText: {
    fontSize: 75,
    color: '#0EA68D',
    fontWeight: 'bold',
  },
  label: {
    color: 'black',
    fontSize: 20,
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 3,
    marginBottom: 15,
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
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: '#0EA68D',
    fontSize: 28,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    left: 3,
    top: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 50,
  },
});

export default RegContinue;
