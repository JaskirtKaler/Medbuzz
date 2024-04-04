import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Licenses from './Screens/Licenses.tsx';
import LicensesLocation from './Screens/LicenseLocation';
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

const Stack = createNativeStackNavigator();

function App(){

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Licenses" component={Licenses} />
                <Stack.Screen name="LicensesLocation" component={LicensesLocation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({

});

export default App;
