import { View, Text, TextInput, StyleSheet, Button, Pressable, LogBox } from 'react-native'
import React from 'react'

const Specialty = () => {
    return (
        <View style={styles.background_style}>
            <View style={logo.rectangle}>
                <Text style={styles.m_logo}>M</Text>
            </View>
            <View>
                <Text style={styles.text}>Progress %</Text>
            </View>

            <View>
                <Text style={styles.text}>What's your specialty?</Text>
                <Text style={styles.text_sub}>Specailty</Text>
                <View style={input_style.input_field}>
                    <TextInput style={styles.input}/>
                </View>
                <Text style={styles.text_sub}>Years in specailty</Text>
                <View style={input_style.input_field}>
                    <TextInput style={styles.input}/>
                </View>
                <Text style={styles.add_specailty_text}>+ Add additional specailty</Text>
            </View>

            <View>
                <View style={button_style.button_item}>
                    <Pressable style={button_style.button_content}>
                        <Text style={button_style.button_text}>Continue</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default Specialty

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        padding: 8,
        margin: 10,
        width: '85%',
        borderRadius: 25
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 8,
        margin: 20,
        width: '85%',
        height: 50
    },
    text: {
        fontSize: 30,
        paddingLeft: 50
    },
    text_sub: {
        fontSize: 25,
        paddingLeft: 50
    },
    add_specailty_text: {
        fontSize: 25,
        color: 'white',
        paddingLeft: 50
    },
    /*background_style: {
        backgroundColor: '#0EA68D',
        flex: 1,
        justifyContent: 'center'
    },*/
    background_style: {
        backgroundColor: '#0EA68D',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'stretch',
        columnGap: 30,
        paddingTop: '20%',
        paddingBottom: '20%',
        justifyContent: 'space-around'
    },
    m_logo: {
        fontSize: 80,
        color: '#0EA68D',
        backgroundColor: 'white'
    }
});

const input_style = StyleSheet.create({
    input_field: {
        justifyContent: 'center',
        alignItems: 'center'
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
        left: '35%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
})