/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useNavigation, NavigationProp } from '@react-navigation/native';
import validate from 'react-native-email-validator';
import {RootStackParamList} from '../App';
import {useJobPostings} from '../API Fetch/JobPostings';
// import {RootStackParamList} from '../App';


const {width, height} = Dimensions.get('window');
const Login = () => {
  // const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();

  const handleContinue = () => {
    if (validate(email)) {
      navigation.navigate('Main');
    } else {
      setEmailError("We can't find your email!");
    }
  };
  

  // Logic to handle the login button press
  const handleLogin = async () => {
    // Currently causing errors
    // await fetchData();
    // console.log(jobPostings.length)
    navigation.navigate('Main')
      
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.select({ios: 60, android: 80})}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* View to contain the curve overlay and logo */}
        <View style={styles.headerContainer}>
          <View style={styles.curveOverlay} />
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>M</Text>
          </View>
        </View>
        {/* View to contain Center Text, login inputs, and redirects */}
        <View style={styles.inputContainer}>
          <Text style={styles.headerText}>Login</Text>
          <Text style={styles.subHeaderText}>Sign in to Continue</Text>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Email"
            placeholderTextColor="#ddd"
            onChangeText={(text) => {setEmail(text)}}
          />
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#ddd"
            onChangeText={(text) => {setPassword(text)}}
            secureTextEntry
            value={password}
            //onChangeText={setPassword}
          />
          <View>
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
          </View>
          
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      <TouchableOpacity style={[styles.loginButton, (!email || !password) ? styles.disabledButton : {}]} 
        onPress={handleContinue}
        disabled={!email || !password}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      <View style={styles.signupTextContainer}>
        <Text style={styles.signupPromptText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1, // This ensures the ScrollView content fills the space
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    backgroundColor: '#0EA68D',
    height: height * 0.3,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
  logoBox: {
    backgroundColor: 'white',
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 58,
    color: '#0EA68D',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    marginBottom: '8.5%',
  },

  inputContainer: {
    flex: 0.5, // This will allow the container to fill the rest of the screen
    justifyContent: 'center', // This centers the children vertically
    paddingHorizontal: '5%',
    marginTop: '5%',
  },
  curveOverlay: {
    position: 'absolute',
    top: height * 0.239, // top position to where the curve should start
    left: -80,
    right: -119.5,
    //bottom: 0,
    height: 280,
    backgroundColor: 'white',
    borderTopRightRadius: width,
  },
  inputLabel: {
    fontSize: 20,
    color: 'black',
    marginTop: '1.5%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: '3.75%',
    paddingVertical: '3.5%',
    borderRadius: 30,
    marginTop: '1.5%',
    fontSize: 18,
    borderWidth: 0.3,
    borderColor: 'grey',
    shadowColor: '#010',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  forgotPassword: {
    color: '#0EA68D',
    fontSize: 18,
    alignSelf: 'flex-end',
    marginTop: '4%',
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: '#0EA68D',
    borderRadius: 6,
    marginHorizontal: 40,
    marginTop: '5.5%',
    paddingVertical: '3.25%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  signupTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: '5%',
  },
  signupPromptText: {
    fontSize: 15,
    color: 'black',
  },
  signupText: {
    fontSize: 15,
    color: '#0EA68D',
    textDecorationLine: 'underline',
  },
  disabledButton: {
    backgroundColor: '#cccccc', // A greyed out color
  },
errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
});

export default Login;
