/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform, Alert, PermissionsAndroid } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import BackArrow from '../Components/Svg/Backarrow';
import Download from '../Components/Svg/Download';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RNFS from 'react-native-fs'; // Import RNFS for file handling
import Toast from 'react-native-toast-message'; // Import Toast for notifications

const { width, height } = Dimensions.get('window');

// Define props type using NativeStackScreenProps
type UploadDocProps = NativeStackScreenProps<RootStackParamList, 'UploadDoc'>;

const UploadDoc: React.FC<UploadDocProps> = ({ route }) => {
  const navigation = useNavigation<any>(); // Stack Navigation
  const header = route.params.header; // Get the header for the document type
  const [selectedDocument, setSelectedDocument] = useState<DocumentPickerResponse | null>(null);
  const [profile, setProfile] = useState<any>(null); // Profile data from AsyncStorage
  const toastRef = useRef(null);

  // Load profile data when component mounts
  useEffect(() => {
    const loadProfile = async () => {
      const profileData = await AsyncStorage.getItem('userProfile');
      if (profileData) {
        const currentProfile = JSON.parse(profileData);
        // Log the current profile
      console.log('UploadDoc - Profile:', profileData);
        const createDocumentPickerResponse = (uri: string): DocumentPickerResponse => ({
          uri,
          name: uri.split('/').pop() || 'Document',
          fileCopyUri: null,
          type: 'application/pdf',
          size: 0,
        });

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

  // Helper function to get file path
  const getRealPathFromURI = async (uri: string): Promise<string> => {
    if (uri.startsWith('content://')) {
      const newFilePath = `${RNFS.DocumentDirectoryPath}/${uri.split('/').pop()}`;
      await RNFS.copyFile(uri, newFilePath);
      console.log('File copied to: ', newFilePath);
      return newFilePath;
    }
    return uri;
  };

    // Handle document upload
    const handleUpload = async () => {
      try {
        const doc = await DocumentPicker.pickSingle({ type: [DocumentPicker.types.pdf, DocumentPicker.types.images] });
        setSelectedDocument(doc);
        console.log('Uploaded Document:', doc);
        console.log('Document Type:', header);
  
        const profileData = await AsyncStorage.getItem('userProfile');
        const currentProfile = profileData ? JSON.parse(profileData) : { uploadedFiles: {} };
  
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
  
        await AsyncStorage.setItem('userProfile', JSON.stringify(currentProfile));
        setProfile(currentProfile);
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('User cancelled the upload', err);
        } else {
          throw err;
        }
      }
    };

  // Request permissions for Android
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ];
      const granted = await PermissionsAndroid.requestMultiple(permissions);

      if (granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] !== PermissionsAndroid.RESULTS.GRANTED ||
          granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] !== PermissionsAndroid.RESULTS.GRANTED) {
        Toast.show({ type: 'error', text1: 'Permission Denied', text2: 'You need to allow storage permissions.' });
        return false;
      }
    }
    return true;
  };

  // Handle document download
  const handleDownload = async () => {
    if (selectedDocument && selectedDocument.uri) {
      try {
        const filePath = await getRealPathFromURI(selectedDocument.uri);
        const downloadDest = Platform.OS === 'android'
          ? `${RNFS.DownloadDirectoryPath}/${selectedDocument.name}` // Downloads folder on Android
          : `${RNFS.DocumentDirectoryPath}/${selectedDocument.name}`; // Internal storage for iOS

        Toast.show({ type: 'info', text1: 'Download Started', text2: 'Your file is being downloaded...' });

        await RNFS.copyFile(filePath, downloadDest);

        Toast.show({ type: 'success', text1: 'Download Complete', text2: 'File saved to Downloads!' });
        console.log('File downloaded to: ', downloadDest);
      } catch (error) {
        console.error('Error downloading file: ', error);
        Toast.show({ type: 'error', text1: 'Download Failed', text2: 'Error occurred while downloading.' });
      }
    } else {
      Alert.alert('Error', 'No document selected to download.');
    }
  };

  // Handle when back arrow is clicked
  const handleBack = () => {
    navigation.goBack();
    console.log('Back arrow clicked');
  };

  return (
    <View style={styles.main}>
      <View style={{ position: 'absolute', zIndex: 10, width: '100%' }}>
        <Toast />
      </View>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <BackArrow width={40} height={40} color={'#000'} />
        </TouchableOpacity>
        <Text style={{ color: '#000', fontWeight: '500', fontSize: 18 }}>{header}</Text>
        <View style={{ width: 40 }} />
      </View>
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
        <View style={styles.uploadContainer}>
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  contents: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
  },
  fileContainer: { alignItems: 'center' },
  fileView: {
    width: width * 0.95,
    height: height * 0.1,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
