 /* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList }from '../App';
import Backarrow from '../Components/Svg/Backarrow';

const { width, height } = Dimensions.get('window');

const ResetPassword = () => {
  const [code, setCode] = React.useState('');
  const [codeError, setCodeError] = React.useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const emailValid = true;
  const realCode = "1111"


  const handleContinue = () => {
    if (code == realCode) {
      navigation.navigate('RegContinue');
    } else {
      setCodeError("We can't find your email!");
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <View style={styles.backArrowContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Backarrow width={40} height={40} color={"white"}/>
          </TouchableOpacity>
        </View>
        <View style={styles.curveOverlay} />
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>M</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
      <View style={styles.inputContainer}>
        <Text style={styles.headerText}>Reset Password</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.returnToLogin}>&lt; Back to Login</Text>
          </TouchableOpacity>

        <Text style={styles.inputLabel}>Enter the Code</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#ddd"
          onChangeText={(text) => {
            setCode(text);
            setCodeError('');
          }}
          value = {code}
        />
               {codeError ? (
          <Text style={styles.errorText}>{codeError}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleContinue} // Use the handleContinue function here
          disabled={!emailValid}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>


      </View>
      </ScrollView>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    marginBottom: 25,
  },
  inputContainer: {
    // flex: 0.8, // This will allow the container to fill the rest of the screen
    justifyContent: 'center', // This centers the children vertically
    paddingHorizontal: 40,
    marginTop: 0,
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
    marginBottom: 0,
    marginTop: 20,
    textAlign: "center"

  },
  backArrowContainer: {
    // justifyContent: 'flex-start',
    width: '100%',
    // paddingTop: '5%',
    position: 'absolute',
    left: 3,
    top: 10,
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
  submitButton: {
    backgroundColor: '#0EA68D',
    borderRadius: 3,
    marginHorizontal: 12,
    marginTop: 75,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 50,
  },
  returnToLogin: {
    fontSize: 14,
    color: '#0EA68D',
    marginBottom: 30,
    textAlign: "center"
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
  scrollView: {
    
  }
});

export default ResetPassword;
