import {authorize, revoke, AuthConfiguration} from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

  const config: AuthConfiguration = {
    clientId: 'your-client-id',
    redirectUrl: 'graph-sample://react-native-auth/',
    scopes: ['openid', 'offline_access', 'profile',],
    additionalParameters: {prompt: 'select_account'},
    serviceConfiguration: {
      authorizationEndpoint:
        'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    },
  };
class Auth {
//   static config = {
//     issuer: 'https://your-tenant-name.b2clogin.com/tfp/your-tenant-name.onmicrosoft.com/B2C_1A_signup_signin',
//     clientId: 'your-client-id',
//     redirectUrl: 'yourapp://auth',
//     scopes: ['openid', 'offline_access', 'profile',],
//     additionalParameters: {prompt: 'select_account'},
//     serviceConfiguration: {
//       authorizationEndpoint: 'https://your-tenant-name.b2clogin.com/your-tenant-name.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1A_signup_signin',
//       tokenEndpoint: 'https://your-tenant-name.b2clogin.com/your-tenant-name.onmicrosoft.com/oauth2/v2.0/token?p=B2C_1A_signup_signin',
//       revocationEndpoint: 'https://your-tenant-name.b2clogin.com/your-tenant-name.onmicrosoft.com/oauth2/v2.0/logout?p=B2C_1A_signup_signin',
//     },
//   };

  // Sign In or Sign Up function
  static async signIn() {
    try {
      const authState = await authorize(config);

      // Store tokens in AsyncStorage
      await AsyncStorage.setItem('accessToken', authState.accessToken);
      await AsyncStorage.setItem('idToken', authState.idToken);

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
