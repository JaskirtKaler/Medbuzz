import { Button, StyleSheet, View, Text, ScrollView, TextInput, Touchable, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';


type JobProps = {
    jobType: string;
    companyName: string;
    jobText: string
}

const Job = (props: JobProps) => {
    return (
        <View style={styles.jobStyle}>
            <View>
            <   Text style={{color: 'black', fontSize: 24, marginLeft: 10}}>{props.jobType}</Text>
                <Text style={{color: 'black', marginLeft: 15, fontSize: 16}}>{props.companyName}</Text>
            </View>
            <Text style={styles.jobTextStyle}>{props.jobText}</Text>
            <TouchableOpacity style={styles.detailsButton}>
                <Text style={{padding: 5, color: 'black'}}>Click for more details</Text>
            </TouchableOpacity>
        </View>
    )
}

const Homepage = () => {
    return (
        <ScrollView style={styles.containerStyle}>
            <Text style={styles.headerStyle}>Job Feed</Text>
            <Job jobType="Job Type" companyName="Company" jobText="Some Text about said job"/>
            <Job jobType="Job Type" companyName="Company" jobText="Some Text about said job"/>
            <Job jobType="Job Type" companyName="Company" jobText="Some Text about said job"/>
            <Job jobType="Job Type" companyName="Company" jobText="Some Text about said job"/>
            <Job jobType="Job Type" companyName="Company" jobText="Some Text about said job"/>
            <Job jobType="Job Type" companyName="Company" jobText="Some Text about said job"/>
            <Job jobType="Job Type" companyName="Company" jobText="Some Text about said job"/>
            <Job jobType="Job Type" companyName="Company" jobText="Some Text about said job"/>
            <Job jobType="Job Type" companyName="Company" jobText="Some Text about said job"/>
            <Job jobType="Job Type" companyName="Company" jobText="Some Text about said job"/>
            <Job jobType="Job Type" companyName="Company" jobText="Some Text about said job"/>
            <Job jobType="Job Type" companyName="Company" jobText="Some Text about said job"/>
            <Job jobType="Job Type" companyName="Company" jobText="Some Text about said job"/>
            <Job jobType="Job Type" companyName="Company" jobText="Some Text about said job"/>
            <Job jobType="Job Type" companyName="Company" jobText="Some Text about said job"/>
            <Job jobType="Job Type" companyName="Company" jobText="Some Text about said job"/>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white', 
        flex: 1,
    },

    headerStyle: {
      color:'black', 
      fontSize: 24, 
      textAlign: 'center', 
      marginTop:10, 
      marginBottom: 10
    },

    jobStyle: {
        width: '85%', 
        height: 200, 
        justifyContent: 'space-around', 
        borderWidth: 1, 
        borderColor: "black", 
        borderRadius: 10, 
        alignSelf: 'center', 
        marginBottom: 30
    },

    jobTextStyle: {
        width: '90%', 
        height: '30%', 
        backgroundColor: '#D9D9D9', 
        color: 'black', 
        textAlign: 'center', 
        alignSelf: 'center', 
        padding: 20
    },
    
    detailsButton: {
        width: '90%', 
        height: '15%', 
        backgroundColor: "#0EA68D", 
        alignItems: "center", 
        alignSelf: 'center',
        borderRadius: 10, 
        marginBottom: 5
    }
});

export default Homepage