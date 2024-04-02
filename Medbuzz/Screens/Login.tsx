import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>M</Text>
        </View>
        <Text style={styles.headerText}>Login</Text>
        <Text style={styles.subHeaderText}>Sign in to Continue</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Name" 
          placeholderTextColor="#ddd" 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          placeholderTextColor="#ddd" 
          secureTextEntry 
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.signupText}>Don’t have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    backgroundColor: '#0EA68D',
    paddingBottom: 40,
    alignItems: 'center',
  },
  logoBox: {
    marginTop: 40,
    backgroundColor: 'white',
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 36,
    color: '#0EA68D',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 36,
    color: 'black',
    marginTop: 20,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: -30,
    paddingHorizontal: 30,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'grey',
    shadowColor: '#010', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset x, y
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    elevation: 3, // Elevation for Android
  },
  forgotPassword: {
    color: '#0EA68D',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#0EA68D',
    borderRadius: 10,
    marginHorizontal: 30,
    marginTop: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#0EA68D',
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 15,
  },
});

export default Login;
