import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  ToastAndroid,
  Platform,
} from 'react-native';
import {Bar} from 'react-native-progress';
import Backarrow from '../Components/Svg/Backarrow';
import {useNavigation} from '@react-navigation/native';
import {styles} from './ParentPage';
import {loadUser, saveUser, User} from '../Components/Utility/userStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserLocation = () => {
  const progress = 90; // Example progress percentage
  const [zipCode, setZipCode] = useState('');
  const [isValidZipCode, setIsValidZipCode] = useState(true);
  const navigation = useNavigation<any>();
  const [user, setUser] = useState<User | null>();

  //everytime the page mounts, this use effect would be called and the user object from local storage will be retrieved
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await loadUser();
      setUser(userData);
    };

    fetchUserData();
  }, []);

  const handleBack = () => {
    navigation.goBack();
    console.log('Back button clicked');
  };

  const handleContinue = async () => {
    if (isValidZipCode && zipCode) {
      //since this is the last of the survey page, delete the info from local storage after saving to db or sending to backend.

      const updatedUser: User = {
        ...user,
        zipCode,
      };

      console.log('Final updatedUser object:', JSON.stringify(updatedUser));
      //save the final object to the db

      //clear the local storage
      AsyncStorage.setItem('user', JSON.stringify(updatedUser))     

      navigation.navigate('LoadingScreen');

    } else {
      ToastAndroid.show('Invalid zip code, cannot proceed', ToastAndroid.SHORT);
      console.log('Invalid zip code, cannot proceed');
    }
  };

  //to validate the entered zip code
  const validateZipCode = (text: string) => {
    const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    const isValid = zipCodeRegex.test(text);
    setIsValidZipCode(isValid); // Update validity state
    setZipCode(text); // Update zip code state
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
      <View style={{position: 'absolute', top: Platform.OS === 'ios' ? 60 : 10, left: 0}}>
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
        width={Dimensions.get('window').width * 0.8}
        color={'black'}
        borderRadius={0}
        unfilledColor={'#D9D9D9'}
        height={20}
      />

      <Text style={styles.question}>Where do you live?</Text>

      <TextInput
        style={[stylesLocal.input, !isValidZipCode && stylesLocal.inputError]} // Apply error style if zip code is invalid
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

const stylesLocal = StyleSheet.create({
  input: {
    width: '80%',
    borderRadius: 25,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    height: '6%',
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
});
