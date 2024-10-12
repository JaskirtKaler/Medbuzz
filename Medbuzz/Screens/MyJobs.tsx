/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
//import {useJobPostings} from '../API Fetch/JobPostings';

import { mockJobPostings } from '../__mocks__/mockJobsData'; // Importing mock job data

// Define the type for job properties
type JobProps = {
  jobType: string;
  companyName: string;
  jobText: string;
  location: string;
  dateApplied: string;
};

// Function to truncate long descriptions
const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

// Component to display each job
const Job = ({ jobType, companyName, jobText, location, dateApplied }: JobProps) => {
  // Handle long descriptions and empty descriptions
  const descriptionText = jobText ? truncateText(jobText, 100) : "No description available";

  return (
    <View style={styles.jobStyle}>
      <View style={styles.jobHeader}>
        <Text style={styles.jobHeaderText}>{jobType}</Text>
        <View style={styles.locationDateContainer}>
          <Text style={styles.jobHeaderText}>{location}</Text>
          <Text style={styles.dateApplied}>{dateApplied}</Text>
        </View>
      </View>
      <Text style={styles.companyName}>{companyName}</Text>

      {/* Job description with truncation and fallback for empty description */}
      <Text style={styles.jobTextStyle}>{descriptionText}</Text>

      <TouchableOpacity style={styles.detailsButton}>
        <Text style={{ color: 'black' }}>Click for more details</Text>
      </TouchableOpacity>
    </View>
  );
};

// Main component for the Jobs Page
const MyJobsPage: React.FC = () => {
  // State to keep track of the current page for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const jobsPerPage: number = 20; // Number of jobs to display per page
  const scrollViewRef = useRef<ScrollView | null>(null); // Reference to the ScrollView for scrolling back to top on page change

  // Use mock job postings
  const jobsData: JobProps[] = mockJobPostings; // Using mock data from mockJobsData.ts

  // Calculate the total number of jobs and pages
  const totalJobs = jobsData.length; 
  const totalPages = Math.ceil(totalJobs / jobsPerPage); 

  // Get the jobs for the current page
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
        {/* Render the jobs for the current page */}
        {currentJobs.map((job, index) => (
          <Job key={index} {...job} />
        ))}
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
    shadowOpacity: 0.2, // Reduced shadow for subtle effect
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
    backgroundColor: '#FFF', // Changed background color to white
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