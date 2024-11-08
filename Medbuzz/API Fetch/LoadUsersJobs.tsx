/*
This file is used to gather the user's jobs they applied for.
*/

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { API_TOKEN } from '@env';
import { JobPosting } from './UseJobPostings';

export const loadUsersJobs = () => {
    const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page_count, setPage_count] = useState(1);
    const [total_jobs, setTotalJobs] = useState(1);

    const fetchData = async (pageNum: number) => {
        // setJobPostings([]);
        setIsLoading(true);

        console.log("In LoadUserJobs");


        try {
            setJobPostings([]);
            // Get the job IDs
            const savedUserObject = await AsyncStorage.getItem('userProfile');

            console.log("Is my Jobs empty?");
            if (savedUserObject === null) {
                throw Error("User object null");
            }
            else {
                console.log("No");
            }

            const userObject = JSON.parse(savedUserObject);

            console.log("appliedJobs Null?");
            if (userObject.myJobs.appliedJobs === null) {
                throw Error("appliedJobs null");
            }

            if (!Array.isArray(userObject.myJobs.appliedJobs) || userObject.myJobs.appliedJobs.length === 0) {
                console.log("No saved jobs!");
                return;
            }


            const myHeaders = new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_TOKEN}`
            });

            const requestOptions = {
                method: 'GET',
                headers: myHeaders
            };

            let singleJobId: any;
            console.log("applied jobs length")
            console.log(userObject.myJobs.appliedJobs.length);

            // Use a Set to track the unique job IDs already in state
            const existingJobIds = new Set(jobPostings.map(job => job.id));

            // Use this to store fetched jobs temporarily
            let fetchedJobs: JobPosting[] = [];
            for (let i = 0; i < userObject.myJobs.appliedJobs.length; i++) {
                singleJobId = userObject.myJobs.appliedJobs[i].jobID;


                const response = await fetch(`https://api.ceipal.com/v1/getJobPostingDetails/?job_id=${singleJobId}`,
                    requestOptions
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error data:", errorData);
                    throw new Error("Network response was not ok");
                }

                const result = await response.json();
                fetchedJobs.push(result);

                console.log(`result: ${result.id}`);
            } // End for loop

            setJobPostings(fetchedJobs);
        } // End try
        catch (error: any) {
            console.error("Fetch error: ", error);
            setJobPostings([]);
        }
        finally {
            setIsLoading(false);
        } // End Try-Catch
    }; // End fetchData

    useEffect(() => {
        fetchData(1);
    }, []);

    return { jobPostings, isLoading, fetchData, page_count, total_jobs };
} // End loadUserJobs