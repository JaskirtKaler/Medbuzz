/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform, Alert
} from 'react-native';
import Backarrow from '../Components/Svg/Backarrow';
const { width, height } = Dimensions.get('window');

const Register = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const navigation = useNavigation<any>();

  const allInputsFilled = firstName && lastName && email; // Check if all inputs are filled

  const handleContinue = () => {
    if (allInputsFilled) {
      navigation.navigate('RegContinue');
    } else {
      // Show an alert if not all inputs are filled
      Alert.alert(
        "Incomplete Form",
        "Please fill all the inputs to continue.",
        [
          {
            text: "OK",
            style: "cancel"
          }
        ]
      );
    }
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 60, android: 80 })}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Backarrow width={40} height={40} color={"white"}/>
          </TouchableOpacity>
          <View style={styles.curveOverlay} />
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>M</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.headerText}>Create new Account</Text>
          <View style={styles.signupTextContainer}>
            <Text style={styles.signupPromptText}>Already registered? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signupText}>Log in here</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#ddd"
            onChangeText={setFirstName}
          />
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#ddd"
            onChangeText={setLastName}
          />
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#ddd"
            onChangeText={setEmail}
          />
          <TouchableOpacity
            style={[styles.loginButton, !allInputsFilled ? styles.disabledButton : {}]}
            onPress={handleContinue}
            disabled={!allInputsFilled}
          >
            <Text style={styles.loginButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};



const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
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
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    marginBottom: 25,
  },
  subHeaderText: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    marginBottom: 20,
  },

  inputContainer: {
    flex: 0.8, // This will allow the container to fill the rest of the screen
    justifyContent: 'center', // This centers the children vertically
    paddingHorizontal: 40,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#cccccc', // A greyed out color
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
    fontSize: 18,
    color: 'black',
    marginBottom: 5,
  },

  signupTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 10,
    fontSize: 18,
    borderWidth: 0.3,
    borderColor: 'grey',
    shadowColor: '#010',
    shadowOffset: { width: 0, height: 2 },
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
    borderRadius: 3,
    marginHorizontal: 12,
    marginTop: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  // signupTextContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   marginTop: 20,
  //   paddingHorizontal: 40,
  // },
  signupPromptText: {
    fontSize: 18,
    color: 'black',
  },
  signupText: {
    fontSize: 15,
    color: '#0EA68D',
    textDecorationLine: 'underline',
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

export default Register;
