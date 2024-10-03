import React, {useState, useEffect} from 'react';
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
import {Dropdown} from 'react-native-element-dropdown';
import Backarrow from '../Components/Svg/Backarrow';
import {useNavigation} from '@react-navigation/native';
import {styles} from './ParentPage';
import {loadUser, saveUser, User} from '../Components/Utility/userStorage.tsx';
import { disciplineOptions } from '../mapVariables/optionsData.tsx';
const DisciplineScreen = () => {
  const progress = 20; // Example progress percentage
  const [discipline, setDiscipline] = useState('');
  const [experience, setExperience] = useState('');
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
  
  const handleContinue = async()=> {
    try {
      const updatedUser: User = {
        ...user,
        discipline,
        experience,
      };
      
      // Save the updated user data
      await saveUser(updatedUser);

      console.log(
        'Added discipline and experience to user data, updatedUser:',
        JSON.stringify(updatedUser),
      );
      navigation.navigate('Certificates');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }

  // Formats phone number to (***)***-**** format and ensures it only contains numbers
  const handlePhoneNumberInput = (text: string) => {

    // Remove non-numeric characters
    const numericValue = text.replace(/\D/g, '');

    // A two digit number
    let formattedNumber = numericValue;

    return formattedNumber
  };

  // const options = [
  //   { label: 'Registered Nurse', value: 'Registered Nurse' },
  //   { label: 'Licensed Practical Nurse', value: 'Licensed Practical Nurse' },
  //   { label: 'CMA', value: 'CMA' },
  //   { label: 'Faculty Staff', value: 'Faculty Staff' },
  //   { label: 'blah', value: 'blah' },
  //   { label: 'blahblah', value: 'blahblah' },
  //   { label: 'blahblahblah', value: 'blahblahblah' },
  //   { label: '---', value: '---' },
  // ];

 
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
        width={Dimensions.get('window').width * 0.8}
        color={'black'}
        borderRadius={0}
        unfilledColor={'#D9D9D9'}
        height={20}
      />

      <Text style={styles.question}>What's your discipline?</Text>

      {/* Dropdown */}
      <Dropdown
        style={stylesLocal.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={disciplineOptions}
        search
        maxHeight={Dimensions.get('window').height * 0.3}
        labelField="label"
        valueField="value"
        placeholder="Select an option"
        searchPlaceholder="Search..."
        value={discipline}
        onChange={item => setDiscipline(item.value)}
      />
      {/*Render Text Box */}

        <TextInput
          style={stylesLocal.input}
          placeholder="Enter years of experience"
          placeholderTextColor="#888"
          value={experience}
          onChangeText={(text) =>{setExperience(handlePhoneNumberInput(text))}}
          keyboardType="numeric"
          maxLength={2}
        />


      {/* Continue Button */}
      <TouchableOpacity onPress={handleContinue} style={stylesLocal.continueTouch}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
      </ScrollView>
  );
};

export default DisciplineScreen;

const stylesLocal = StyleSheet.create({
  dropdown: {
    width: '80%',
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: '13%',
    backgroundColor: 'white',
    padding: '2%',
  },
  continueTouch: {
    backgroundColor: 'white',
    paddingHorizontal: '25%',
    paddingVertical: '2%',
    elevation: 5,
    marginTop:'40%',
    borderRadius: 6,
  },
  
  input: {
    width: '80%',
    borderRadius: 25,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    marginBottom:'5%',
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
});