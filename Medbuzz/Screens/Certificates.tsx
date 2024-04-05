import { View, Text, StyleSheet, Button, Pressable, LogBox, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {Bar} from 'react-native-progress';

const Certificates = () => {
    const progress = 50;
    const [dropDownVisible, setDropDownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const cert_options = [
        {label:'ACLS', value:'ACLS'},
        {label:'BLS', value:'BLS'},
        {label:'Cert3', value:'Cert3'},
        {label:'Cert4', value:'Cert4'},
        {label:'Cert5', value:'Cert5'},
        {label:'Bla', value:'Bla'},
        {label:'Duende', value:'Duende'},
        {label:'None', value:'Select Certificates ▼'}
    ];

    const handleCertSelect = (option: string) => {
        setSelectedOption(option);
        setDropDownVisible(false);
        console.log("Tapped");
    }

    const handleBack = () => {
        console.log("tapped");
    }

    return (
        <View style={cert_style.background_style}>
            <View style={logo.rectangle}>
                <Text style={logo.m_logo}>M</Text>
            </View>

            <Text style={cert_style.progress}>Progress %</Text>
            {/* Progress Bar */}
            <Bar
                progress={progress / 100}
                width={350}
                color={'black'}
                borderRadius={0} // remove the default amount of border radius that comes with the progress bar
                unfilledColor={'#D9D9D9'} // Color of the unfilled portion of the progress bar, color gotten from figma
                height={20}
            />

            {/* Dropdown menu */}
            <Dropdown
                style={dropdown_style2.dropdown}
                selectedTextStyle={dropdown_style2.selectedTextStyle}
                inputSearchStyle={dropdown_style2.inputSearchStyle}
                data={cert_options}
                search
                maxHeight={300}
                labelField='label'
                valueField='value'
                placeholder='Select Certificates ▼'
                searchPlaceholder='Search...'
                value={selectedOption}
                onChange={item => setSelectedOption(item.value)}
            />

            {/* Add additional certificates */}
            <TouchableOpacity onPress={() => console.log('Add feature')}>
                <Text style={cert_style.add_cert}>+ Add additional certificates</Text>
            </TouchableOpacity>

            <TouchableOpacity style={button_style.button_content}>
                <Text style={button_style.button_text}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
} // End Certificates

export default Certificates;

// Style Sheets
const cert_style = StyleSheet.create({
    background_style: {
        backgroundColor: '#0EA68D',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'black',
        fontSize: 30
    },
    add_cert: {
        fontSize: 25,
        color: 'white',
        paddingTop: '10%'
    },
    progress: {
        color: 'black',
        fontSize: 30,
        alignSelf: 'flex-start',
        marginLeft: '8%',
        marginTop: 30
    },
    progress_bar: {
        backgroundColor: 'black',
        width: 350,
        height: 20,
    },
    padding: {
        paddingBottom: '10%'
    }
});

const logo = StyleSheet.create({
    logo_box: {
        width: 400,
        height: 200,
        alignItems: 'center',
    },
    m_logo: {
        fontSize: 80,
        color: '#0EA68D',
        backgroundColor: 'white',
        fontWeight: 'bold'
    },
    rectangle: {
        width: 120,
        height: 120,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const bullet_list = StyleSheet.create({
    test: {
        fontSize: 25,
        color: 'white',
        paddingLeft: '5%'
    }
});

const dropdown_style = StyleSheet.create({
    text: {
        fontSize: 25,
        color: 'black',
        paddingLeft: '5%',
        paddingVertical: 5,
        alignContent: 'center'
    },
    selection: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 300,
        maxHeight: 200,
        marginTop: 10,
    }
});

const button_style = StyleSheet.create({
    button_item: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10
    },
    button_content: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 8,
        margin: 20,
        width: 350,
        height: 50
    },
    button_text: {
        color: '#0EA68D',
        fontSize: 24,
    }
});

const dropdown_style2 = StyleSheet.create({
    dropdown: {
        width: 300,
        margin: 16,
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 300,
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
      }
});