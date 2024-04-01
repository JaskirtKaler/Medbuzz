
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './Screens/Login.tsx'
import EditBasicDetails from './Screens/EditBasicDetails.tsx'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

// import { Not sure if there is needed 
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();

function App(){

  return (
    // in Stack.Navigator => initialRouteName="Login" screenOptions={{headerShown: false}}
    <NavigationContainer>
      <Stack.Navigator> 
        {/*<Stack.Screen name="Login" component={Login} />*/}
        <Stack.Screen name="EditBasicDetails" component={EditBasicDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 
});

export default App;
