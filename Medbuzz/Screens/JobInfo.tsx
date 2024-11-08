import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
  import {useState, useEffect} from 'react';
  import Backarrow from '../Components/Svg/Backarrow';
  import {NavigationProp, useNavigation, RouteProp, useRoute} from '@react-navigation/native';
  import CalendarTime from '../Components/Svg/CalendarTime';
  import CalendarSuccess from '../Components/Svg/CalendarSuccess';
  import {WebView, WebViewMessageEvent} from 'react-native-webview';
  import StateLocation from '../Components/Svg/Statelocation.tsx';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  const {width, height} = Dimensions.get('window');
  const JobInfo = () => {

    const route = useRoute<RouteProp<{params: {job: any}}, 'params'>>();
    const {job} = route.params;

    // call when page is loaded
  useEffect(() => {

    // get saved user object from local storage
    const getUserObject = async () => {
      try {

        // attempt to get user object from storage
        const savedUserObject = await AsyncStorage.getItem('userProfile');

        // if the iser object exists, parse it
        if (savedUserObject !== null) {
          console.log("User Object successfully retrieved.")
          const parsedUserObject = JSON.parse(savedUserObject); 

          // parsedUserObject.myJobs is null, create an empty appliedJobs array
          if (!parsedUserObject.myJobs) {
            console.log("myJobs is null")  //TEST
            parsedUserObject.myJobs = { appliedJobs: [] };

            // if parsedUserObject.myJobs.appliedJobs is null, create an empty array
          } else if (!parsedUserObject.myJobs.appliedJobs) {
            console.log("appliedJobs is null");  //TEST
            parsedUserObject.myJobs.appliedJobs = [];
          }

          // loop through the user's appliedJobs array to find the relevant jobID, if it exists
          for(let i = 0; i < parsedUserObject.myJobs.appliedJobs.length; i++) {

            // if found, set the the apply date of the job, the job length, and break from the loop
            if(job.id === parsedUserObject.myJobs.appliedJobs[i].jobID) {
              setApplyDate(parsedUserObject.myJobs.appliedJobs[i].dateApplied)
              setJobLength(calculateWeeks());
              console.log("Job Length: " + jobLength );         // Test
              console.log("Apply Date found: " + applyDate);    // Test
              break;
            } 
          }

        } else {
          console.log("No user object info found on local storage.");
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    getUserObject();
  }, []);

    const [applyDate, setApplyDate] = useState('');     // useState for applyDate found in user object
    const [jobLength, setJobLength] = useState('');     // useState for job length based on start date and end date found in the job object

    const testDate = new Date().toLocaleDateString('en-US');
    
    //console.log('Job data passed to JobPosting page:', job.job_start_date, job.pay_rates.pay_rate, job.state);
    //console.log('job id: ' + job.id);
  
    const navigation = useNavigation<NavigationProp<any>>();

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

    // calculate the job length (in number of weeks)
    const calculateWeeks = () => {

      // calculate the number of milliseconds in a week (JS Date objects are measured by miliseconds)
      const minute = 1000 * 60;
      const hour = minute * 60;
      const day = hour * 24;
      const week = day * 7;

      // if there is a start and an end date calculate the difference in weeks
      if(job.job_start_date && job.job_end_date) {

        // create "new" date objects based on the start and end date strings in the job object
        const startDate = new Date(job.job_start_date);
        const endDate = new Date(job.job_end_date);

        // using getTime(), which converts a Date object to miliseconds, find the difference between the
        // end date and the start date, divide it by a week (in miliseconds), round it to the nearest
        // whole number, then convert it to a string.
        return Math.round(((endDate.getTime() - startDate.getTime()) / week)).toString() + " weeks";
      } 

      // if there is not a start date or an end date in the job object, simply return "flexible"
      return "Flexible"
    }
  
    return (
      <SafeAreaView style={styles.container}>
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
            <View style={styles.overviewDates}>
              {/* Closing Date */}
              <View>
                <Text style={styles.upperRowItemTitle}>Closing Date</Text>
                <Text style={styles.upperRowItemBody}>
                  {job.closing_date || 'NA'}
                </Text>
              </View>
              {/* Job Status */}
              <View>
                <Text style={styles.upperRowItemTitle}>Job Status</Text>
                <Text style={styles.upperRowItemBody}>
                  {job.job_status || 'NA'}
                </Text>
              </View>
            </View>
            {/* Space Gap */}
            <View style={{width: '100%', height: 20}}></View>
            <View style={styles.overviewDates} >
              {/* Job Length */}
              <View>
                <Text style={styles.upperRowItemTitle}>Job Length</Text>
                <Text style={styles.upperRowItemBody}>
                  {jobLength || 'NA'}
                </Text>
              </View>
              {/* Date Applied */}
              <View>
                <Text style={styles.upperRowItemTitle}>Date Applied</Text>
                <Text style={styles.upperRowItemBody}>
                  {applyDate ? applyDate : 'NA'}
                </Text>
              </View>
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
      elevation: 5, // This will add a box shadow for Android
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
      elevation: 5, // This will add a box shadow for Android
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
  });
  
  export default JobInfo;
  