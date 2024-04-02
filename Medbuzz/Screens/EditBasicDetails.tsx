import { Button, StyleSheet, View, Text, ScrollView, TextInput } from 'react-native'
import React, {useState} from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';

type textBoxProps = {
  field: string;
  required: boolean;
};

const TextBox = (props: textBoxProps) => {
  if(props.required === true) {
    return (
      <View>
        <Text style={styles.fieldTextStyle}>
          <Text>{props.field}</Text>
          <Text style={{color: 'red'}}> *</Text>
        </Text>
        <TextInput style={styles.textBoxStyle}></TextInput> 
      </View>
    );

  } else {
    return (
      <View>
        <Text style={styles.fieldTextStyle}>{props.field}</Text>
        <TextInput style={styles.textBoxStyle}></TextInput>
      </View>
    );
  }
};

const BigTextBox = (props: textBoxProps) => {
  return (
    <View>
      <Text style={styles.fieldTextStyle}>{props.field}</Text>
      <TextInput style={styles.bigTextBoxStyle}></TextInput>
    </View>
  );
};

const EditBasicDetails = () => {
    return (
      <ScrollView style={{backgroundColor:'white'}}>
        <Text style={styles.headerTextStyle}>About Me</Text>
        <Button title="Upload Photo" />
        <TextBox field="First name" required={true}/>
        <TextBox field="Middle name" required={false}/>
        <TextBox field="Last name" required={true}/>
        <TextBox field="Phone number" required={true}/>
        <TextBox field="Email" required={true}/>
        <BigTextBox field="Professional summary" required={false}/>
        <TextBox field="Date of birth" required={true}/>
        <Text style={styles.headerTextStyle}>Education</Text>
        <TextBox field="School name" required={true} />
        <TextBox field="Country" required={true}/>
        <TextBox field="City" required={false}/>
        <TextBox field="State"  required={true}/>
      </ScrollView>
    )
  }

  const styles = StyleSheet.create({
    textBoxStyle: {
      borderColor: 'black',
      borderWidth: 1, 
      borderRadius: 10,
      margin: 10
    },

    bigTextBoxStyle: {
      borderColor: 'black',
      borderWidth: 1, 
      borderRadius: 10,
      margin: 10,
      height: 100
    }, 

    fieldTextStyle: {
      margin: 10, 
      color:'black'
    }, 

    headerTextStyle: {
      margin: 10, 
      color: 'black',
      fontSize: 20, 
      fontWeight: 'bold'
    }
  });
  

  export default EditBasicDetails
