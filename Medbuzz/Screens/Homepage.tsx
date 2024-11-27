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
  Platform,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NavigationBar from '../Components/Svg/NavigationBar.tsx';
import {DrawerActions, useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window'); // screen max width and height
import {useJobPostings} from '../API Fetch/UseJobPostings.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

// properties for Job component
type JobProps = {
  job: any;
  handleMoreDetails: (job: any) => void;
};

//copied richard's code from myjobs page to calculate weeks
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

  return weeks <= 0
    ? 'Time Frame: Flexible'
    : `Time Frame: ${Math.ceil(weeks)} weeks`;
}

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
      <Text style={styles.jobTextStyle}>
        {calculateWeeksFromIsoDate(job.job_start_date, job.job_end_date)}
      </Text>
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

  const {jobPostings, isLoading, fetchData, page_count, totalJobs} =
    useJobPostings();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]); // Initialize as an empty array
  const [page, setPage] = useState(1); // Initialize page state

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

  // Effect to fetch data only when the page changes
  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Function to handle navigation and passing job details to the next screen
  const handleMoreDetails = (job: any) => {
    navigation.navigate('JobPosting', {job});
  };

  // Function to handle page number click
  const handlePageChange = (newPage: number) => {
    if (newPage !== page) {
      setPage(newPage); // Change the page number and trigger new data fetch
    }
  };

  // Function to render pagination buttons
  const renderPagination = () => {
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
        </TouchableOpacity>,
      );
    }
    return <View style={styles.paginationContainer}>{buttons}</View>;
  };

  return (
    // use flatlist instead of scrollview as it has built in pagination and header and is more efficient than scroll view.
    <FlatList
      data={filteredJobs}
      renderItem={({item}) => (
        <Job key={item.id} job={item} handleMoreDetails={handleMoreDetails} />
      )}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <>
          <View style={styles.headerStyle}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <TextInput
                placeholder="Search"
                placeholderTextColor="gray"
                style={
                  Platform.OS === 'ios'
                    ? styles.searchStyleIOS
                    : styles.searchStyle
                }
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <NavigationBar width={35} height={35} color={'#000'} />
            </TouchableOpacity>
          </View>
          <Text style={styles.jobFeedStyle}>
            Job Feed{' '}
            {'(' + (searchQuery.trim() ? filteredJobs.length : totalJobs) + ')'}
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
    />
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

  searchStyleIOS: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 10,
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
    height: '80%',
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
});

export default Homepage;
