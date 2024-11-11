import {authorize, revoke, AuthConfiguration} from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CLIENT_ID,
  TENENT_ID,
  AUTHORIZATION_ENDPOINT,
  TOKEN_ENDPOINT,
  ISSUER,
} from '@env';
import {atob} from 'react-native-quick-base64';
global.atob = atob;
import {jwtDecode, JwtPayload} from 'jwt-decode';
const config: AuthConfiguration = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUrl: 'com.medbuzz://auth/',
  scopes: ['openid', 'email', 'profile'],
  additionalParameters: {prompt: 'select_account'},
  serviceConfiguration: {
    authorizationEndpoint: AUTHORIZATION_ENDPOINT,
    tokenEndpoint: TOKEN_ENDPOINT,
  },
  useNonce: true,
  usePKCE: true, //For iOS, we have added the useNonce and usePKCE parameters, which are recommended for security reasons.
};

interface CustomJwtPayload extends JwtPayload {
  given_name: string;
  family_name: string;
  emails: string;
}

class Auth {
  // Sign In or Sign Up function
  static async signIn() {
    try {
      console.log('Made it to SigIn()');
      //we get stuck here
      const authState = await authorize(config);
      console.log('Made it passed authState');
      // Decode the idToken to get user information
      const decodedIdToken = jwtDecode<CustomJwtPayload>(authState.idToken);
      console.log('Decoded ID Token:', decodedIdToken);
      //console.log(decodedIdToken.family_name)

      // Store the decoded object in AsyncStorage so survey pages can add to it
      await AsyncStorage.setItem('Auth', JSON.stringify(decodedIdToken));

      //console.log(authState.idToken);

      // You could also store refreshToken if you need it for token refresh
      if (authState.refreshToken) {
        await AsyncStorage.setItem('refreshToken', authState.refreshToken);
      }

      return {authState, decodedIdToken}; // Return the auth state with tokens
    } catch (error) {
      console.error('Error during sign-in:', error);
      throw error;
    }
  }

  // Sign Out function (Revoke tokens)
  static async signOut() {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        await revoke(config, {
          tokenToRevoke: accessToken,
          sendClientId: true, // Send clientId with revoke request (may be required)
        });
      }

      // Clear all tokens from AsyncStorage
      await AsyncStorage.removeItem('idToken');
      await AsyncStorage.removeItem('initialObject');
      
      try {
        // Get all keys from AsyncStorage
        const keys = await AsyncStorage.getAllKeys();
  
        if (keys.length > 0) {
          // Fetch all key-value pairs
          const result = await AsyncStorage.multiGet(keys);
  
          // Display key-value pairs
          result.forEach(([key, value]) => {
            console.log(`Key: ${key}, Value: ${value}`);
          });
        } else {
          console.log('No data found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage', error);
      }

      return true;
    } catch (error) {
      console.error('Error during sign-out:', error);
      throw error;
    }
  }

  // Utility function to get the current access token
  static async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem('initialObject');
      return token;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  // Utility function to check if user is authenticated
  static async isAuthenticated() {
    const token = await this.getAccessToken();
    return !!token; // Returns true if token exists
  }
}

export default Auth;
