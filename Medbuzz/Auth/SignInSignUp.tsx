/* eslint-disable prettier/prettier */
import {StyleSheet, View, Text, TouchableOpacity, Platform, Dimensions, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { authorize } from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth from './Auth.tsx';
const {width, height} = Dimensions.get('window'); // get width of page
import { RootStackParamList } from '../App';

function SignInSignUp(){
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Hook to access navigation
    const [authenticated, setAuthenticated] = useState(false); // State to store authentication status

    useEffect(() => {
        // Check if the user is already authenticated on component mount
        const checkAuth = async () => {
            const isUserAuthenticated = await Auth.isAuthenticated();
            setAuthenticated(isUserAuthenticated); // Set the state based on the authentication result
        };
        checkAuth();
    }, []);
    
    // Handle "Get Started" button click
    const handleGetStarted = async () => {
      try {
          const authState = await Auth.signIn(); // Simulate authentication
          if (authState.idToken) {
              await AsyncStorage.setItem('authToken', authState.idToken); // Store the token
              const storedProfile = await AsyncStorage.getItem('userProfile');
              if (!storedProfile) {
                  await AsyncStorage.setItem('userProfile', JSON.stringify(mockProfile)); // Save mock profile for first-time users
                  console.log('Mock profile saved for new user');
                  navigation.navigate('Register'); // Navigate to registration for new users
              } else {
                  navigation.navigate('Homepage'); // Navigate to homepage for existing users
              }
          }
      } catch (error) {
          console.error('Error during authentication:', error);
      }
  };
  

    return(
        <View style={style.main}>
            {/* Logo Section */}
            <View style={style.logo}>
                <View style={style.logoBox}>
                    <Text style={style.logoText}>M</Text>
                </View>
            </View>

            {/* Get Started Button */}
            <View style={style.btnContainer}>
                <TouchableOpacity style={style.getStartedBtn} onPress={handleGetStarted}>
                <Text style={style.getStartedText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const style = StyleSheet.create({
    main: {
        width: width,
        height: height,
        backgroundColor: '#0EA68D',
        flex: 1,
      },
      logo: {
        width: width,
        height: height * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
      },
      logoBox: {
        backgroundColor: '#FFF',
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
      // Button Container styling
      btnContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      // Get Started button styling
      getStartedBtn: {
        backgroundColor: '#FFF',
        width: width * 0.7,
        height: height * 0.06,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3, // For Android shadow effect
      },
      getStartedText: {
        fontSize: 20,
        color: '#0EA68D',
        fontWeight: '600',
      },
});
export default SignInSignUp;