/* This file creates the job posting interface based on the ceipal api response. It is 1 to 1 to the reponse. It also fetches the jobs from there 
Search by location parameters is still in the works
*/
import {useState, useEffect} from 'react';
import {API_TOKEN} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface JobPosting {
  id: string;
  remote_opportunities: string;
  city: string;
  position_title: string;
  requisition_description: string;
  public_job_desc: string;
  job_code: string;
  modified: Date;
  post_on_careerportal: string;
  closing_date: string;
  job_start_date: Date;
  job_end_date: Date;
  job_status: string;
  created: Date;
  pay_rates: {
    pay_rate_currency: string;
    pay_rate: string;
    pay_rate_pay_frequency_type: string;
    pay_rate_employment_type: string;
  }[];
  posted_by: string;
  assigned_recruiter: string;
  primary_recruiter: string;
  business_unit_id: number;
  currency: string;
  employment_type: string;
  country: string;
  state: string;
  tax_terms: string;
  industry: string;
  updated: string;
  apply_job: string;
  apply_job_without_registration: string;
  skills: string;
  postal_code: string;
}

export const useJobPostings = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Add loading state

  const fetchData = async () => {
    setIsLoading(true); // Set loading to true when starting the fetch
    try {
      setJobPostings([]); // Ensure state is clear in the beginning

      // Retrieve location parameters from local storage
      const userLocInfo = await AsyncStorage.getItem('LocationPreference');
      console.log('Location Preferences from local storage', userLocInfo);
      let locationParams = '';
      //Location preferences state needs to be saved as integers, currently stored as a string. String to int conversion is provided by ceipal
      //Update the Location.tsx page accordingly.
      if (userLocInfo) {
        const {state, city, zipcode} = JSON.parse(userLocInfo);
        // Construct location parameters for the URL
        const params = [];

        if (city) params.push(`city=${city}`);
        locationParams = params.length > 0 ? `?${params.join('&')}` : '';
      }

      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      // REMOVED. Update the API token in the .env file so no errors are thrown during bundling
      myHeaders.append('Authorization', `Bearer ${API_TOKEN} `); // Use the token from the .env file

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };
      
      let offset = 0;
      const limit = 50; // Set the limit to the maximum the API allows

      const response = await fetch(
        `https://api.ceipal.com/v1/getJobPostingsList${locationParams}${
          locationParams ? '&' : '?'
        }limit=${limit}&offset=${offset}`,
        requestOptions,
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error data:', errorData);
        setJobPostings([]); // Ensure state is cleared on error
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      setJobPostings(result);
      setJobPostings(
        result.results.map((posting: any) => ({
          id: posting.id,
          remote_opportunities: posting.remote_opportunities,
          city: posting.city,
          position_title: posting.position_title,
          requisition_description: posting.requisition_description,
          public_job_desc: posting.public_job_desc,
          job_code: posting.job_code,
          modified: posting.modified, // Ensure proper Date formatting
          post_on_careerportal: posting.post_on_careerportal,
          closing_date: posting.closing_date,
          job_start_date: posting.job_start_date,
          job_end_date: posting.job_end_date,
          job_status: posting.job_status,
          created: posting.created,
          pay_rates:
            posting.pay_rates && posting.pay_rates.length > 0
              ? posting.pay_rates.map((rate: any) => ({
                  pay_rate_currency: rate.pay_rate_currency,
                  pay_rate: rate.pay_rate,
                  pay_rate_pay_frequency_type: rate.pay_rate_pay_frequency_type,
                  pay_rate_employment_type: rate.pay_rate_employment_type,
                }))
              : [], // Return an empty array if pay_rates is missing or empty
          posted_by: posting.posted_by,
          assigned_recruiter: posting.assigned_recruiter,
          primary_recruiter: posting.primary_recruiter,
          business_unit_id: posting.business_unit_id,
          currency: posting.currency,
          employment_type: posting.employment_type,
          country: posting.country,
          state: posting.state,
          tax_terms: posting.tax_terms,
          industry: posting.industry,
          updated: posting.updated,
          apply_job: posting.apply_job,
          apply_job_without_registration:

          posting.apply_job_without_registration,

           
          skills: posting.skills,
          postal_code: posting.postal_code,
        })),
      );

    } catch (error: any) {
      console.error('Fetch error:', error);
      setJobPostings([]); // Ensure state is cleared on error
    } finally {
      setIsLoading(false); // Stop loading after fetch is done
    }
  };

  useEffect(() => {
    fetchData(); // Call the fetchData function when component mounts
  }, []);

  return {jobPostings, isLoading, fetchData};
};
