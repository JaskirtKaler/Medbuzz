import { Button, StyleSheet, View, Text, ScrollView, TextInput, Touchable, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from 'react-native/Libraries/NewAppScreen';

/*const data = [
  { label: 'Item 1', value: '1' }, { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' }, { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' }, { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' }, { label: 'Item 8', value: '8' }
];*/

// properties for TextBox and BigTextBox
type textBoxProps = {
  field: string;
  required: boolean;
};

// Custom component: TextBox
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

// Custom component: BigTextBox
const BigTextBox = (props: textBoxProps) => {
  return (
    <View>
      <Text style={styles.fieldTextStyle}>{props.field}</Text>
      <TextInput style={styles.bigTextBoxStyle}></TextInput>
    </View>
  );
};

// Screen - Edit Basic Details
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

  // Styles
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
  }, 

  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },

  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 16,
  },

  selectedTextStyle: {
    fontSize: 16,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },

});

  
export default EditBasicDetails
