/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
// RegContinue.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native'; // Import Alert

const { height, width } = Dimensions.get('window');

const RegContinue = () => {
    const [isSelected, setSelection] = useState(false);
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [referral, setReferral] = useState('');
    const navigation = useNavigation();


    const allInputsFilled = password && phoneNumber && referral && isSelected;

    const handleContinue = () => {
        if (allInputsFilled) {
            // Proceed with the next action
        } else {
            Alert.alert(
                "Incomplete Form",
                "Please fill all the inputs and agree to the terms to continue.",
                [
                    { text: "OK" }
                ]
            );
        }
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>{`<`}</Text>
            </TouchableOpacity>
            <View style={styles.logoBox}>
                <Text style={styles.logoText}>M</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword} // Set the state for password
                    placeholderTextColor="#ddd"
                    secureTextEntry
                />
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPhoneNumber} // Set the state for phone number
                    placeholderTextColor="#ddd"
                    keyboardType="phone-pad"
                />
                <Text style={styles.label}>How Did you hear about us?</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setReferral} // Set the state for how did you hear about us
                    placeholderTextColor="#ddd"
                />
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                        style={styles.checkbox}
                        tintColors={{ true: 'white', false: 'white' }}
                    />
                    <Text style={styles.termsText}>By tapping continue you're agreeing with our terms of service and privacy policies</Text>
                </View>
                <TouchableOpacity
                    style={[styles.continueButton, !allInputsFilled ? styles.disabledButton : {}]}
                    onPress={handleContinue}
                    disabled={!allInputsFilled}
                >
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0EA68D', // Set the background color to match the design
    },
    formContainer: {
        paddingHorizontal: 30, // Adjust padding as needed
        paddingTop: 250, // Start the form a bit lower from the top
    },
    logoBox: {
        height: 120,
        width: 120,
        position: 'absolute',
        top: height * 0.1,
        left: width * 0.5 - 50, // Center the logo horizontally
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logoText: {
        fontSize: 75,
        color: '#0EA68D',
        fontWeight: 'bold',
    },
    label: {
        color: 'black',
        fontSize: 20,
        marginBottom: 5,
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 25,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 3,
        marginBottom: 15,
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    checkbox: {
        alignSelf: 'center',
        marginRight: 8,
    },
    termsText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    continueButton: {
        backgroundColor: 'white',
        borderRadius: 6,
        paddingVertical: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    continueButtonText: {
        color: '#0EA68D',
        fontSize: 28,
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 20,
    },
    backButtonText: {
        color: 'white',
        fontSize: 50,
    },
});

export default RegContinue;
