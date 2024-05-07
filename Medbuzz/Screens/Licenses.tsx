import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Bar } from 'react-native-progress';
import { Dropdown } from 'react-native-element-dropdown';
import Backarrow from '../Components/Svg/Backarrow';
import { useNavigation } from "@react-navigation/native";

const Licenses = () => {
    const progress = 50; // progress percentage
    const [selectedOption, setSelectedOption] = useState('');
    const navigation = useNavigation<any>();

    const options = [
        { label: 'Registered Nurse (RN)', value: 'Registered Nurse (RN)' },
        { label: 'Licensed Practical Nurse', value: 'Licensed Practical Nurse' },
        { label: 'Medical Doctor (MD)', value: 'Medical Doctor (MD)' },
        { label: 'Doctor of Osteopathic Medicine (DO)', value: 'Doctor of Osteopathic Medicine (DO)' },
        { label: 'Nurse Practitioner (NP)', value: 'Nurse Practitioner (NP)' },
        { label: 'Licensed Practical Nurse (LPN)', value: 'Licensed Practical Nurse (LPN)' },
        { label: 'Physician Assistant (PA)', value: 'Physician Assistant (PA)' },
        { label: 'Pharmacist', value: 'Pharmacist' },
        { label: 'Dentist ', value: 'Dentist ' },
        { label: 'Psychologist', value: 'Psychologist' },
        { label: 'Physical Therapist', value: 'Physical Therapist' },
        { label: 'Occupational Therapist', value: 'Occupational Therapist' },
        { label: 'Other', value: 'Other' },
        { label: '---', value: '---' },
    ];

    const handleBack = () => {
        navigation.goBack()
        console.log('Back button clicked');
    };

    const handleContinue = () => {
        navigation.navigate('LicenseLocation');
        console.log('Continue button clicked');
        //navigation.navigate('LicensesLocation'); // Navigate to LicensesLocation screen
    };

    return (
        <View style={styles.container}>
            <View style={styles.backButtonContainer}>
                <TouchableOpacity onPress={handleBack}>
                    <Backarrow width={40} height={40} color={'#FFF'} />
                </TouchableOpacity>
            </View>

            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>M</Text>
            </View>

            <Text style={styles.progressText}>
                Progress: {progress}%
            </Text>

            <Bar
                progress={progress / 100}
                width={300}
                color={'black'}
                borderRadius={0}
                unfilledColor={'#D9D9D9'}
                height={20}
            />

            <Text style={styles.headerText}>
                Types of Licenses
            </Text>

            <Dropdown
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={options}
                search
                maxHeight={150}
                labelField="label"
                valueField="value"
                placeholder="Select Licenses"
                searchPlaceholder="Search..."
                value={selectedOption}
                onChange={item => setSelectedOption(item.value)}
            />

            <TouchableOpacity
                onPress={handleContinue}
                style={styles.continueButton}>
                <Text style={styles.continueButtonText}>
                    Continue
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Licenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0EA68D',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButtonContainer: {
        position: 'absolute',
        top: 10,
        left: 0,
    },
    logoContainer: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        color: '#0EA68D',
        fontSize: 65,
        fontWeight: 'bold',
    },
    progressText: {
        color: 'black',
        marginTop: 30,
        marginLeft: 10,
        fontSize: 25,
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        color: 'black',
        marginTop: 20,
        marginRight: 20,
        fontSize: 25,
    },
    dropdown: {
        width: 300,
        margin: 16,
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 200,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black',
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: 'black',
    },
    continueButton: {
        backgroundColor: 'white',
        paddingHorizontal: 100,
        paddingVertical: 8,
        elevation: 5,
        marginBottom: 80,
    },
    continueButtonText: {
        color: '#0EA68D',
        fontSize: 25,
        fontWeight: 'bold',
    },
});
