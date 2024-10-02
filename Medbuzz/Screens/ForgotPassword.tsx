/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Warning from '../SVG/Warning-Logo';
import Backarrow from '../Components/Svg/Backarrow';


const { width, height } = Dimensions.get('window');

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigation = useNavigation<NavigationProp<any>>();

  const handleContinue = () => {
    if (validate(email)) {
      navigation.navigate('ResetPassword');
    } else {
      setEmailError('Please enter a valid email address');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} testID="email-scroll-view">
      <View style={styles.headerContainer}>
        <View style={styles.backArrowContainer}>
          <TouchableOpacity onPress={handleBack}>
            <Backarrow width={40} height={40} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={styles.curveOverlay} />
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>M</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.warningContainer}>
          <Warning width={70} height={70} />
        </View>
        <Text style={styles.headerText}>Forgot Password?</Text>
        <Text style={styles.signupPromptText}>Enter your email and we'll send you a link to reset your password.</Text>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email" //test placeholder
          placeholderTextColor="#ddd"
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
          value={email}
        />

        {emailError ? (
          <Text style={styles.errorText}>{emailError}</Text>
        ) : (emailEmpty ? (<Text style={styles.errorText}>{emailEmpty}</Text>) : null)}

        <TouchableOpacity
          style={[styles.loginButton, !email ? styles.disabledButton : {}]}
          onPress={handleContinue} // Use the handleContinue function here
          //onPress={() => navigation.navigate('ResetPassword')}
          disabled={!email}
        >
          <Text style={styles.loginButtonText}>Continue</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    backgroundColor: '#0EA68D',
    height: height * 0.3,  // Keep consistent height
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Optional: If vertical centering is needed
  },
  backArrowContainer: {
    position: 'absolute',
    left: 3,
    top: 10,
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0EA68D',
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
    //flex: 0.8, // This will allow the container to fill the rest of the screen
    paddingHorizontal: 40,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#cccccc', // A greyed out color
  },
  curveOverlay: {
    position: 'absolute',
    top: height * 0.239,  // Same top position
    left: -80,
    right: -119.5,
    height: 280,
    backgroundColor: 'white',
    borderTopRightRadius: width,
  },
  inputLabel: {
    fontSize: 18,
    color: 'black',
    marginBottom: 5,
    marginTop: 30,
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
    marginTop: 75,
    paddingVertical: 12,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  signupPromptText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center'
  },
  signupText: {
    fontSize: 15,
    color: '#0EA68D',
    textDecorationLine: 'underline',
  },
  warningContainer: {
    alignItems: 'center', // Center horizontally
    marginBottom: 10,
    marginTop: -50,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
});

export default ForgotPassword;
