/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import BackArrow from '../Components/Svg/Backarrow';
import Download from '../Components/Svg/Download';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

// Define props type using NativeStackScreenProps
type UploadDocProps = NativeStackScreenProps<RootStackParamList, 'UploadDoc'>;

const UploadDoc: React.FC<UploadDocProps> = ({ route }) => {
  const navigation = useNavigation<any>(); // Stack Navigation
  const header = route.params.header; // Get the header for the document type
  const [selectedDocument, setSelectedDocument] = useState<DocumentPickerResponse | null>(null);
  const [profile, setProfile] = useState<any>(null); // Profile data from AsyncStorage

  // Load profile from AsyncStorage when the component mounts
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem('userProfile');
        if (storedProfile !== null) {
          setProfile(JSON.parse(storedProfile));
          console.log('Profile loaded:', storedProfile);
        } else {
          console.log('No profile found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };
    loadProfile();
  }, []);

  // Handle document upload
  const handleUpload = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({ type: [DocumentPicker.types.pdf, DocumentPicker.types.images] });
      setSelectedDocument(doc); // Save the document path to the state
      console.log('Uploaded Document:', doc);
      console.log('Document Type:', header);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('User cancelled the upload', err);
      } else {
        throw err;
      }
    }
  };

  // Handle document download (for simplicity, a mock download)
  const handleDownload = () => {
    if (!selectedDocument) {
      Alert.alert('Error', 'No document selected to download.');
      return;
    }
    // Simulate download logic
    console.log('Downloading file:', selectedDocument.name);
  };

  // Handle document submission along with profile
  const handleSubmit = async () => {
    if (!profile || !selectedDocument) {
        Alert.alert('Error', 'Please ensure both profile and document are selected.');
        return;
    }

    console.log('Submitting application with profile:', profile);
    console.log('Submitting document:', selectedDocument.name);

    // Simulate submission to backend...
    Alert.alert('Success', 'Application submitted successfully!');
};

  // Handle when back arrow is clicked
  const handleBack = () => {
    navigation.goBack();
    console.log('Back arrow clicked');
  };

  return (
    <View style={styles.main}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <BackArrow width={40} height={40} color={'#000'} />
        </TouchableOpacity>
        <Text style={{ color: '#000', fontWeight: '500', fontSize: 18 }}>{header}</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Contents Section */}
      <View style={styles.contents}>
        {selectedDocument ? (
          <View style={styles.fileContainer}>
            <View style={styles.fileView}>
              <Text>{selectedDocument.name}</Text>
              <TouchableOpacity onPress={handleDownload}>
                <Download width={50} height={50} color={'#000'} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#000' }}> No file selected</Text>
          </View>
        )}

        <View style={styles.filler}></View>
        <View style={styles.uploadContainer}>
          {/* Upload Button */}
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={{ color: '#000' }}>Upload new File</Text>
          </TouchableOpacity>

          {/* Submit Application Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={{ color: '#FFF' }}>Submit Application</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UploadDoc;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    paddingHorizontal: Platform.OS === 'ios' ? '5%' : 0,
    paddingTop: Platform.OS === 'ios' ? '12%' : 0,
    height: Platform.OS === 'ios' ? height * 0.125 : height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  contents: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
  },
  fileContainer: {
    alignItems: 'center',
  },
  fileView: {
    width: width * 0.95,
    height: height * 0.1,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filler: {
    width: width * 0.1,
  },
  uploadContainer: {
    alignItems: 'center',
    marginBottom: width * 0.2,
  },
  uploadButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    width: Platform.OS === 'ios' ? width * 0.35 : width * 0.3,
    height: height * 0.05,
    backgroundColor: '#0EA68D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    width: Platform.OS === 'ios' ? width * 0.4 : width * 0.35,
    height: height * 0.05,
    backgroundColor: '#0EA68D',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
