import { View, Text, TextInput, StyleSheet, Dimensions, Pressable, LogBox, TouchableOpacity } from 'react-native';
import React from 'react';
import {Bar} from 'react-native-progress';
import { Svg, Path} from 'react-native-svg';
import BackArrow from '../Components/Svg/Backarrow';
const { width, height } = Dimensions.get('window');

const Specialty = () => {
    const progress = 35;

    const handleBack = () => {
        console.log("tapped");
    }

    return (
        <View style={styles.background_style}>
            <View style={styles.back_arrow}>
                <TouchableOpacity onPress={handleBack}>
                    <BackArrow width={40} height={40} color={"white"}/>
                </TouchableOpacity>
            </View>

            <View style={{
                width: '100%',
                height: '85%',
                justifyContent: 'space-around',
                alignItems: 'center'
                }}>
                <View style={logo.rectangle}>
                    <Text style={logo.m_logo}>M</Text>
                </View>


                <View>
                    <Text style={styles.progress}>Progress %</Text>

                    {/* Progress Bar */}
                    <Bar
                        progress={progress / 100}
                        width={350}
                        color={'black'}
                        borderRadius={0} // remove the default amount of border radius that comes with the progress bar
                        unfilledColor={'#D9D9D9'} // Color of the unfilled portion of the progress bar, color gotten from figma
                        height={20}
                    />
                </View>

                <View style={{alignSelf: 'flex-start', width: '100%', paddingLeft: '8%'}}>
                    <Text style={styles.text}>What's your specialty?</Text>
                </View>

                <View style={{width: '85%'}}>
                    <Text style={styles.text_sub}>Specailty</Text>
                    <TextInput style={input_style.input}/>
                </View>

                <View style={{ width: '85%'}}>
                    <Text style={styles.text_sub}>Years in specailty</Text>
                    <TextInput style={input_style.input}/>
                </View>

                <View style={{alignSelf: 'flex-start', paddingLeft: '8%'}}>
                    <TouchableOpacity>
                            <Text style={styles.add_specailty_text}>+ Add additional specailty</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={button_style.button_content}>
                        <Text style={button_style.button_text}>Continue</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    ) // End return statement
} // End Specialty

export default Specialty;

// Style Sheets
const styles = StyleSheet.create({
    main: {
        flex: 1,
        width: '100%',
        height: '100%', 
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    background_style: {
        backgroundColor: '#0EA68D',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        padding: 8,
        // margin: 10,
        width: '110%',
        borderRadius: 25
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 8,
        // margin: 20,
        width: '85%',
        height: 50
    },
    text: {
        color: 'black',
        fontSize: 30,
        // alignSelf: 'flex-start',
        // marginLeft: '8%',
        // marginTop: '5%'
    },
    text_sub: {
        color: 'black',
        fontSize: 25,
        // alignSelf: 'flex-start',
        // marginLeft: '8%',
        // marginTop: 10
        paddingBottom: '5%'
    },
    add_specailty_text: {
        color: 'white',
        fontSize: 25,
        alignSelf: 'flex-start'
        // marginBottom: '8%'
    },
    progress: {
        color: 'black',
        fontSize: 30,
        // marginTop: 30,
        // marginLeft: '8%',
        alignSelf: 'flex-start'
    },
    progress_bar: {
        backgroundColor: 'black',
        width: 350,
        height: 20
    },
    back_arrow: {
        alignSelf: 'flex-start',
        width: '100%',
        height: height*0.1,
        flexDirection: 'row',
        paddingTop: '5%'
        // marginRight: '85%',
        // marginBottom: '10%'
    }
});

const input_style = StyleSheet.create({
    input_field: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        padding: 8,
        // margin: 10,
        // width: '85%',
        // height: '6%',
        borderRadius: 25
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
        paddingHorizontal: 100,
        paddingVertical: 10,
        // marginTop: 20,
        width: 350,
        height: 50
    },
    button_text: {
        color: '#0EA68D',
        fontSize: 24,
        fontWeight: 'bold'
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
})