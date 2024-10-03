import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Bar} from 'react-native-progress';
import {Svg, Path} from 'react-native-svg';
import Backarrow from '../Components/Svg/Backarrow';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Specialty = () => {
  const navigation = useNavigation<any>();
  const progress = 35;

  const handleBack = () => {
    navigation.goBack();
  };

  const addSpecailtyListener = () => {
    console.log("Tapped 'Add additional specialty'");
  };

  const continueListener = () => {
    navigation.navigate('Certificates');
    console.log('Tapped continue');
  };

  return (
    <ScrollView contentContainerStyle={styles.background_style}>
      <View style={{position: 'absolute', top: 10, left: 0}}>
        <TouchableOpacity onPress={handleBack}>
          <Backarrow width={40} height={40} color={'#FFF'} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={logo.rectangle}>
          <Text style={logo.m_logo}>M</Text>
        </View>

        <View style={{paddingTop: '5%'}}>
          <View style={{paddingBottom: '5%'}}>
            <Text style={styles.progress}>Progress %</Text>
            {/* Progress Bar */}
            <Bar
              progress={progress / 100}
              width={350}
              color={'black'}
              borderRadius={0} // remove the default amount of border radius that comes with the progress bar
              unfilledColor={'#D9D9D9'} // Color of the unfilled portion of the progress bar, color gotten from figma
              height={20}
            />
          </View>
        </View>

        <View style={styles.prompt_style}>
          <Text style={styles.text}>What's your specialty?</Text>
        </View>

        <View style={input_style.input_container}>
          <Text style={styles.text_sub}>Specialty</Text>
          <TextInput style={input_style.input} />
        </View>

        <View style={input_style.input_container}>
          <Text style={styles.text_sub}>Years in Specialty</Text>
          <TextInput style={input_style.input} />
        </View>

        <View style={styles.additional_special_container}>
          <TouchableOpacity onPress={addSpecailtyListener}>
            <Text style={styles.add_specailty_text}>
              + Add additional specialty
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* End body container */}

      <View style={styles.footer}>
        <TouchableOpacity
          style={button_style.button_content}
          onPress={continueListener}>
          <Text style={button_style.button_text}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView> // End main container
  ); // End return statement
}; // End Specialty

export default Specialty;

// Style Sheets
const styles = StyleSheet.create({
  background_style: {
    backgroundColor: '#0EA68D',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    display: 'flex',
    height: height * 0.95,
  },
  text: {
    color: 'black',
    fontSize: 30,
  },
  text_sub: {
    color: 'black',
    fontSize: 25,
    paddingBottom: '5%',
  },
  add_specailty_text: {
    color: 'white',
    fontSize: 25,
    alignSelf: 'flex-start',
  },
  progress: {
    color: 'black',
    fontSize: 30,
    alignSelf: 'flex-start',
  },
  prompt_style: {
    alignSelf: 'flex-start',
    width: '100%',
    paddingLeft: '8%',
    paddingBottom: '5%',
  },
  back_arrow: {
    alignSelf: 'flex-start',
    width: '100%',
    height: height * 0.1,
    flexDirection: 'row',
    paddingTop: '5%',
  },
  body: {
    width: '100%',
    height: height * 0.8,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: height * 0.1,
  },
  additional_special_container: {
    alignSelf: 'flex-start',
    paddingLeft: '8%',
    paddingTop: '5%',
  },
});

const input_style = StyleSheet.create({
  input_container: {
    width: '85%',
    paddingBottom: '5%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    paddingLeft: 20,
    fontSize: 24,
    borderRadius: 25,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 20,
    shadowRadius: 10,
    elevation: 10,
  },
});

const button_style = StyleSheet.create({
  button_item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  button_content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 100,
    paddingVertical: 10,
    width: 350,
    height: 50,
  },
  button_text: {
    color: '#0EA68D',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

const logo = StyleSheet.create({
  logo_box: {
    width: 400,
    height: 200,
    alignItems: 'center',
  },
  m_logo: {
    fontSize: 80,
    color: '#0EA68D',
    backgroundColor: 'white',
    fontWeight: 'bold',
  },
  rectangle: {
    width: 120,
    height: 120,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
