import {authorize, revoke, AuthConfiguration} from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CLIENT_ID, TENENT_ID, AUTHORIZATION_ENDPOINT, TOKEN_ENDPOINT, ISSUER} from '@env';
import { Platform } from 'react-native';

  const config: AuthConfiguration = {
    issuer: ISSUER,
    clientId: CLIENT_ID,
    redirectUrl: 'com.medbuzz://auth/',
    scopes: ['openid'],
    additionalParameters: {prompt: 'select_account'},
    serviceConfiguration: {
      authorizationEndpoint:AUTHORIZATION_ENDPOINT,
      tokenEndpoint: TOKEN_ENDPOINT,
  },
};
if(Platform.OS === 'ios'){
    config.useNonce = true;
    config.usePKCE = true;
    config.additionalParameters = {prompt: 'select_account',p:'B2C_1_com.medbuzz'};
}
else{
    config.scopes.push('email');

}
class Auth {

  // Function to construct and log the authorization URL
static logAuthUrl = (config: AuthConfiguration) => {
  const baseUrl = config.serviceConfiguration?.authorizationEndpoint;

  if (!baseUrl) {
    console.error("Authorization endpoint is not defined in the configuration.");
    return;
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUrl,
    response_type: 'code',
    scope: config.scopes.join(' '),
    ...config.additionalParameters,
  });

  const authUrl = `${baseUrl}&${params.toString()}`;
  console.log("Constructed Authorization URL:", authUrl); // Logs the URL
};

  // Sign In or Sign Up function
  static async signIn() {
    try {
      console.log("Config Start");
      Auth.logAuthUrl(config);
      console.log("Config End");
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
      console.error('Authorization failed:', JSON.stringify(error, null, 2));
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
