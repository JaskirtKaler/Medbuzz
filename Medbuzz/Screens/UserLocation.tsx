import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Bar} from 'react-native-progress';
import Backarrow from '../Components/Svg/Backarrow';

const UserLocation = () => {
  const progress = 45; // Example progress percentage
  const [ zipCode, setZipCode ] = useState('');

  const handleBack = () => {
    console.log('Back button clicked');
  };

  const handleContinue = () => {
    console.log('Continue button clicked');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0EA68D',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* Back Button */}
      <View style={{position: 'absolute', top: 10, left: 0}}>
        <TouchableOpacity onPress={handleBack}>
          <Backarrow width={40} height={40} color={'#000'} />
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
        width={300}
        color={'black'}
        borderRadius={0} // remove the default amount of border radius that comes with the progress bar
        unfilledColor={'#D9D9D9'} // Color of the unfilled portion of the progress bar, color gotten from figma
        height={20}
      />

      <Text style={styles.question}>Where do you Live?</Text>

      <TextInput style={styles.input} placeholder="Home Zip Code" onChangeText={text => setZipCode(text)}></TextInput>

      {/* Continue Button */}
      <TouchableOpacity onPress={handleContinue} style={styles.continueTouch}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserLocation;

const styles = StyleSheet.create({
  input: {
    width: '72%',
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 200,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  continueText: {
    color: '#0EA68D',
    fontSize: 25,
    fontWeight: 'bold',
  },
  continueTouch: {
    backgroundColor: 'white',
    paddingHorizontal: 100,
    paddingVertical: 8,
    elevation: 5,
    marginBottom: 80,
  },
  progressText: {
    color: 'black',
    marginTop: 30,
    marginLeft: 45,
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
    marginTop: 20,
    marginRight: 20,
    fontSize: 25,
  },
});
