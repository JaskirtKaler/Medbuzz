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


import {useNavigation, NavigationProp} from '@react-navigation/native';
import {useJobPostings} from '../API Fetch/JobPostings';
// import {RootStackParamList} from '../App';


const {width, height} = Dimensions.get('window');
const Login = () => {
  // const navigation = useNavigation();
  const navigation = useNavigation<any>();
  const {jobPostings, fetchData, isLoading} = useJobPostings(); // Get the function to fetch job postings
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleContinue = async () => {
    await fetchData();
    console.log(jobPostings.length)
    navigation.navigate('Main')
      
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.select({ios: 60, android: 80})}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <View style={styles.curveOverlay} />
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>M</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.headerText}>Login</Text>
          <Text style={styles.subHeaderText}>Sign in to Continue</Text>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#ddd"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#ddd"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleContinue}>
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

// const { width, height } = Dimensions.get('window');

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
    marginBottom: 20,
  },

  inputContainer: {
    flex: 0.5, // This will allow the container to fill the rest of the screen
    justifyContent: 'center', // This centers the children vertically
    paddingHorizontal: 40,
    marginTop: 20,
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

    marginTop: 10,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 5,
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
    marginTop: 15,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: '#0EA68D',
    borderRadius: 6,
    marginHorizontal: 40,
    marginTop: 25,
    paddingVertical: 12,
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
    paddingHorizontal: 40,
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
});

export default Login;
