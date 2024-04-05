import { Button, StyleSheet, View, Text, ScrollView, TextInput, Touchable, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const states = [
  { label: 'AL', value: 'al' }, { label: 'AK', value: 'ak' },
  { label: 'AZ', value: 'az' }, { label: 'AR', value: 'ar' },
  { label: 'CA', value: 'ca' }, { label: 'CO', value: 'co' },
  { label: 'CT', value: 'ct' }, { label: 'DE', value: 'de' },
  { label: 'FL', value: 'fl' }, { label: 'GA', value: 'ga' },
  { label: 'HI', value: 'hi' }, { label: 'ID', value: 'id' },
  { label: 'IL', value: 'il' }, { label: 'IN', value: 'in' },
  { label: 'IA', value: 'ia' }, { label: 'KS', value: 'ks' },
  { label: 'KY', value: 'ky' }, { label: 'LA', value: 'la' },
  { label: 'ME', value: 'me' }, { label: 'MD', value: 'md' },
  { label: 'MA', value: 'ma' }, { label: 'MI', value: 'mi' },
  { label: 'MN', value: 'mn' }, { label: 'MS', value: 'ms' },
  { label: 'MO', value: 'mo' }, { label: 'MT', value: 'mt' },
  { label: 'NE', value: 'ne' }, { label: 'NV', value: 'nv' },
  { label: 'NH', value: 'nh' }, { label: 'NJ', value: 'nj' },
  { label: 'NM', value: 'nm' }, { label: 'NY', value: 'ny' },
  { label: 'NC', value: 'nc' }, { label: 'ND', value: 'nd' },
  { label: 'OH', value: 'oh' }, { label: 'OK', value: 'ok' },
  { label: 'OR', value: 'or' }, { label: 'PA', value: 'pa' },
  { label: 'RI', value: 'ri' }, { label: 'SC', value: 'sc' },
  { label: 'SD', value: 'sd' }, { label: 'TN', value: 'tn' },
  { label: 'TX', value: 'tx' }, { label: 'UT', value: 'ut' },
  { label: 'VT', value: 'vt' }, { label: 'VA', value: 'va' },
  { label: 'WA', value: 'wa' }, { label: 'WV', value: 'wv' },
  { label: 'WI', value: 'wi' }, { label: 'WY', value: 'wy' }
];

const degrees = [
  {label: 'AA', value: 'aa'}, {label: 'AS', value: 'as'},
  {label: 'BA', value: 'ba'}, {label: 'BS', value: 'bs'},
  {label: 'MA', value: 'ma'}, {label: 'MS', value: 'ms'},
  {label: 'PHD', value: 'phd'}
];

const months = [
  {label: 'January', value: 'january'}, {label: 'February', value: 'february'},
  {label: 'March', value: 'march'}, {label: 'April', value: 'april'},
  {label: 'May', value: 'may'}, {label: 'June', value: 'june'},
  {label: 'July', value: 'july'}, {label: 'August', value: 'august'},
  {label: 'September', value: 'september'}, {label: 'October', value: 'october'},
  {label: 'November', value: 'november'}, {label: 'December', value: 'december'},
];

const years = [
  {label: '1975', value: '1975'}, {label: '1976', value: '1976'}, 
  {label: '1977', value: '1977'}, {label: '1978', value: '1978'},
  {label: '1979', value: '1979'}, {label: '1980', value: '1980'},
  {label: '1981', value: '1981'}, {label: '1982', value: '1982'},
  {label: '1983', value: '1983'}, {label: '1984', value: '1984'},
  {label: '1985', value: '1985'}, {label: '1986', value: '1986'},
  {label: '1987', value: '1987'}, {label: '1988', value: '1988'},
  {label: '1989', value: '1989'}, {label: '1990', value: '1990'},
  {label: '1991', value: '1991'}, {label: '1992', value: '1992'},
  {label: '1993', value: '1993'}, {label: '1994', value: '1994'},
  {label: '1995', value: '1995'}, {label: '1996', value: '1996'},
  {label: '1997', value: '1997'}, {label: '1998', value: '1998'},
  {label: '1999', value: '1999'}, {label: '2000', value: '2000'},
  {label: '2001', value: '2001'}, {label: '2002', value: '2002'},
  {label: '2003', value: '2003'}, {label: '2004', value: '2004'},
  {label: '2005', value: '2005'}, {label: '2006', value: '2006'},
  {label: '2007', value: '2007'}, {label: '2008', value: '2008'},
  {label: '2009', value: '2009'}, {label: '2010', value: '2010'},
  {label: '2011', value: '2011'}, {label: '2012', value: '2012'},
  {label: '2013', value: '2013'}, {label: '2014', value: '2014'},
  {label: '2015', value: '2015'}, {label: '2016', value: '2016'},
  {label: '2017', value: '2017'}, {label: '2018', value: '2018'},
  {label: '2019', value: '2019'}, {label: '2020', value: '2020'},
  {label: '2021', value: '2021'}, {label: '2022', value: '2022'},
  {label: '2023', value: '2023'}, {label: '2024', value: '2024'},
  {label: '2025', value: '2025'}, {label: '2026', value: '2026'},
  {label: '2027', value: '2027'}, {label: '2028', value: '2028'},
];

const discipline = [
  {label: 'Registered Nurse', value: 'Registered Nurse'},
  {label: 'Licensed Practical Nurse', value: 'Licensed Practical Nurse'},
  {label: 'CMA', value: 'CMA'},
  {label: 'Faculty Staff', value: 'Faculty Staff'},
  {label: 'blah', value: 'blah'}, // Add other options
  {label: 'blahblah', value: 'blahblah'},
  {label: 'blahblahblah', value: 'blahblahblah'},
  {label: '---', value: '---'},
];

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
  const [value, setValue] = useState("");
  return (
    <ScrollView style={{backgroundColor:'white'}}>
      <Text style={styles.headerTextStyle}>About You</Text>
      <TouchableOpacity style={styles.uplaodPhotoButton}>
        <Text style={{color: '#0EA68D', fontWeight: 'bold'}}>Upload Photo</Text>
      </TouchableOpacity>
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
      <Text style={styles.fieldTextStyle}>
        <Text>State</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={states}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="State"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
      />
      <Text style={styles.fieldTextStyle}>
        <Text>Graduation date, or expected</Text>
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <Text style={{marginLeft: 10, marginRight: 10}}>
        <Dropdown
          style={styles.dropdownMonthYear}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={months}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Month"
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            setValue(item.value);
         }}
        />
        <Dropdown
          style={styles.dropdownMonthYear}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={years}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Year"
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
        />
      </Text>
      <Text style={styles.fieldTextStyle}>
        <Text>Degree type</Text>
        <Text style={{color: 'red'}}></Text>
      </Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={degrees}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
      />
      <TextBox field="Field of study" required={false}/>
      <Text style={{color: 'grey', marginLeft: 10}}>Ex. Health Science, Biology, Public Health, etc.</Text>
      <Text style={styles.headerTextStyle}>Permanent home address</Text>
      <TextBox field="Home street address" required={true}></TextBox>
      <TextBox field="City" required={true}></TextBox>
      <TextBox field="State" required={true}></TextBox>
      <Text style={styles.headerTextStyle}>Your expertise</Text>
      <Text style={styles.fieldTextStyle}>
        <Text>Discipline</Text>
        <Text style={{color:'red'}}> *</Text>
      </Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={discipline}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
      />
      <TextBox field="Years of specialty experience" required={true}></TextBox>
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
    marginLeft: 10,
    marginRight: 10,
    height: 40
  },

  bigTextBoxStyle: {
    borderColor: 'black',
    borderWidth: 1, 
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 100
  }, 

  fieldTextStyle: {
    marginTop: 10,
    marginLeft: 10, 
    marginRight: 10, 
    marginBottom:5, 
    color:'black'
  }, 

  headerTextStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30, 
    marginBottom: 10, 
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

  uplaodPhotoButton: {
    padding:10,
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    borderColor: "#0EA68D", 
    backgroundColor: 'white',
    alignItems: "center",
  },

  dropdown: {
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10
  },

  dropdownMonthYear: {
    width: 120,
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10
  },

  placeholderStyle: {
    fontSize: 16,
    paddingLeft: 5
  },

  selectedTextStyle: {
    fontSize: 16,
    paddingLeft: 5
  },

  iconStyle: {
    width: 20,
    height: 20,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  }
});

  
export default EditBasicDetails
