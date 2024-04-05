
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './Screens/Login.tsx'
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
import Specialty from './Screens/Specialty.tsx';
import Certificates from './Screens/Certificates.tsx';

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
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Login" component={Login} /> */ }
        {<Stack.Screen name="Specialty" component={Specialty}/>}
        {/* {<Stack.Screen name="Certificates" component={Certificates}/>} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 
});

export default App;
