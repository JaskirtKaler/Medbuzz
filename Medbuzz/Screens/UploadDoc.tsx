import { StyleSheet, Text, View, Button, Dimensions, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
const { width, height } = Dimensions.get('window'); // screen max width and height
import { Svg, Path} from 'react-native-svg';
import BackArrow from '../Components/Svg/Backarrow';
import Download from '../Components/Svg/Download';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App'; // Import the type for RootStackParamList
import { NativeStackScreenProps } from '@react-navigation/native-stack';



// Define props type using NativeStackScreenProps
type UploadDocProps = NativeStackScreenProps<RootStackParamList, 'UploadDoc'>;

const UploadDoc: React.FC<UploadDocProps> = ({ route }) => {
  const navigation = useNavigation<any>(); // Stack Navigation
  const header  = route.params.header; // returns the header : value
  const [selectedDocument, setSelectedDocument] = useState<DocumentPickerResponse | null>(null);
const handleUpload = async () =>{
    try{
        const doc = await DocumentPicker.pickSingle({type:  [DocumentPicker.types.pdf, DocumentPicker.types.images],});
        setSelectedDocument(doc); // Save the document path to the state
        console.log(doc);
        console.log(header)
    }catch (err){
        if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker
            console.log('user Cancelled the upload', err);
        } else {
            throw err;
        }
    }


}

// handle when Download icon/btn is clicked 
const handleDownload = () => {
  console.log('download clicked')
}

// handle when back arrow is clicked
const handleBack = () => {
  navigation.goBack();
  console.log('backarrow clicked')
}



  return (
    <View style={styles.main}>
      {/*Header Section */}
      <View style={styles.header}>

        <TouchableOpacity
          onPress={handleBack}
        >
          <BackArrow width={40} height={40} color={"#000"}/>
        </TouchableOpacity>
          <Text style={{color:'#000', fontWeight: "500", fontSize: 18}}>{header}</Text>
        <View style={{width:40}} /> 
      </View>
      {/*Contents section */}
      <View style={styles.contents}>

        {selectedDocument ? ( 
          <View style={styles.fileContainer}>

          <View style={styles.fileView}> 
            <Text>{selectedDocument['name']}</Text>
            {/* <Button title="Download file" /> */}
            <TouchableOpacity
              onPress={handleDownload}
            >
              <Download width={50} height={50} color={'#000'} />
            </TouchableOpacity>
          </View>

        </View>
        ) : (
          <View style={{justifyContent: 'center',alignItems: 'center',}}>
          <Text style={{color:'#000'}}> No file selected</Text>
          </View>
        )}

        <View style={styles.filler}></View>
        <View style={styles.uploadContainer}>
          {/* Upload button */}
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleUpload} // Handle document upload
        >
          <Text style={{color:'#000'}}>Upload new File</Text>
        </TouchableOpacity>

        </View>
      </View>

    </View>

    
  )
}

export default UploadDoc

const styles = StyleSheet.create({
    main:{
      flex: 1,
      width: '100%',
      height: '100%', 
      justifyContent: 'space-between',
      alignItems: 'center', 
    }, 
    header:{
      width: '100%',
      height: height*0.1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#FFF',
      elevation: 5, // This will add a box shadow for Android
      shadowColor: "#000",  // this will add a box shadow for IOS
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    contents:{
      width: '100%',
      height: '100%', 
      justifyContent: 'space-around'
    },
    fileContainer:{
      alignItems: 'center',
      // marginBottom: width*0.5, 
    },
    fileView:{
        width: width * 0.95,
        height: height * 0.1,
        backgroundColor :'#fff',
        borderRadius : 10,
        elevation: 5, // This will add a box shadow for Android
        shadowColor: "#000",  // this will add a box shadow for IOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      justifyContent: 'space-between',
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center'
      
    },
    filler:{
      width:width*0.1,
    },
    uploadContainer:{
      alignItems: 'center',
      marginBottom: width*0.2, 
    },
    uploadButton: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        width: width*0.3,
        height: height*0.05,
        backgroundColor: '#0EA68D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedDocument: {
        marginTop: 10,
      },
  })