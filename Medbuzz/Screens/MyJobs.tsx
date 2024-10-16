/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { mockJobPostings } from '../__mocks__/mockJobsData'; // Importing mock job data


// Define the type for job properties
type JobProps = {
  jobId: string;
  title: string;
  company: {
    name: string;
    location: string;
  };
  description: string;
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
const Job = ({ title, company, description, dateApplied }: JobProps) => {
  const descriptionText = description ? truncateText(description, 100) : "No description available";

  return (
    <View style={styles.jobStyle}>
    <View style={styles.jobHeader}>
      <View>
        <Text style={styles.jobHeaderText}>{title}</Text>
        <Text style={styles.companyName}>{company.name}</Text>
      </View>
      <View style={styles.locationDateContainer}>
        <Text style={styles.jobHeaderText}>{company.location}</Text>
        <Text style={styles.dateApplied}>{dateApplied}</Text>
      </View>
    </View>
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
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFF',
  },
  pageNumber: {
    marginHorizontal: 10,
  },
});

export default MyJobsPage;