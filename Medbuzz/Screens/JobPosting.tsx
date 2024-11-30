import {
  Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import {useState} from 'react';
import Backarrow from '../Components/Svg/Backarrow';
import {
  NavigationProp,
  useNavigation,
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import CalendarTime from '../Components/Svg/CalendarTime';
import CalendarSuccess from '../Components/Svg/CalendarSuccess';
import CheckBox from '@react-native-community/checkbox';
import CancelX from '../Components/Svg/CancelX.tsx';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import StateLocation from '../Components/Svg/Statelocation.tsx';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');
const JobPosting = () => {
  const testDate = new Date().toLocaleDateString('en-US');
  const route = useRoute<RouteProp<{params: {job: any}}, 'params'>>();
  const {job} = route.params;
  //console.log('Job data passed to JobPosting page:', job.job_start_date, job.pay_rates.pay_rate, job.state);
  //console.log('job id: ' + job.id);

  const navigation = useNavigation<NavigationProp<any>>();

  const [applyModalVisible, setApplyModalVisible] = useState(false); // State for edit Modal

  const [sendResumeSelected, setSendResumeSelection] = useState(false); // State for checkbox regarding resume for application
  const [sendLicensesSelected, setSendLicensesSelection] = useState(false); // State for checkbox regarding licenses for application
  const [sendDegreeSelected, setSendDegreeSelection] = useState(false); // State for checkbox regarding degree for application
  const [sendCertificationsSelected, setSendCertificationsSelection] = useState(false); // State for checkbox regarding certifications for application
  const [sendReferencesSelected, setSendReferencesSelection] = useState(false); // State for checkbox regarding references for application
  const [sendVaccinationSelected, setSendVaccinationSelection] = useState(false); // State for checkbox regarding vaccination for application

  /*
       webViewScaleFactor is the scale factor for the height of the webView (job description) container. It is multiplied by the height
       returned by the webView message in the style prop of the webView element. It was detemined by trial and error. After some research 
       it seems like this is necessary due to a few possible factors: pixel density differences between webView CSS and device pixel 
       height, viewport scaling, webView default CSS styling, or Foint size scaling. Not sure which, but currently functions as desired.
    */
  const webViewScaleFactor = 0.4;

  const [jobDescContainerHeight, setJobDescContainerHeight] = useState(0); // State for the webView job description container height

  // This funtion is called when there is a webViewMessageEvent. Data holds the message sent to the app from webView
  // which will be the jobDescription's height
  const webViewMessageEvent = (event: WebViewMessageEvent) => {
    const {data} = event.nativeEvent;
    const newHeight = parseInt(data);

    // if the height is greater than 0 set the jobDescContainerHeight to the newHeight
    if (newHeight > 0) {
      console.log('Calculated Heigh: ' + newHeight);
      setJobDescContainerHeight(newHeight);
    }
  };

  // injectedJavascript gets the job description's height and sends it to the app using postMessage
  const injectedJavaScript = `
        setTimeout(() => {
            const height = document.documentElement.scrollHeight || document.body.scrollHeight;
            window.ReactNativeWebView.postMessage(height);
        }, 100);
        true;
        `;

  const handleBack = () => {
    navigation.goBack();
  };

  // Show modal when user clicks the "Apply" button
  const onApplyPress = () => {
    setApplyModalVisible(!applyModalVisible);
  };

  // If user cancels their Application ensure all checkboxes reset to unchecked
  const onCancelPress = () => {
    setSendResumeSelection(false);
    setSendLicensesSelection(false);
    setSendDegreeSelection(false);
    setSendCertificationsSelection(false);
    setSendReferencesSelection(false);
    setSendVaccinationSelection(false);
  };

  // If the user confirms the application ensure that all checked files exist. If they
  // don't log it in console. If they do inform the user they've been sent. Reset checkboxes
  // to unchecked and display an alert if their application was successful or not, close the modal
  const onConfirmPress = async () => {
    let alertTitle = 'Congratulations!';
    let alertMessage = 'Your application has been sent.';

    let alertIssueTitle = 'Something Went Wrong.';
    let alertIssueMessage = 'One or more of your files does not exist.';

    let alertNoFileMessage = 'No files selected. Please select one or more files to apply.';

    let problems = false;

    let filesSelected = sendResumeSelected || sendLicensesSelected || sendDegreeSelected ||
          sendCertificationsSelected || sendReferencesSelected || sendVaccinationSelected;

    // attempt to retrieve the User Object from AsyncStorage, push an applyJob object, and save 
    try {
      const savedUserObject = await AsyncStorage.getItem('userProfile');

      // if there is data in saveLocationInfo parse it and set useState variables accordingly
      if (savedUserObject !== null) {

        console.log("User data successfully loaded!");

        // set parsedUserObject equal to the parsed savedUserObject from AsyncStorage 
        const parsedUserObject = JSON.parse(savedUserObject);

        // If one or more files was selected check to ensure they have been uploaded
        if(filesSelected) {

          // Check resume
          if(sendResumeSelected) {
            if(parsedUserObject.uploadedFiles.resume)
                console.log("File exists. Resume sent.");
            else {
              console.log("File does not exist.");
              problems = true;
            } 
            setSendResumeSelection(false)
          }
  
          // Check Licenses
          if (sendLicensesSelected) {
            if(parsedUserObject.uploadedFiles.license.licenseFile)
              console.log("File exists. License sent.");
            else {
              console.log("File does not exist.");
              problems = true;
            }  
            setSendLicensesSelection(false);
          }
  
          // Check Degree
          if(sendDegreeSelected) {
            if(parsedUserObject.uploadedFiles.degree)
              console.log("File exists. Degree sent.");
            else {
              console.log("File does not exist.");
              problems = true;
            } 
            setSendDegreeSelection(false)
          }
  
          // Check Certifications
          if(sendCertificationsSelected) {
            if(parsedUserObject.uploadedFiles.certifications)
              console.log("File exists. Certifications sent.");
            else {
              console.log("File does not exist.");
              problems = true;
            } 
            setSendCertificationsSelection(false)
          }
  
          // Check References
          if(sendReferencesSelected) {
            if(parsedUserObject.uploadedFiles.references)
              console.log("File exists. References sent.");
            else {
              console.log("File does not exist.");
              problems = true;
            } 
            setSendReferencesSelection(false)
          }
  
          // Check Vaccinations
          if(sendVaccinationSelected) {
            if(parsedUserObject.uploadedFiles.vaccination)
              console.log("File exists. Vaccinations sent.");
            else {
              console.log("File does not exist.");
              problems = true;
            } 
  
            setSendVaccinationSelection(false)
          }
        } else {
          problems = true;
        }

        // If there were no problems checking the files and they exist...
        if(!problems) {
          // check to ensure that parsedUserObject.myJobs and parsedUserObject.myJobs.appliedJobs have been defined
          // If they haven't, define them
          if (!parsedUserObject.myJobs) {
            console.log("myJobs is null")  //TEST
            parsedUserObject.myJobs = { appliedJobs: [] };

          } else if (!parsedUserObject.myJobs.appliedJobs) {
            console.log("appliedJobs is null");  //TEST
            parsedUserObject.myJobs.appliedJobs = [];
          }

          // ensure user has not already applied to the job. If they have, inform them and return from the function immediately
          for (let i = 0; i < parsedUserObject.myJobs.appliedJobs.length; i++) {
            if(job.id === parsedUserObject.myJobs.appliedJobs[i].jobID) {
              Alert.alert("Already applied", "It looks like you have already applied to this job", [ 
                {
                  text: 'OK',
                  onPress: () => console.log('OK Pressed'),
                }
              ]);

              return
            }
          }

          // create applyObject to contain the job id and the date the user applied.
          let applyObject = {
            jobID: job.id,
            dateApplied: new Date().toLocaleDateString('en-US'),
          };

          // push the new applyObject to the parsedUserObject.myJobs.appliedJobs array
          parsedUserObject.myJobs.appliedJobs.push(applyObject);
          console.log("job id from job object: " + job.id);  //TEST
          console.log(parsedUserObject);   //TEST

          console.log(parsedUserObject.myJobs.appliedJobs);  //TEST

          //TEST
          for(let i = 0; i < parsedUserObject.myJobs.appliedJobs.length; i++) {
            console.log(parsedUserObject.myJobs.appliedJobs[i].jobID);
            console.log(parsedUserObject.myJobs.appliedJobs[i].dateApplied);
          }
          
          // save the user object back to AsyncStorage
          await AsyncStorage.setItem(
            'userProfile',
            JSON.stringify(parsedUserObject),
          );
        }

      } else {
        console.log("No user profile info found. Please create a profile.");
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    };
    
    // If there were problems (No files selected, files don't exist) set the alert title and message accordingly
    if(problems) {
      if(!filesSelected) {
        alertTitle = alertIssueTitle;
        alertMessage = alertNoFileMessage;
      } else {
        alertTitle = alertIssueTitle;
        alertMessage = alertIssueMessage;
      }
    }

    

    // display the alert
    Alert.alert(alertTitle, alertMessage, [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed'),
      },
    ]);

    // close the modal
    setApplyModalVisible(!applyModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Modal for Application */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={applyModalVisible}
        onRequestClose={() => {
          setApplyModalVisible;
        }}
        >
        <View style={{flex: 1}}>
          <View style={styles.applyModalStyle}>
            <View style={{flexDirection: 'row', margin: 10}}>
              {/* Modal Header */}
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                Select files to include in application
              </Text>

              {/* Cancel Button */}
              <TouchableOpacity
                style={styles.cancelModalButton}
                onPress={() => {
                  onCancelPress(), setApplyModalVisible(!applyModalVisible);
                }}>
                <CancelX width={15} height={15} color={'#000'}></CancelX>
              </TouchableOpacity>
            </View>
            <View style={{marginLeft: 10}}>
              {/* Checkboxes */}
              <View style={{flexDirection: 'row'}}>
                {/* Resume */}
                <CheckBox
                  value={sendResumeSelected}
                  onValueChange={setSendResumeSelection}
                />
                <Text style={styles.checkBoxTextStyle}>Resume</Text>
              </View>

              {/* Licenses */}
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  value={sendLicensesSelected}
                  onValueChange={setSendLicensesSelection}
                />
                <Text style={styles.checkBoxTextStyle}>Licenses</Text>
              </View>

              {/* Degree */}
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  value={sendDegreeSelected}
                  onValueChange={setSendDegreeSelection}
                />
                <Text style={styles.checkBoxTextStyle}>Degree</Text>
              </View>

              {/* Certifications */}
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  value={sendCertificationsSelected}
                  onValueChange={setSendCertificationsSelection}
                />
                <Text style={styles.checkBoxTextStyle}>Certifications</Text>
              </View>

              {/* References */}
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  value={sendReferencesSelected}
                  onValueChange={setSendReferencesSelection}
                />
                <Text style={styles.checkBoxTextStyle}>References</Text>
              </View>

              {/* Vaccination */}
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  value={sendVaccinationSelected}
                  onValueChange={setSendVaccinationSelection}
                />
                <Text style={styles.checkBoxTextStyle}>Vaccination</Text>
              </View>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              {/* Confirm Choices Button */}
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  onConfirmPress();
                }}>
                <Text
                  style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                  Confirm Choices
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Header */}
      <View style={styles.header}>
        {/* Back Arrow */}
        <TouchableOpacity onPress={handleBack}>
          <Backarrow
            width={40}
            height={40}
            stroke={'black'}
            strokeWidth={1}
            color={'black'}
          />
        </TouchableOpacity>
        {/* Job Title */}
        <View
          style={{
            width: '85%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.headerTitle}>{job.position_title || 'NA'}</Text>
          {/*<View style={{width: width * 0.1, height: height * .05}} />*/}
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {/* Space Gap */}
        <View style={{width: '100%', height: 20}}></View>

        {/* Overview Title */}
        <View style={styles.overviewHeader}>
          <Text style={styles.overviewHeaderText}>Overview</Text>
        </View>
        {/* Overview */}
        <View style={styles.overviewContainer}>
          {/* Space Gap */}
          <View style={{width: '100%', height: 20}}></View>
          {/* Job Title */}
          <View>
            <Text style={styles.upperRowItemTitle}>Job Title</Text>
            <Text style={styles.upperRowItemBody}>
              {job.position_title || 'Title unavailable'}
            </Text>
          </View>
          {/* Space Gap */}
          <View style={{width: '100%', height: 20}}></View>
          {/* Location */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <StateLocation></StateLocation>
            <View>
              <Text style={styles.upperRowItemTitle}>Location</Text>
              <Text style={styles.upperRowItemBody}>
                {job.city + ', ' + job.state || 'Location unavailable'}
              </Text>
            </View>
          </View>
          {/* Space Gap */}
          <View style={{width: '100%', height: 20}}></View>
          <View style={styles.overviewDates}>
            {/* Start Date */}
            <View style={styles.overviewDatesBlock}>
              <CalendarTime />
              <View style={styles.overviewDatesText}>
                <Text style={styles.iconTextUpper}>Start Date</Text>
                <Text style={styles.iconTextLower}>
                  {job.job_start_date || 'NA'}
                </Text>
              </View>
            </View>
            {/* End Date */}
            <View style={styles.overviewDatesBlock}>
              <CalendarSuccess />
              <View style={styles.overviewDatesText}>
                <Text style={styles.iconTextUpper}>End Date</Text>
                <Text style={styles.iconTextLower}>
                  {job.job_end_date || 'NA'}
                </Text>
              </View>
            </View>
          </View>
          {/* Space Gap */}
          <View style={{width: '100%', height: 20}}></View>
          <View>
            <Text style={styles.upperRowItemTitle}>Closing Date</Text>
            <Text style={styles.upperRowItemBody}>
              {job.closing_date || 'NA'}
            </Text>
          </View>
          {/* Space Gap */}
          <View style={{width: '100%', height: 20}}></View>
          {/* Pay */}
          <View>
            <Text style={styles.overviewHeaderText}>Pay</Text>
          </View>
          <View style={styles.payContainer}>
            {/* Pay Body Container */}
            <View style={styles.payLeftItem}>
              <Text style={styles.payLowerText}>
                {job.pay_rates.pay_rate_currency || 'NA'}
              </Text>
            </View>
            <View style={styles.payRightItem}>
              <Text style={styles.payRangeText}>
                {job.pay_rates.pay_rate || 'NA'}
              </Text>
            </View>
          </View>
        </View>

        {/* Space Gap */}
        <View style={{width: '100%', height: 20}}></View>

        {/* Description Container */}
        <View>
          <Text style={styles.overviewHeaderText}>Description</Text>
          <View style={styles.descriptionBody}>
            {/* If public_job-desc is not null display the description, otherwise display "No description provided" */}
            {job.public_job_desc ? (
              <WebView
                originWhitelist={['*']}
                source={{html: job.public_job_desc}}
                scrollEnabled={false}
                injectedJavaScript={injectedJavaScript}
                onMessage={webViewMessageEvent}
                style={{
                  height: jobDescContainerHeight * webViewScaleFactor,
                  width: '100%',
                  color: 'black',
                }}
              />
            ) : (
              <Text>No description provided.</Text>
            )}
          </View>
        </View>

        {/* Space Gap */}
        <View style={{width: '100%', height: 20}}></View>
        {/* Date Posted and Date last modified */}
        <View style={styles.upperRow}>
          {/* Date Posted */}
          <View style={styles.upperRowItem}>
            <Text style={styles.upperRowItemTitle}>Date Posted</Text>
            <Text style={styles.upperRowItemBody}>{job.created || 'NA'}</Text>
          </View>
          {/* Modified Date */}
          <View style={styles.upperRowItem}>
            <Text style={styles.upperRowItemTitle}>Last Modified</Text>
            <Text style={styles.upperRowItemBody}>{job.modified || 'NA'}</Text>
          </View>
        </View>

        {/* Space Gap */}
        <View style={{width: '100%', height: 20}}></View>

        {/* Apply Button */}
        <TouchableOpacity style={styles.buttonContainer} onPress={onApplyPress}>
          <Text
            style={{
              justifyContent: 'center',
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Apply
          </Text>
        </TouchableOpacity>

        {/* Space Gap */}
        <View style={{width: '100%', height: height * 0.1}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: '2%',
    width: width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: height * 0.075,
    backgroundColor: '#FFF',
    elevation: Platform.OS === 'android' ? 5 : 0, // Use elevation only on Android
    shadowColor: '#000', // this will add a box shadow for IOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerTitle: {
    display: 'flex',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
  container: {
    backgroundColor: 'white',
    width: width,
    height: height,
    flex: 1,
    flexGrow: 1,
  },
  scrollContainer: {
    display: 'flex',
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: '3%',
  },
  upperRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    paddingTop: '2%',
    alignItems: 'flex-start',
  },
  upperRowItem: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  upperRowItemTitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  upperRowItemBody: {
    fontSize: 16,
    color: 'black',
  },
  middleRow: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  overviewHeader: {},
  overviewHeaderText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  overviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    //height: height * 0.25,
  },
  overviewDates: {
    display: 'flex',
    flexDirection: 'row',
    gap: width * 0.05,
  },
  overviewDatesBlock: {
    display: 'flex',
    flexDirection: 'row',
  },
  overviewDatesText: {
    paddingLeft: width * 0.02,
  },
  overviewDuration: {
    display: 'flex',
    flexDirection: 'row',
  },
  overviewExperience: {
    display: 'flex',
    flexDirection: 'row',
  },
  iconTextUpper: {
    color: 'black',
  },
  iconTextLower: {
    color: 'black',
    fontWeight: 'bold',
  },
  payContainer: {
    maxWidth: width * 0.6,
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#C9C9C9',
    borderRadius: 9,
  },
  payLeftItem: {
    paddingLeft: width * 0.02,
    paddingTop: '1%',
    paddingBottom: '2%',
  },
  payRightItem: {
    paddingLeft: width * 0.075,
    justifyContent: 'center',
  },
  payUpperText: {
    color: '#A1A1A1',
    fontSize: 12,
  },
  payLowerText: {
    color: '#2CAC5F',
    fontSize: 20,
    fontWeight: 'bold',
  },
  payRangeText: {
    color: '#2CAC5F',
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionBody: {
    paddingTop: '1%',
    paddingBottom: '2%',
    paddingHorizontal: '2%',
    borderWidth: 1,
    borderColor: '#C9C9C9',
    borderRadius: 9,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#0EA68D',
    height: 50,
    width: 320,
    borderRadius: 6,
    elevation: Platform.OS === 'android' ? 5 : 0,
    shadowColor: '#000', // this will add a box shadow for IOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderColor: 'black',
    borderWidth: 0.5,
  },

  button: {
    color: '#0EA68D',
    backgroundColor: '#FFF',
    elevation: 5, // This will add a box shadow for Android
    shadowColor: '#000', // this will add a box shadow for IOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  applyModalStyle: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: Platform.OS === 'android' ? width * 0.075 : width * 0.05,
    marginVertical: Platform.OS === 'android' ? height * 0.28 : height * 0.32,
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1.5,
    elevation: Platform.OS === 'android' ? 5 : 0,
    shadowColor: '#000', // this will add a box shadow for IOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  cancelModalButton: {
    flex: 1,
    marginRight: 2,
    marginTop: 2,
    alignItems: 'flex-end',
    alignSelf: 'center',
  },

  checkBoxTextStyle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },

  confirmButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#0EA68D',
    height: 40,
    width: 250,
    borderRadius: 6,
    margin: 22,
  },
});

export default JobPosting;
