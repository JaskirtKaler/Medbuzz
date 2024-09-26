/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Define the type for job properties
type JobProps = {
  jobType: string;
  companyName: string;
  jobText: string;
  location: string;
  dateApplied: string;
};

// Component to display each job
const Job = ({ jobType, companyName, jobText, location, dateApplied }: JobProps) => (
  <View style={styles.jobStyle}>
    <View style={styles.jobHeader}>
      <Text style={styles.jobHeaderText}>{jobType}</Text>
      <View style={styles.locationDateContainer}>
        <Text style={styles.jobHeaderText}>{location}</Text>
        <Text style={styles.dateApplied}>{dateApplied}</Text>
      </View>
    </View>
    <Text style={styles.companyName}>{companyName}</Text>
    <Text style={styles.jobTextStyle}>{jobText}</Text>
    <TouchableOpacity style={styles.detailsButton}>
      <Text style={{ color: 'black' }}>Click for more details</Text>
    </TouchableOpacity>
  </View>
);

// Main component for the Jobs Page
const MyJobsPage: React.FC = () => {
  // State to keep track of the current page for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const jobsPerPage: number = 20; // Number of jobs to display per page
  const scrollViewRef = useRef<ScrollView | null>(null); // Reference to the ScrollView for scrolling back to top on page change

  // Sample jobs data, replace with data fetched from ATS API
  const jobsData: JobProps[] = Array.from({ length: 75 }, (_) => ({
    jobType: 'Job Type',
    companyName: 'Company',
    jobText: 'Some Text about said job',
    location: 'Location',
    dateApplied: 'Date Applied',
  }));

  // Calculate the current set of jobs to display based on the page number
  const currentJobs: JobProps[] = jobsData.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  // Function to handle page change and scroll to the top
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={styles.container}>
      {/* Job Listings */}
      <ScrollView ref={scrollViewRef} style={styles.scrollView}>
        {/* This is where the job types are rendered */}
        {/* Replace this with the API call to fetch jobs from ATS and map over the data */}
        {currentJobs.map((job, index) => (
          <Job key={index} {...job} />
        ))}
      </ScrollView>

      {/* Pagination Navigation Bar */}
      <View style={styles.pagination}>
        {/* Dynamically create pagination buttons */}
        {[1, 2, 3].map((page) => (
          <TouchableOpacity key={page} onPress={() => handlePageChange(page)} style={styles.pageNumber}>
            {/* Highlight the current page in blue */}
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
    width: '85%',
    alignSelf: 'center',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 3.84,
    elevation: 5,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationDateContainer: {
    flexDirection: 'column', // Stack 'Location' and 'Date Applied' vertically
    alignItems: 'flex-end',  // Align to the right
  },
  jobHeaderText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateApplied: {
    color: 'black',
    fontSize: 12,
    marginTop: 5,
  },
  companyName: {
    color: 'black',
    marginVertical: 5,
    fontSize: 16,
  },
  jobTextStyle: {
    color: 'black',
    backgroundColor: '#D9D9D9',
    padding: 25,
    textAlign: 'center',
    marginVertical: 5,
  },
  detailsButton: {
    backgroundColor: '#0EA68D',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFF',
  },
  pageNumber: {
    marginHorizontal: 10,
  },
});

export default MyJobsPage;
