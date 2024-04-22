import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import {Bar} from 'react-native-progress';
import {Dropdown} from 'react-native-element-dropdown';
import Backarrow from '../Components/Svg/Backarrow';

const Discipline = () => {
  const progress = 20; // Example progress percentage
  const [selectedOption, setSelectedOption] = useState(''); //To hold the selected Discipline

  const options = [
    {label: 'Registered Nurse', value: 'Registered Nurse'},
    {label: 'Licensed Practical Nurse', value: 'Licensed Practical Nurse'},
    {label: 'CMA', value: 'CMA'},
    {label: 'Faculty Staff', value: 'Faculty Staff'},
    {label: 'blah', value: 'blah'}, // Add other options
    {label: 'blahblah', value: 'blahblah'},
    {label: 'blahblahblah', value: 'blahblahblah'},
    {label: '---', value: '---'},
  ];

  const handleBack = () => {
    console.log('Back button clicked');
  };

  const handleContinue = () => {
    console.log('Continue button clicked');
  };

  return (
    <View style={styles.container}>
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

      <Text style={styles.question}>What's your discipline?</Text>

      {/* Dropdown */}
      <Dropdown
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={options}
        search
        maxHeight={Dimensions.get('window').height * 0.2}
        labelField="label"
        valueField="value"
        placeholder="Select Discipline"
        searchPlaceholder="Search..."
        value={selectedOption}
        onChange={item => setSelectedOption(item.value)}
      />
      {/* Continue Button */}
      <TouchableOpacity onPress={handleContinue} style={styles.continueTouch}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
      </View>
  );
};

export default Discipline;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0EA68D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    width: '80%',
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: '45%',
    backgroundColor: 'white',
    padding: '2%',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
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
    marginBottom:'2%',
    fontSize: 25,
  },
});
