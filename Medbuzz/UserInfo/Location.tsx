import React, {useState, useEffect} from 'react';
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
  Platform,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Backarrow from '../Components/Svg/Backarrow';
import Statelocation from '../Components/Svg/Statelocation';
import Citylocation from '../Components/Svg/Citylocation';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usaCeipalStateInts, usaStates } from '../mapVariables/optionsData';

const {width, height} = Dimensions.get('window'); // screen max width and height
const Location = ({header = 'Locations'}) => {
  
  const navigation = useNavigation<any>();

  // call when page is loaded
  useEffect(() => {

    // get saved location preferences from local storage
    const getLocationInfo = async () => {
      try {
        const savedLocationInfo = await AsyncStorage.getItem('LocationPreference');

        // if there is data in saveLocationInfo parse it and set useState variables accordingly
        if (savedLocationInfo !== null) {
          const parsedLocInfo = JSON.parse(savedLocationInfo); // Parse the user data and set it in the state
          setCity(parsedLocInfo.city)
          setSelectedState(parsedLocInfo.state)

        } else {
          console.log("No location info found on local storage.");
        }
      } catch (error) {
        console.error('Error loading location data:', error);
      }
    };

    getLocationInfo();
  }, []);

  const handleBack = () => {
    navigation.goBack();
    console.log('backarrow clicked');
  };

  // set useState variables to '' and clear LocationPreferences from storage
  const clearPreferences = async () => {
    setCity('')
    setSelectedState('')
    
    try {
      await AsyncStorage.removeItem('LocationPreference');
      ToastAndroid.show('Preferences have been reset', ToastAndroid.SHORT);
    } catch (error){
      console.log('Something went wrong: ', error);
    }
  };

  // State for the selected state in the dropdown
  const [selectedState, setSelectedState] = useState('');

  // State for the selected city in the text input
  const [city, setCity] = useState('');
  const saveInfoEventHandler = async () => {
    const userLocInfo = {
      state: selectedState,
      city: city.trim(),
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
                data={usaCeipalStateInts}
                labelField="label"
                valueField="value"
                search
                placeholder={/*userLocInfo ? userLocInfo.state : 'Select Item'*/ selectedState ? selectedState : 'Select Item'} // If no State is selected/saved, placeholder is "Select Item"
                searchPlaceholder="Search..."
                value={selectedState}
                onChange={item => {
                  setSelectedState(item.label);
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
                placeholder={/*userLocInfo ? userLocInfo.city : ''*/city ? city : ''}
              />
            </View>
          </View>
        </View>
      </View>

    

      {/* Save button and clear preferences button*/}
      <View style={styles.saveButtonContainer}>
        {/* Save */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveInfoEventHandler}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        {/* Clear Preferences */}
        <TouchableOpacity 
          style={styles.clearPreferencesButton}
          onPress={clearPreferences}>
          <Text style={styles.clearPreferencesButtonText}>Reset</Text>
          {/*<Text style={styles.clearPreferencesButtonText}>Preferences</Text>*/}
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
    height: height * (Platform.OS === 'ios' ? 0.125 : 0.1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: Platform.OS === 'ios' ? 'flex-end' : 'center',
    paddingBottom: Platform.OS === 'ios' ? '5%' : 0,
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
    //alignItems: 'center',
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  saveButton: {
    backgroundColor: '#0EA68D',
    width: '60%',
    padding: 20,
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
  clearPreferencesButton: {
    backgroundColor: "#E6E6E6",
    width: '19%',
    padding: 20,
    justifyContent: 'center',
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
  clearPreferencesButtonText: {
    color: 'black', 
    fontSize: 14, 
    fontWeight: 'bold'
  }
});

export default Location;
