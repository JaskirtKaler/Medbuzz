/* eslint-disable prettier/prettier */
/* eslint-disable no-dupe-keys */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const CreateAccount = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{"<"}</Text>
        </TouchableOpacity>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>M</Text>
        </View>
        <Text style={styles.headerText}>Create new Account</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Already registered? Log in here</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="First Name" 
          placeholderTextColor="#ddd"
        />
        <TextInput 
          style={styles.input} 
          placeholder="Last Name" 
          placeholderTextColor="#ddd" 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Email Address" 
          placeholderTextColor="#ddd" 
          keyboardType="email-address" 
        />
      </View>
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
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
    paddingBottom: 70,
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButton: {
    color: 'white',
    fontSize: 24,
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logoBox: {
    backgroundColor: 'white',
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 36,
    color: '#0EA68D',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  loginLink: {
    fontSize: 15,
    color: 'white',
    textDecorationLine: 'underline',
  },
  inputContainer: {
    marginTop: -20,
    paddingHorizontal: 30,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    fontSize: 18,
    borderColor: 'grey',
    borderWidth: 1, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  continueButton: {
    backgroundColor: '#0EA68D',
    borderRadius: 10,
    marginHorizontal: 30,
    marginTop: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default CreateAccount;
