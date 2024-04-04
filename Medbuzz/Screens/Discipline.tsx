import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Bar} from 'react-native-progress';
import {Dropdown} from 'react-native-element-dropdown';
import Backarrow from '../Components/Svg/Backarrow';
{
  /* Dropdown */
}

const Discipline = () => {
  const progress = 50; // Example progress percentage
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
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#0EA68D', fontSize: 65, fontWeight: 'bold'}}>
          M
        </Text>
      </View>

      {/* Progress Text */}
      <Text
        style={{
          color: 'black',
          marginTop: 30,
          marginLeft: 45,
          fontSize: 25,
          alignSelf: 'flex-start',
        }}>
        Progress: {progress}%
      </Text>

      {/* Progress Bar */}
      <Bar
        progress={progress / 100}
        width={300}
        color={'black'}
        borderRadius={0} // remove the default amount of border radius that comes with the progress bar
        unfilledColor={'#D9D9D9'} // Color of the unfilled portion of the progress bar, color gotten from figma
        height={20}
      />

      <Text
        style={{
          color: 'black',
          marginTop: 20,
          marginRight: 20,
          fontSize: 25,
        }}>
        What's your discipline?
      </Text>

      {/* Dropdown */}
      <Dropdown
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={options}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Discipline"
        searchPlaceholder="Search..."
        value={selectedOption}
        onChange={item => setSelectedOption(item.value)}
      />
      {/* Continue Button */}
      <TouchableOpacity
        onPress={() => console.log('Continue button clicked')}
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 100,
          paddingVertical: 8,
          elevation: 5,
          marginBottom: 80,
        }}>
        <Text style={{color: '#0EA68D', fontSize: 25, fontWeight: 'bold'}}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Discipline;

const styles = StyleSheet.create({
  dropdown: {
    width: 300,
    margin: 16,
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 200,
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
});
