/*
This file is used to gather the user's jobs they applied for.
*/

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import {API_TOKEN} from '@env';
import { JobPosting } from './UseJobPostings';

export const loadUsersJobs = () => {
    const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
    // const [jobPostings, setJobPostings] = useState<Set<JobPosting>>(new Set());
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // const addJobPosting = (newJob: JobPosting) => {
    //     setJobPostings((prevJobPostings) => new Set(prevJobPostings).add(newJob));
    //   };

    const fetchData = async () => {
        setIsLoading(true);

        let jobList:any; // Will hold the job IDs.

        console.log("Here");

        try {
            // Get the job IDs
            const jobJson = await AsyncStorage.getItem("userSavedJobs");
            // console.log("Getting job IDs of user.");
            
            if (jobJson) {
                jobList = JSON.parse(jobJson);
            }

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${API_TOKEN}`);
            
            var requestOptions = {
              method: 'GET',
              headers: myHeaders
            };
            
            for (let i = 0; i < jobList.length; i++) {
                const response = await fetch(`https://api.ceipal.com/v1/getJobPostingDetails/?job_id=${jobList[i]}`,
                    requestOptions
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error data:" , errorData);
                    throw new Error("Network response was not ok");
                }

                const result = await response.json();
                jobPostings.push(result);

                // jobPostings.push({
                //     id: result.id,
                //     remote_opportunities: result.remote_opportunities,
                //     city: result.city,
                //     position_title: result.position_title,
                //     requisition_description: result.requisition_description,
                //     public_job_desc: result.public_job_desc,
                //     job_code: result.job_code,
                //     modified: result.modified, // Ensure proper Date formatting
                //     post_on_careerportal: result.post_on_careerportal,
                //     closing_date: result.closing_date,
                //     job_start_date: result.job_start_date,
                //     job_end_date: result.job_end_date,
                //     job_status: result.job_status,
                //     created: result.created,
                //     pay_rates:
                //       result.pay_rates && result.pay_rates.length > 0
                //         ? result.pay_rates.map((rate: any) => ({
                //             pay_rate_currency: rate.pay_rate_currency,
                //             pay_rate: rate.pay_rate,
                //             pay_rate_pay_frequency_type: rate.pay_rate_pay_frequency_type,
                //             pay_rate_employment_type: rate.pay_rate_employment_type,
                //           }))
                //         : [], // Return an empty array if pay_rates is missing or empty
                //     posted_by: result.posted_by,
                //     assigned_recruiter: result.assigned_recruiter,
                //     primary_recruiter: result.primary_recruiter,
                //     business_unit_id: result.business_unit_id,
                //     currency: result.currency,
                //     employment_type: result.employment_type,
                //     country: result.country,
                //     state: result.state,
                //     tax_terms: result.tax_terms,
                //     industry: result.industry,
                //     updated: result.updated,
                //     apply_job: result.apply_job,
                //     apply_job_without_registration: result.apply_job_without_registration,
                //     skills: result.skills,
                //     postal_code: result.postal_code,
                //   });

                // setJobPostings(result);
                // setJobPostings([{
                //     id: result.id,
                //     remote_opportunities: result.remote_opportunities,
                //     city: result.city,
                //     position_title: result.position_title,
                //     requisition_description: result.requisition_description,
                //     public_job_desc: result.public_job_desc,
                //     job_code: result.job_code,
                //     modified: result.modified, // Ensure proper Date formatting
                //     post_on_careerportal: result.post_on_careerportal,
                //     closing_date: result.closing_date,
                //     job_start_date: result.job_start_date,
                //     job_end_date: result.job_end_date,
                //     job_status: result.job_status,
                //     created: result.created,
                //     pay_rates:
                //       result.pay_rates && result.pay_rates.length > 0
                //         ? result.pay_rates.map((rate: any) => ({
                //             pay_rate_currency: rate.pay_rate_currency,
                //             pay_rate: rate.pay_rate,
                //             pay_rate_pay_frequency_type: rate.pay_rate_pay_frequency_type,
                //             pay_rate_employment_type: rate.pay_rate_employment_type,
                //           }))
                //         : [], // Return an empty array if pay_rates is missing or empty
                //     posted_by: result.posted_by,
                //     assigned_recruiter: result.assigned_recruiter,
                //     primary_recruiter: result.primary_recruiter,
                //     business_unit_id: result.business_unit_id,
                //     currency: result.currency,
                //     employment_type: result.employment_type,
                //     country: result.country,
                //     state: result.state,
                //     tax_terms: result.tax_terms,
                //     industry: result.industry,
                //     updated: result.updated,
                //     apply_job: result.apply_job,
                //     apply_job_without_registration: result.apply_job_without_registration,
                //     skills: result.skills,
                //     postal_code: result.postal_code,
                //   }]);
                  console.log(`result: ${result.id}`);
            } // End for loop
            
            console.log(`JOB POSTINGS: ${jobPostings.length}`);

            for (let i = 0; i < jobPostings.length; i++) {
                console.log(jobPostings[i].id);
            }
        }
        catch(error: any) {
            console.error("Fetch error: ", error);
            setJobPostings([]);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {jobPostings, isLoading, fetchData};
}