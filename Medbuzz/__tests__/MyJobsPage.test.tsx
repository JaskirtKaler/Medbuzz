/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */

//for testing type following in terminal: 
//npm test -- __tests__/MyJobsPage.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import MyJobsPage from '../Screens/MyJobs';
import { mockJobPostings } from '../__mocks__/mockJobsData'; // Import mock data


describe('MyJobsPage Component', () => {
    test('renders the correct number of jobs on the first page', () => {
      // Render the MyJobsPage component
      render(<MyJobsPage />);
  
      // Verify that 20 jobs are rendered (the first page limit)
      const jobs = screen.getAllByText(/Click for more details/i);
      expect(jobs.length).toBe(20);
    });
  
    test('renders truncated descriptions when job text is too long', () => {
      // Modify a job description to be longer than 100 characters
      const longDescriptionJob = {
        ...mockJobPostings[0],
        jobText: 'A'.repeat(150), // A long string of 150 characters
      };
  
      // Use modified job data for the test
      mockJobPostings[0] = longDescriptionJob;
  
      // Render the MyJobsPage component
      render(<MyJobsPage />);
  
      // Expect the job description to be truncated
      expect(screen.getByText('A'.repeat(100) + '...')).toBeTruthy();
    });
  
    test('renders default text for missing job description', () => {
        // Modify a job to have no description
        const jobWithoutDescription = {
          ...mockJobPostings[0],
          jobText: '', // No description
        };
      
        // Use modified job data for the test
        mockJobPostings[0] = jobWithoutDescription;
      
        // Render the MyJobsPage component
        render(<MyJobsPage />);
      
        // Expect at least one element to have "No description available"
        const noDescriptionElements = screen.getAllByText('No description available');
        expect(noDescriptionElements.length).toBeGreaterThan(0);
      });
      
      test('renders pagination buttons and allows page change', () => {
        // Render the MyJobsPage component
        render(<MyJobsPage />);
      
        // Verify that pagination buttons are rendered (in this case, 2 pages)
        const paginationButtons = screen.getAllByText(/^\d+$/); // Find buttons by their numeric text (1, 2, etc.)
        expect(paginationButtons.length).toBe(2); // Expect 2 buttons (for 2 pages)
      
        // Simulate clicking the second page button
        fireEvent.press(paginationButtons[1]);
      
        // Expect the second page to show the remaining jobs (5 jobs on page 2)
        const jobs = screen.getAllByText(/Click for more details/i);
        expect(jobs.length).toBe(5);
      });
      
      
  });