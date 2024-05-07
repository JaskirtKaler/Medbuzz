import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Bar } from 'react-native-progress';
import { Dropdown } from 'react-native-element-dropdown';
import Backarrow from '../Components/Svg/Backarrow';
import { useNavigation } from '@react-navigation/native';

const LicensesLocation = () => {
    const progress = 50; // Example progress percentage
    const [selectedOption, setSelectedOption] = useState('');
    const navigation = useNavigation<any>();
    const options = [
        { "label": "Alabama", "value": "Alabama" },
        { "label": "Alaska", "value": "Alaska" },
        { "label": "Arizona", "value": "Arizona" },
        { "label": "Arkansas", "value": "Arkansas" },
        { "label": "California", "value": "California" },
        { "label": "Colorado", "value": "Colorado" },
        { "label": "Connecticut", "value": "Connecticut" },
        { "label": "Delaware", "value": "Delaware" },
        { "label": "Florida", "value": "Florida" },
        { "label": "Georgia", "value": "Georgia" },
        { "label": "Hawaii", "value": "Hawaii" },
        { "label": "Idaho", "value": "Idaho" },
        { "label": "Illinois", "value": "Illinois" },
        { "label": "Indiana", "value": "Indiana" },
        { "label": "Iowa", "value": "Iowa" },
        { "label": "Kansas", "value": "Kansas" },
        { "label": "Kentucky", "value": "Kentucky" },
        { "label": "Louisiana", "value": "Louisiana" },
        { "label": "Maine", "value": "Maine" },
        { "label": "Maryland", "value": "Maryland" },
        { "label": "Massachusetts", "value": "Massachusetts" },
        { "label": "Michigan", "value": "Michigan" },
        { "label": "Minnesota", "value": "Minnesota" },
        { "label": "Mississippi", "value": "Mississippi" },
        { "label": "Missouri", "value": "Missouri" },
        { "label": "Montana", "value": "Montana" },
        { "label": "Nebraska", "value": "Nebraska" },
        { "label": "Nevada", "value": "Nevada" },
        { "label": "New Hampshire", "value": "New Hampshire" },
        { "label": "New Jersey", "value": "New Jersey" },
        { "label": "New Mexico", "value": "New Mexico" },
        { "label": "New York", "value": "New York" },
        { "label": "North Carolina", "value": "North Carolina" },
        { "label": "North Dakota", "value": "North Dakota" },
        { "label": "Ohio", "value": "Ohio" },
        { "label": "Oklahoma", "value": "Oklahoma" },
        { "label": "Oregon", "value": "Oregon" },
        { "label": "Pennsylvania", "value": "Pennsylvania" },
        { "label": "Rhode Island", "value": "Rhode Island" },
        { "label": "South Carolina", "value": "South Carolina" },
        { "label": "South Dakota", "value": "South Dakota" },
        { "label": "Tennessee", "value": "Tennessee" },
        { "label": "Texas", "value": "Texas" },
        { "label": "Utah", "value": "Utah" },
        { "label": "Vermont", "value": "Vermont" },
        { "label": "Virginia", "value": "Virginia" },
        { "label": "Washington", "value": "Washington" },
        { "label": "West Virginia", "value": "West Virginia" },
        { "label": "Wisconsin", "value": "Wisconsin" },
        { "label": "Wyoming", "value": "Wyoming" },
        { "label": "Dominic Republic ", "value": "Dominic Republic " },
        {label: 'Others ', value: 'Others '},
        {label: '---', value: '---'},
    ];

    const handleBack = () => {
        navigation.goBack();
        console.log('Back button clicked');
    };

    const handleContinue = () => {
        navigation.navigate('Main')
        console.log('Continue button clicked');
        // navigation.navigate('LicensesLocation'); // Navigate to LicensesLocation screen
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
                State of Which License Was Obtained
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
                placeholder="Select State"
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

export default LicensesLocation;

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
        justifyContent: 'center',
        marginBottom: 20,
    },
    headerText: {
        color: 'black',
        marginTop: 20,
        marginRight: 20,
        fontSize: 25,
        justifyContent: 'center',
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
