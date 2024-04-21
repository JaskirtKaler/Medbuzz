import { Button, StyleSheet, View, Text, ScrollView, TextInput, Touchable, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';



const Homepage = () => {
    return (
        <ScrollView style={styles.containerStyle}>
            <Text style={styles.headerStyle}>Job Feed</Text>

        </ScrollView>
    )

}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1, 
        backgroundColor: 'white', 
    },

    headerStyle: {
      color:'black', 
      fontSize: 24, 
      textAlign: 'center', 
    },
});

export default Homepage