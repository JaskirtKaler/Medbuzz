import { View, Text, StyleSheet, Button, Pressable, LogBox, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react';
import {useState} from 'react';

const Certificates = () => {
    const progress = 50;
    const [dropDownVisible, setDropDownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const cert_options = [
        'ACLS',
        'BLS',
        'Cert3',
        'Cert4',
        'Cert5',
        'Bla',
        'Duende'
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
            <Text style={cert_style.progress_bar}></Text>
            <Text style={cert_style.padding}></Text>

            {/* Dropdown menu */}

            {/* Dropdown trigger */}
            <TouchableOpacity onPress={() => setDropDownVisible(!dropDownVisible)}>
                <Text style={cert_style.text}>Select Certificates ▼</Text>
            </TouchableOpacity>

            {/* Dropdown list */}
            {dropDownVisible && (
                <FlatList
                data={cert_options}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handleCertSelect(item)} style={{alignItems: 'center'}}>
                        <Text style={dropdown_style.text}>{item}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
                style={dropdown_style.selection}
            />
            )}

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