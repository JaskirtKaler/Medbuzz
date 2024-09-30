import React, {useState} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Backarrow from '../Components/Svg/Backarrow';
import Statelocation from '../Components/Svg/Statelocation';
import Citylocation from '../Components/Svg/Citylocation';
import ZipCodeLocation from '../Components/Svg/Zipcodelocation';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window'); // screen max width and height

const Location = ({header = 'Locations'}) => {
  const navigation = useNavigation<any>();

  const handleBack = () => {
    navigation.goBack();
    console.log('backarrow clicked');
  };

  const usaStates = [
    {label: 'Alabama', value: 'Alabama'},
    {label: 'Alaska', value: 'Alaska'},
    {label: 'Arizona', value: 'Arizona'},
    {label: 'Arkansas', value: 'Arkansas'},
    {label: 'California', value: 'California'},
    {label: 'Colorado', value: 'Colorado'},
    {label: 'Connecticut', value: 'Connecticut'},
    {label: 'Delaware', value: 'Delaware'},
    {label: 'Florida', value: 'Florida'},
    {label: 'Georgia', value: 'Georgia'},
    {label: 'Hawaii', value: 'Hawaii'},
    {label: 'Idaho', value: 'Idaho'},
    {label: 'Illinois', value: 'Illinois'},
    {label: 'Indiana', value: 'Indiana'},
    {label: 'Iowa', value: 'Iowa'},
    {label: 'Kansas', value: 'Kansas'},
    {label: 'Kentucky', value: 'Kentucky'},
    {label: 'Louisiana', value: 'Louisiana'},
    {label: 'Maine', value: 'Maine'},
    {label: 'Maryland', value: 'Maryland'},
    {label: 'Massachusetts', value: 'Massachusetts'},
    {label: 'Michigan', value: 'Michigan'},
    {label: 'Minnesota', value: 'Minnesota'},
    {label: 'Mississippi', value: 'Mississippi'},
    {label: 'Missouri', value: 'Missouri'},
    {label: 'Montana', value: 'Montana'},
    {label: 'Nebraska', value: 'Nebraska'},
    {label: 'Nevada', value: 'Nevada'},
    {label: 'New Hampshire', value: 'New Hampshire'},
    {label: 'New Jersey', value: 'New Jersey'},
    {label: 'New Mexico', value: 'New Mexico'},
    {label: 'New York', value: 'New York'},
    {label: 'North Carolina', value: 'North Carolina'},
    {label: 'North Dakota', value: 'North Dakota'},
    {label: 'Ohio', value: 'Ohio'},
    {label: 'Oklahoma', value: 'Oklahoma'},
    {label: 'Oregon', value: 'Oregon'},
    {label: 'Pennsylvania', value: 'Pennsylvania'},
    {label: 'Rhode Island', value: 'Rhode Island'},
    {label: 'South Carolina', value: 'South Carolina'},
    {label: 'South Dakota', value: 'South Dakota'},
    {label: 'Tennessee', value: 'Tennessee'},
    {label: 'Texas', value: 'Texas'},
    {label: 'Utah', value: 'Utah'},
    {label: 'Vermont', value: 'Vermont'},
    {label: 'Virginia', value: 'Virginia'},
    {label: 'Washington', value: 'Washington'},
    {label: 'West Virginia', value: 'West Virginia'},
    {label: 'Wisconsin', value: 'Wisconsin'},
    {label: 'Wyoming', value: 'Wyoming'},
  ];

  // State for the selected state in the dropdown
  const [selectedState, setSelectedState] = useState('');

  // State for the selected city in the text input
  const [city, setCity] = useState('');

  // State for the selected zipcode in the text input
  const [zipcode, setZipCode] = useState('');
  const saveInfoEventHandler = async () => {
    const userLocInfo = {
      state: selectedState,
      city,
      zipcode,
    };

    try {
      await AsyncStorage.setItem(
        'LocationPreference',
        JSON.stringify(userLocInfo),
      );
      ToastAndroid.show(
        'Your location parameters have been saved!',
        ToastAndroid.SHORT,
      );
    } catch (error) {
      console.error('Failed to save location info: ', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Backarrow width={40} height={40} color={'#000'} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{header}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* State container */}
      <View style={styles.stateContainer}>
        <View style={styles.inputLabelTextAlign}>
          <Text style={styles.inputLabelText}>State</Text>
          {/* State Location SVG */}
          <View style={styles.rowContainer}>
            <Statelocation width={40} height={40} color={'#000'} />
            {/* State Box Container */}
            <View style={styles.stateBoxContainer}>
              {/* State Dropdown */}
              <Dropdown
                data={usaStates}
                labelField="label"
                valueField="value"
                search
                placeholder={selectedState ? selectedState : 'Select Item'} // If no State is selected/saved, placeholder is "Select Item"
                searchPlaceholder="Search..."
                value={selectedState}
                onChange={item => {
                  setSelectedState(item.value);
                }}
                selectedTextStyle={styles.selectedTextStyle}
              />
            </View>
          </View>
        </View>
      </View>

      {/* City container */}
      <View style={styles.cityContainer}>
        <View style={styles.inputLabelTextAlign}>
          <Text style={styles.inputLabelText}>City</Text>
          <View style={styles.rowContainer}>
            {/* City Location SVG */}
            <Citylocation width={40} height={40} color={'#000'} />
            {/* City Box Container */}
            <View style={styles.cityBoxContainer}>
              {/* City Text Input*/}
              <TextInput
                value={city}
                onChangeText={text => setCity(text)}
                style={styles.textInput}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Zip Code container */}
      <View style={styles.zipCodeContainer}>
        <View style={styles.inputLabelTextAlign}>
          <Text style={styles.inputLabelText}>Zip Code</Text>
          <View style={styles.rowContainer}>
            {/* ZipCode Location SVG */}
            <ZipCodeLocation width={40} height={40} color={'#000'} />
            {/* ZipCode Box Container */}
            <View style={styles.zipCodeBoxContainer}>
              {/* ZipCode Text Input*/}
              <TextInput
                value={zipcode}
                onChangeText={text => setZipCode(text)}
                keyboardType="numeric" // Allow only numeric input
                maxLength={5} // Limit the input to 5 characters (assuming a 5-digit Zip Code)
                style={styles.textInput}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Save button */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveInfoEventHandler}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    elevation: 5, // This will add a box shadow for Android
    shadowColor: '#000', // this will add a box shadow for IOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerText: {
    fontSize: 20,
    color: 'black',
  },
  placeholder: {
    width: 40,
  },
  inputLabelText: {
    fontSize: 20,
    color: 'black',
    paddingLeft: 45,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  inputLabelTextAlign: {
    justifyContent: 'flex-start',
  },
  selectedTextStyle: {
    color: 'black',
    fontSize: 18,
  },
  stateContainer: {
    paddingTop: 30,
    paddingBottom: 40,
    paddingLeft: 10,
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stateBoxContainer: {
    width: '85%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  textInput: {
    fontSize: 18,
  },
  cityContainer: {
    paddingBottom: 40,
    paddingLeft: 10,
    alignItems: 'center',
  },
  cityBoxContainer: {
    width: '85%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  zipCodeContainer: {
    paddingBottom: 40,
    paddingLeft: 10,
    alignItems: 'center',
  },
  zipCodeBoxContainer: {
    width: '85%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  saveButtonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 50,
  },
  saveButton: {
    backgroundColor: '#0EA68D',
    width: '50%',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, // This will add a box shadow for Android
    shadowColor: '#000', // this will add a box shadow for IOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  saveButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Location;
