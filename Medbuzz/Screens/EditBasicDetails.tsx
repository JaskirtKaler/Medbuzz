import { Button, StyleSheet, View, Text, ScrollView, TextInput, Touchable, TouchableOpacity } from 'react-native'
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
        <TouchableOpacity style={styles.saveButton}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>CANCEL</Text>
        </TouchableOpacity>
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
    }, 

    saveButton: {
      marginTop: 20, 
      margin: 10, 
      height: 40, 
      borderRadius: 10, 
      backgroundColor: "#0EA68D", 
      alignItems: "center", 
      padding: 10
    }, 

    cancelButton: {
      margin: 10, 
      height: 40, 
      borderRadius: 10, 
      backgroundColor: "#E6E6E6", 
      alignItems: "center", 
      padding: 10
    }
  });
  

  export default EditBasicDetails
