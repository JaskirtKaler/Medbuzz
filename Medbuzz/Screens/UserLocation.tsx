import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import {Bar} from 'react-native-progress';
import Backarrow from '../Components/Svg/Backarrow';

const UserLocation = () => {
  const progress = 45; // Example progress percentage
  const [zipCode, setZipCode] = useState('');
  const [isValidZipCode, setIsValidZipCode] = useState(true);

  const handleBack = () => {
    console.log('Back button clicked');
  };

  const handleContinue = () => {
    console.log('Continue button clicked');
  };

  //to validate the entered zip code
  const validateZipCode = (text: string) => {
    const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    const isValid = zipCodeRegex.test(text);
    setIsValidZipCode(isValid); // Update validity state
    setZipCode(text); // Update zip code state
    console.log(zipCode)
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0EA68D',
      }}>
      {/* Back Button */}
      <View style={{position: 'absolute', top: 10, left: 0}}>
        <TouchableOpacity onPress={handleBack}>
          <Backarrow width={40} height={40} color={'#FFF'} />
        </TouchableOpacity>
      </View>

      {/* Logo Placement */}
      <View style={styles.logo}>
        <Text style={{color: '#0EA68D', fontSize: 65, fontWeight: 'bold'}}>
          M
        </Text>
      </View>

      {/* Progress Text */}
      <Text style={styles.progressText}>Progress: {progress}%</Text>

      {/* Progress Bar */}
      <Bar
        progress={progress / 100}
        width={Dimensions.get('window').width * 0.8} // 80% of the window width
        color={'black'}
        borderRadius={0}
        unfilledColor={'#D9D9D9'}
        height={20}
      />

      <Text style={styles.question}>Where do you Live?</Text>

      <TextInput
        style={[styles.input, !isValidZipCode && styles.inputError]} // Apply error style if zip code is invalid
        placeholder="Home Zip Code"
        onChangeText={validateZipCode} // Call validation function
        keyboardType="numeric"
      />

      {/* Continue Button */}
      <TouchableOpacity onPress={handleContinue} style={styles.continueTouch}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserLocation;

const styles = StyleSheet.create({
  input: {
    width: '72%',
    borderRadius: 30,
    marginBottom: '45%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  inputError: {
    borderColor: 'red', 
    borderWidth: 1,
  },
  continueText: {
    color: '#0EA68D',
    fontSize: 25,
    fontWeight: 'bold',
  },
  continueTouch: {
    backgroundColor: 'white',
    paddingHorizontal: '25%',
    paddingVertical: '2%',
    elevation: 5,
    marginBottom: '15%',
  },
  progressText: {
    color: 'black',
    marginTop: '10%',
    marginLeft: '12%',
    fontSize: 25,
    alignSelf: 'flex-start',
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    color: 'black',
    marginTop: '7%',
    marginRight: '3%',
    marginBottom: '2%',
    fontSize: 25,
  },
});
