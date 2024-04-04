import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Bar} from 'react-native-progress';
import {Dropdown} from 'react-native-element-dropdown';
import Backarrow from '../Components/Svg/Backarrow';
{
    /* Dropdown */
}

const LicensesLocation = () => {
    const progress = 50; // Example progress percentage
    const [selectedOption, setSelectedOption] = useState(''); //To hold the selected Discipline

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
        console.log('Back button clicked');
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#0EA68D',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            {/* Back Button */}
            <View style={{position: 'absolute', top: 10, left: 0}}>
                <TouchableOpacity onPress={handleBack}>
                    <Backarrow width={40} height={40} color={'#000'} />
                </TouchableOpacity>
            </View>

            {/* Logo Placement */}
            <View
                style={{
                    width: 100,
                    height: 100,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text style={{color: '#0EA68D', fontSize: 65, fontWeight: 'bold'}}>
                    M
                </Text>
            </View>

            {/* Progress Text */}
            <Text
                style={{
                    color: 'black',
                    marginTop: 30,
                    marginLeft: 45,
                    fontSize: 25,
                    alignSelf: 'flex-start',
                }}>
                Progress: {progress}%
            </Text>

            {/* Progress Bar */}
            <Bar
                progress={progress / 100}
                width={300}
                color={'black'}
                borderRadius={0} // remove the default amount of border radius that comes with the progress bar
                unfilledColor={'#D9D9D9'} // Color of the unfilled portion of the progress bar, color gotten from figma
                height={20}
            />

            <Text
                style={{
                    color: 'black',
                    marginTop: 20,
                    marginRight: 20,
                    fontSize: 25,
                }}>
                State of Which License Was Obtained
            </Text>

            {/* Dropdown */}
            <Dropdown
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={options}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select State"
                searchPlaceholder="Search..."
                value={selectedOption}
                onChange={item => setSelectedOption(item.value)}
            />
            {/* Continue Button */}
            <TouchableOpacity
                onPress={() => console.log('Continue button clicked')}
                style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 100,
                    paddingVertical: 8,
                    elevation: 5,
                    marginBottom: 80,
                }}>
                <Text style={{color: '#0EA68D', fontSize: 25, fontWeight: 'bold'}}>
                    Continue
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default LicensesLocation;

const styles = StyleSheet.create({
    dropdown: {
        width: 300,
        margin: 16,
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 200,
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'black',
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
});
