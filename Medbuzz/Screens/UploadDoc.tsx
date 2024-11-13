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

  // Load profile data when component mounts
  useEffect(() => {
    const loadProfile = async () => {
      const profileData = await AsyncStorage.getItem('profile');
      if (profileData) {
        const currentProfile = JSON.parse(profileData);
  
        // Helper function to create a minimal DocumentPickerResponse
        const createDocumentPickerResponse = (uri: string): DocumentPickerResponse => ({
          uri,
          name: uri.split('/').pop() || 'Document', // Extract name from URI or use a placeholder
          fileCopyUri: null,
          type: 'application/pdf', // Set a default type, adjust if needed
          size: 0, // Default to 0, if you don't have the size info
        });
  
        // Check if the document is already uploaded for the current header type
        switch (header) {
          case 'Resume':
            setSelectedDocument(
              currentProfile.uploadedFiles?.resume
                ? createDocumentPickerResponse(currentProfile.uploadedFiles.resume)
                : null
            );
            break;
          case 'License':
            setSelectedDocument(
              currentProfile.uploadedFiles?.license?.licenseFile
                ? createDocumentPickerResponse(currentProfile.uploadedFiles.license.licenseFile)
                : null
            );
            break;
          case 'Degree':
            setSelectedDocument(
              currentProfile.uploadedFiles?.degree
                ? createDocumentPickerResponse(currentProfile.uploadedFiles.degree)
                : null
            );
            break;
          case 'Certifications':
            setSelectedDocument(
              currentProfile.uploadedFiles?.certifications
                ? createDocumentPickerResponse(currentProfile.uploadedFiles.certifications)
                : null
            );
            break;
          case 'References':
            setSelectedDocument(
              currentProfile.uploadedFiles?.references
                ? createDocumentPickerResponse(currentProfile.uploadedFiles.references)
                : null
            );
            break;
          case 'Vaccination':
            setSelectedDocument(
              currentProfile.uploadedFiles?.vaccination
                ? createDocumentPickerResponse(currentProfile.uploadedFiles.vaccination)
                : null
            );
            break;
          default:
            break;
        }
  
        setProfile(currentProfile); // Update the profile state
      }
    };
  
    loadProfile();
  }, [header]);
  
  // Handle document upload
  const handleUpload = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({ type: [DocumentPicker.types.pdf, DocumentPicker.types.images,
        'public.image', // Specifically for iOS to recognize images
        'public.item',   // Generic file type for iOS compatibility
      ] });
      setSelectedDocument(doc); // Save the document path to the state
      console.log('Uploaded Document:', doc);
      console.log('Document Type:', header);
      // Load the existing profile data from AsyncStorage
    const profileData = await AsyncStorage.getItem('profile');
    const currentProfile = profileData ? JSON.parse(profileData) : { uploadedFiles: {} };
    // Ensure the uploadedFiles structure exists
    currentProfile.uploadedFiles = currentProfile.uploadedFiles || {};
    currentProfile.uploadedFiles.license = currentProfile.uploadedFiles.license || {};
    // Save the document path in the relevant field based on the `header`
    switch (header) {
      case 'Resume':
        currentProfile.uploadedFiles.resume = doc.uri;
        break;
      case 'License':
        currentProfile.uploadedFiles.license.licenseFile = doc.uri;
        break;
      case 'Degree':
        currentProfile.uploadedFiles.degree = doc.uri;
        break;
      case 'Certifications':
        currentProfile.uploadedFiles.certifications = doc.uri;
        break;
      case 'References':
        currentProfile.uploadedFiles.references = doc.uri;
        break;
      case 'Vaccination':
        currentProfile.uploadedFiles.vaccination = doc.uri;
        break;
      default:
        console.log('Unknown document type');
        return;
    }

    // Save the updated profile data back to AsyncStorage
    await AsyncStorage.setItem('profile', JSON.stringify(currentProfile));
    setProfile(currentProfile); // Update the profile state if needed
    console.log('Render object container?')
    console.log(currentProfile.uploadedFiles.resume);
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
});
