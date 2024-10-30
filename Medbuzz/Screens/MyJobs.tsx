/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loadUsersJobs } from '../API Fetch/LoadUsersJobs';
import { JobPosting } from '../API Fetch/UseJobPostings';

// Function to truncate long descriptions
const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

// properties for Job component
type JobProps = {
  job: any;
  handleMoreDetails: (job: any) => void;
};

// Component to display each job
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
      <Text style={styles.jobTextStyle}>{job.job_status}</Text>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => handleMoreDetails(job)}>
        <Text style={{padding: 5, color: 'black'}}>Click for more details</Text>
      </TouchableOpacity>
    </View>
  );
};

// Main component for the Jobs Page
const MyJobsPage: React.FC = () => {
  const navigation = useNavigation<any>();
  const navigation = useNavigation<any>();  // Fixed error
  const [profile, setProfile] = useState<any>(null); // State for the user's profile
  const [currentPage, setCurrentPage] = useState<number>(1); // State for current page
  const jobsPerPage: number = 20; // Number of jobs to display per page
  const scrollViewRef = useRef<ScrollView | null>(null); // Reference for ScrollView
  const {jobPostings, isLoading, fetchData} = loadUsersJobs();
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]); // Initialize as an empty array

  // Use mock job postings
  // const jobsData: JobPosting[] = Array.isArray(jobPostings) ? jobPostings : Object.values(jobPostings || {});
  const jobsData: JobPosting[] = jobPostings;
  console.log(`length: ${jobsData.length}`);

  // Calculate the total number of jobs and pages
  const totalJobs = jobPostings.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  // Get jobs for the current page
  const currentJobs: JobProps[] = jobsData.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  // Load profile from AsyncStorage when the component mounts
  useEffect(() => {
    const loadProfile = async () => {
        try {
            const storedProfile = await AsyncStorage.getItem('userProfile');
            if (storedProfile !== null) {
                setProfile(JSON.parse(storedProfile)); // Load the stored profile
                console.log('Profile loaded from local storage');
            } else {
                console.log('No profile found in AsyncStorage.');
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    };
    loadProfile(); // Load the profile when the component mounts
}, []);


  // Handle page change and scroll to top
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
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
  };

  // Function to handle navigation and passing job details to the next screen
  const handleMoreDetails = (job: any) => {
    navigation.navigate('JobInfo', {job});
  };

  useEffect(() => {
    if (Array.isArray(jobPostings)) {
      // userJobs(jobPostings);
    }
  });
  
  return (
    <View style={styles.container}>
      {/* Job Listings */}
      <ScrollView ref={scrollViewRef} style={styles.scrollView}>
        {/* Render the jobs for the current page */}
        {Array.isArray(jobsData) && jobsData.length > 0 ? (
        jobsData.map((job, index) => (
          <Job key={job.id} job={job} handleMoreDetails={handleMoreDetails}/>
        )))
        : (
            <Text style={{textAlign: 'center', marginTop: 20, color: 'gray'}}>
            No jobs available
            </Text>
          )
        }
      </ScrollView>

      {/* Pagination Navigation Bar */}
    <View style={styles.pagination}>
    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
    <TouchableOpacity 
      key={page} 
      onPress={() => handlePageChange(page)} 
      style={styles.pageNumber}
      accessible={true} // Mark as accessible
      accessibilityRole="button" // Explicitly set the role to button
    >
      <Text style={{ color: currentPage === page ? 'blue' : 'black' }}>{page}</Text>
    </TouchableOpacity>
  ))}
</View>
    </View>
  );
};


// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 15,
  },
  scrollView: {
    flex: 1,
    marginBottom: 50, // Adjust for pagination bar at the bottom
  },
  jobStyle: {
    backgroundColor: 'white',
    width: '90%', // Increase width slightly
    alignSelf: 'center',
    marginBottom: 15, // Reduce gap between jobs
    padding: 12, // Adjust padding for better alignment
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5, // Reduced gap between title and company
  },
  locationDateContainer: {
    flexDirection: 'column', // Stack location and date vertically
    alignItems: 'flex-end',  // Align to the right
  },
  jobHeaderText: {
    color: 'black',
    fontSize: 16, // Slightly reduce font size for consistency
    fontWeight: 'bold',
  },
  dateApplied: {
    color: 'black',
    fontSize: 12,
    marginTop: 2, // Add slight margin between location and date
  },
  companyName: {
    color: 'black',
    marginVertical: 1, // Reduced margin for closer alignment with job title
    fontSize: 14, // Slightly smaller font for company name
  },
  jobTextStyle: {
    color: 'black',
    backgroundColor: '#FFF', // Light grey background like the job description in the feed
    padding: 15, // Reduce padding to match other card designs
    textAlign: 'center',
    marginVertical: 5,
  },
  detailsButton: {
    backgroundColor: '#0EA68D',
    borderRadius: 10,
    paddingVertical: 6, // Slightly smaller padding for better fit
    alignItems: 'center',
    marginTop: 8,
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
});

export default MyJobsPage;