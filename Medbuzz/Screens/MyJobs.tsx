/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

type JobProps = {
  jobType: string;
  companyName: string;
  jobText: string;
  location: string;
  dateApplied: string;
};

const Job = ({ jobType, companyName, jobText, location, dateApplied }: JobProps) => (
  <View style={styles.jobStyle}>
    <View style={styles.jobHeader}>
      <Text style={styles.jobHeaderText}>{jobType}</Text>
      <Text style={styles.jobHeaderText}>{location}</Text>
    </View>
    <Text style={styles.companyName}>{companyName}</Text>
    <Text style={styles.jobTextStyle}>{jobText}</Text>
    <Text style={styles.dateApplied}>{dateApplied}</Text>
    <TouchableOpacity style={styles.detailsButton}>
      <Text style={{ color: 'black' }}>Click for more details</Text>
    </TouchableOpacity>
  </View>
);

const MyJobsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const jobsPerPage: number = 20; //jobs per page
  const scrollViewRef = useRef<ScrollView | null>(null);

  // Sample jobs data
  const jobsData: JobProps[] = Array.from({ length: 75 }, (_) => ({
    jobType: 'Job Type',
    companyName: 'Company',
    jobText: 'Some Text about said job',
    location: 'Location',
    dateApplied: 'Date Applied',
  }));

  // Calculate current jobs to display
  const currentJobs: JobProps[] = jobsData.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true }); // Use optional chaining
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef} style={styles.scrollView}>
        {currentJobs.map((job, index) => (
          <Job key={index} {...job} />
        ))}
      </ScrollView>
      {/* Pagination Navigation Bar */}
      <View style={styles.pagination}>
        {[1, 2, 3].map((page) => (
          <TouchableOpacity key={page} onPress={() => handlePageChange(page)} style={styles.pageNumber}>
            <Text style={{ color: currentPage === page ? 'blue' : 'black' }}>{page}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
  jobHeaderText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
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
  dateApplied: {
    color: 'black',
    alignSelf: 'flex-end',
    fontSize: 12,
    marginBottom: 5,
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