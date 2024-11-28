/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Dimensions, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loadUsersJobs } from '../API Fetch/LoadUsersJobs';
import { JobPosting } from '../API Fetch/UseJobPostings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const { width, height } = Dimensions.get('window'); // screen max width and height

// properties for Job component
type JobProps = {
  job: any;
  handleMoreDetails: (job: any) => void;
};

function calculateWeeksFromIsoDate(startDate: string, endDate: string): string {
  const millisecondsInOneWeek: number = 7 * 24 * 60 * 60 * 1000;
  const start = new Date(startDate);
  const end = new Date(endDate);

  // For debugging
  // console.log(`start: ${start.getTime()}`);
  // console.log(`end: ${end.getTime()}`);

  const millisecondsBetweenDates: number = end.getTime() - start.getTime();

  // These console logs are for debugging. Uncomment them to use
  // console.log(`Ms: ${millisecondsInOneWeek}`);
  // console.log(`between: ${millisecondsBetweenDates}`);

  const weeks: number = millisecondsBetweenDates / millisecondsInOneWeek;
  // console.log(`Weeks: ${weeks}`); // For debugging

  return weeks <= 0 ? "Flexible" : Math.round(weeks).toString() + " weeks";
}

// Component to display each job
const Job = ({ job, handleMoreDetails }: JobProps) => {
  // These console logs are for debugging
  // console.log(`${job.job_start_date}`);
  // console.log(`${job.job_end_date}`);

  // var date = new Date(); // If having issues, use this for debugging

  return (
    <View style={styles.jobStyle}>
      <View>
        <Text style={{ color: 'black', fontSize: 20, marginLeft: 10 }}>
          {job.position_title}
        </Text>
        <Text style={{ color: 'black', marginLeft: 15, fontSize: 16 }}>
          {job.city}
          {', '}
          {job.state}
        </Text>
      </View>
      <Text style={styles.jobTextStyle}>{job.job_status} | {calculateWeeksFromIsoDate(job.job_start_date, job.job_end_date)}</Text>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => handleMoreDetails(job)}>
        <Text style={{ padding: 5, color: 'black' }}>Click for more details</Text>
      </TouchableOpacity>
    </View>
  );
};

// Main component for the Jobs Page
const MyJobsPage: React.FC = () => {
  const navigation = useNavigation<any>();

  const [profile, setProfile] = useState<any>(null); // State for the user's profile
  const [currentPage, setCurrentPage] = useState<number>(1); // State for current page
  const jobsPerPage: number = 20; // Number of jobs to display per page
  const { jobPostings, isLoading, fetchData, page_count, total_jobs } = loadUsersJobs();
  const [page, setPage] = useState(1); // Initialize page state

  // Calculate the total number of jobs and pages
  const totalJobs = jobPostings.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  // Handle page change and scroll to top
  const handlePageChange = (newPage: number) => {
    // setCurrentPage(page);
    // scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    if (newPage !== page) {
      setPage(newPage);
    }
  };

  // Handle when the user wants to view job details
  const handleJobDetails = (job: JobProps) => {
    if (!profile) {
      Alert.alert('Error', 'No profile data available.');
      return;
    }

    // Navigate to job details screen, passing profile and job details
    navigation.navigate('JobInfo', {
      job,
      profile,
    });
  }; // End handleJobDetails

  // Function to handle navigation and passing job details to the next screen
  const handleMoreDetails = (job: any) => {
    navigation.navigate('JobInfo', { job });
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Function to render pagination buttons
  const renderPagination = () => {
    if (!isLoading) return null;
    const buttons = [];
    const totalPages = page_count;
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          onPress={() => handlePageChange(i)}
          style={i === page ? styles.activePageButton : styles.pageButton}>
          <Text style={i === page ? styles.activePageText : styles.pageText}>
            {i}
          </Text>
        </TouchableOpacity>
      );
    }
    // console.log("renderPagination complete"); // Use this for debugging
    return <View style={styles.paginationContainer}>{buttons}</View>;
  };

  return (
    // use flatlist instead of scrollview as it has built in pagination and header and is more efficient than scroll view.
    <FlatList
      data={jobPostings}

      renderItem={({ item }) => (
        <Job key={item.id} job={item} handleMoreDetails={handleMoreDetails} />
      )}

      keyExtractor={item => item.id}

      ListHeaderComponent={
        <>
          <Text style={styles.jobFeedStyle}>
            Job Feed {`(${totalJobs})`}
          </Text>
        </>
      }

      ListEmptyComponent={
        <View style={styles.noJobsContainer}>
          <Text style={styles.noJobsText}>No jobs available</Text>
        </View>
      }

      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            setPage(1); // Reset page to 1
            fetchData(1); // Fetch data for page 1
          }}
        />
      }

      ListFooterComponent={renderPagination()} // Render pagination buttons
    /> // End FlatList
  ); // End return
}; // End MyJobsPage


// Styles for the component
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
    height: height * (Platform.OS == 'ios' ? 0.125 : 0.1),
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
    paddingTop: Platform.OS === 'ios' ? 60 : 0,
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
    height: Platform.OS == 'ios' ? '80%' : '100%',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  pageButton: {
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  activePageButton: {
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#0EA68D',
    borderRadius: 5,
  },
  pageText: {
    color: 'black',
  },
  activePageText: {
    color: 'white',
  },
  noJobsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  noJobsText: {
    fontSize: 18,
    color: 'grey',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 15 : 0,
    width: '100%',
    backgroundColor: '#FFF',
  },
  pageNumber: {
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 15,
  },
  scrollView: {
    flex: 1,
    marginBottom: 50, // Adjust for pagination bar at the bottom
  }
}); // End styles definition

export default MyJobsPage;