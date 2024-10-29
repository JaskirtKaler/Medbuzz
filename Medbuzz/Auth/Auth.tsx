import {authorize, revoke, AuthConfiguration} from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CLIENT_ID, TENENT_ID, AUTHORIZATION_ENDPOINT, TOKEN_ENDPOINT, ISSUER} from '@env';
  const config: AuthConfiguration = {
    issuer: ISSUER,
    clientId: CLIENT_ID,
    redirectUrl: 'com.medbuzz://auth/',
    scopes: ['openid', 'email'],
    additionalParameters: {prompt: 'select_account'},
    serviceConfiguration: {
      authorizationEndpoint:
        AUTHORIZATION_ENDPOINT,
      tokenEndpoint: TOKEN_ENDPOINT,
    },
    useNonce: true, 
    usePKCE: true, //For iOS, we have added the useNonce and usePKCE parameters, which are recommended for security reasons.
  };
class Auth {

  // Sign In or Sign Up function
  static async signIn() {
    try {
      console.log('Made it to SigIn()')
      //we get stuck here
      const authState = await authorize(config);
      console.log('Made it passed authState')
      
      // Store tokens in AsyncStorage
      //await AsyncStorage.setItem('accessToken', authState.accessToken);
      await AsyncStorage.setItem('idToken', authState.idToken);

      console.log(authState.idToken)

      // You could also store refreshToken if you need it for token refresh
      if (authState.refreshToken) {
        await AsyncStorage.setItem('refreshToken', authState.refreshToken);
      }

      return authState; // Return the auth state with tokens
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
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('idToken');
      await AsyncStorage.removeItem('refreshToken');

      return true;
    } catch (error) {
      console.error('Error during sign-out:', error);
      throw error;
    }
  }

  // Utility function to get the current access token
  static async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem('accessToken');
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
