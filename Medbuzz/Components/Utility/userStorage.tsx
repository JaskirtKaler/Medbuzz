import AsyncStorage from '@react-native-async-storage/async-storage';

//creating a new typescript interface so that it be passed when creating the user state
// this is needed when using the spread operator, because spread operator can only be used with object types
export interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  referral?: string;
  discipline?: string;
  experience?: string;
  certificate?: string;
  license?: string;
  licenseLocation?: string;
  zipCode?: string;
  // Add other fields as needed
}

//This retrieves data from local storage and parses it from a string to an object
export const loadUser = async (): Promise<User | null> => {
  try {
    const userData = await AsyncStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
};

//This saves the updated user value to the local storage
export const saveUser = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};