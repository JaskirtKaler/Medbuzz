import { View,
    Text,
    StyleSheet,
    Dimensions,
    Button,
    Pressable,
    LogBox,
    FlatList,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,  
    TextInput} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {Bar} from 'react-native-progress';
import { Svg, Path} from 'react-native-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BackArrow from '../Components/Svg/Backarrow';
const { width, height } = Dimensions.get('window');

var selected_certs = new Array(20);

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

    const handleCertSelect = (value: string) => {
        setSelectedOption(value);
        selected_certs.push(value);

        // For testing purposes
        // for (let i = 0; i < selected_certs.length; i++) {
        //     console.log(selected_certs[i]);
        // }
    }

    const handleBack = () => {
        console.log("Back arrow");
    }

    return (
        <View style={cert_style.background_style}>
            
            {/* Header */}
            <View style={cert_style.header}>
                <TouchableOpacity onPress={handleBack}>
                    <BackArrow style={cert_style.back_arrow} width={40} height={40} color={"white"}/>
                </TouchableOpacity>
            </View>

            {/* Page Body */}
            <View style={cert_style.body}>
                <View style={logo.rectangle}>
                    <Text style={logo.m_logo}>M</Text>
                </View>

                <View style={cert_style.progress_container}>
                    <Text style={cert_style.progress}>Progress %</Text>
                    {/* Progress Bar Itself*/}
                    <Bar
                        progress={progress / 100}
                        width={350}
                        color={'black'}
                        borderRadius={0} // remove the default amount of border radius that comes with the progress bar
                        unfilledColor={'#D9D9D9'} // Color of the unfilled portion of the progress bar, color gotten from figma
                        height={20}
                    />
                </View>

                <View style={dropdown_style2.dropdown_container}>
                {/* Dropdown menu */}
                    <Dropdown
                        keyboardAvoiding={false}
                        style={dropdown_style2.dropdown}
                        selectedTextStyle={dropdown_style2.selectedTextStyle}
                        inputSearchStyle={dropdown_style2.inputSearchStyle}
                        data={cert_options}
                        search
                        maxHeight={height * 0.3}
                        labelField='label'
                        valueField='value'
                        placeholder='Select Certificates'
                        searchPlaceholder='Search...'
                        value={selectedOption}
                        onChange={item => handleCertSelect(item.value)}
                    />
                </View>

                {/* <View>
                    <TouchableOpacity onPress={() => console.log('Add feature')}>
                        <Text style={cert_style.add_cert}>+ Add additional certificates</Text>
                    </TouchableOpacity>
                </View> */}

            </View>

            <View style={cert_style.footer}>
                <TouchableOpacity style={button_style.button_content}>
                    <Text style={button_style.button_text}>Continue</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
} // End Certificates

export default Certificates;

// Style Sheets
const cert_style = StyleSheet.create({
    background_style: {
        backgroundColor: '#0EA68D',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        display: 'flex'
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
        paddingBottom: '2%'
        // marginLeft: '8%',
        // marginTop: 30
    },
    progress_container: {
        paddingBottom: '5%',
        paddingTop: '5%'
    },
    progress_bar: {
        backgroundColor: 'black',
        width: 350,
        height: 20
    },
    padding: {
        paddingBottom: '10%'
    },
    back_arrow: {
        alignSelf: 'flex-start',
        //marginRight: '85%',
        //marginBottom: '10%'

    },
    body: {
        width: '100%',
        height: height*0.8,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: '5%'
    },
    header: {
        display: 'flex',
        alignSelf: 'flex-start',
        width: '100%',
        height: Dimensions.get('window').height*0.1,//height*0.1
        flexDirection: 'row',
        paddingTop: '5%'
    },
    footer: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: height*0.1,
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
        // padding: 8,
        // margin: 20,
        width: 350,
        height: 50
    },
    button_text: {
        color: '#0EA68D',
        fontSize: 24,
        fontWeight: 'bold'
    }
});

const dropdown_style2 = StyleSheet.create({
    dropdown: {
        width: 350,
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        paddingLeft: '5%',
        paddingRight: '5%',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 20,
        shadowRadius: 10,
        elevation: 20
      },
      placeholderStyle: {
        fontSize: 16,
        color: 'black'
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
      dropdown_container: {

      }
});