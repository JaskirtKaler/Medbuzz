import {
  Button,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Touchable,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NavigationBar from '../Components/Svg/NavigationBar.tsx';
import {DrawerActions, useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window'); // screen max width and height
import {useJobPostings} from '../API Fetch/UseJobPostings.tsx';
// properties for Job component
type JobProps = {
  job: any;
  handleMoreDetails: (job: any) => void;
};

const Job = ({job, handleMoreDetails}: JobProps) => {
  return (
    <View style={styles.jobStyle}>
      <View>
        <Text style={{color: 'black', fontSize: 20, marginLeft: 10}}>
          {job.position_title}
        </Text>
        <Text style={{color: 'black', marginLeft: 15, fontSize: 16}}>
          {job.city}
          {', '}
          {job.state}
        </Text>
      </View>
      <Text style={styles.jobTextStyle}>{job.requisition_description}</Text>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => handleMoreDetails(job)}>
        <Text style={{padding: 5, color: 'black'}}>Click for more details</Text>
      </TouchableOpacity>
    </View>
  );
};

const Homepage = () => {
  const navigation = useNavigation<any>();

  const {jobPostings, isLoading, fetchData} = useJobPostings();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]); // Initialize as an empty array

  //This creates a new array which has the filtered jobs based on the search criteria
  useEffect(() => {
    //you need this check since without it, once the user refereshes while there is something present in the search bar, it would throw an error
      if (searchQuery.trim() && Array.isArray(jobPostings)) {
        setFilteredJobs(
          jobPostings.filter(
            job =>
              job.position_title
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              job.city.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        );
        
      } else {
        setFilteredJobs(jobPostings); // fallback to jobPostings if searchQuery is empty
      }
    
  }, [searchQuery, jobPostings]);

  // Function to handle navigation and passing job details to the next screen
  const handleMoreDetails = (job: any) => {
    navigation.navigate('JobPosting', {job});
  };

  return (
    <ScrollView
      style={styles.containerStyle}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={fetchData} // Pull-to-refresh functionality
        />
      }>
      <View style={styles.headerStyle}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="gray"
            style={styles.searchStyle}
            value={searchQuery}
            onChangeText={setSearchQuery} // Update the search query state
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <NavigationBar width={35} height={35} color={'#000'} />
        </TouchableOpacity>
      </View>

      <Text style={styles.jobFeedStyle}>Job Feed {'(' + jobPostings.length+ ')'}</Text>

      {/* Map through the filteredJobs array but check if its not uninitialized */}
      <View>
        {Array.isArray(filteredJobs) && filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <Job key={job.id} job={job} handleMoreDetails={handleMoreDetails} />
          ))
        ) : (
          <Text style={{textAlign: 'center', marginTop: 20, color: 'gray'}}>
            No jobs available
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    flex: 1,
  },

  jobFeedStyle: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  jobStyle: {
    backgroundColor: 'white',
    width: '85%',
    height: 200,
    justifyContent: 'space-around',
    //borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 30,
    elevation: 10, // This will add a box shadow for Android
    shadowColor: '#000', // this will add a box shadow for IOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  jobTextStyle: {
    width: '90%',
    height: '30%',
    backgroundColor: '#D9D9D9',
    color: 'black',
    textAlign: 'center',
    alignSelf: 'center',
    padding: 20,
  },

  detailsButton: {
    width: '90%',
    height: '15%',
    backgroundColor: '#0EA68D',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 5,
  },

  headerStyle: {
    width: '100%',
    height: height * 0.1,
    backgroundColor: '#FFF',
    elevation: 5, // This will add a box shadow for Android
    shadowColor: '#000', // this will add a box shadow for IOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
  },

  searchStyle: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 12,
    elevation: 8, // This will add a box shadow for Android
    shadowColor: '#000', // this will add a box shadow for IOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '70%',
  },
});

export default Homepage;
