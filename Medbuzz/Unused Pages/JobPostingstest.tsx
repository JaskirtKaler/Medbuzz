// This will no longer work since I incorporated async storage in the JobPosting fetch because of location parameters being involved in the fetch.
//This passed the 4 test cases when there was no local storage involved, with local storage involved, jest config needs to be updated to account and recognize async storage as a module
//React hook also needed to be deleted since it was causing errors for others on the team

// For testing, type the following in the terminal: 
// npm test -- __tests__/JobPostings.test.tsx

import { renderHook, act } from '@testing-library/react-hooks';
import { useJobPostings } from '../API Fetch/UseJobPostings'; // Adjust the path to the JobPostings file

// Mock the fetch API globally
global.fetch = jest.fn();

describe('useJobPostings', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mocks before each test
  });

  test('should initialize with empty jobPostings and isLoading false', () => {
    const { result } = renderHook(() => useJobPostings());

    expect(result.current.jobPostings).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  test('should set isLoading to true while fetching and false after', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }), // Mock an empty response
    });

    const { result, waitForNextUpdate } = renderHook(() => useJobPostings());

    // Act to call fetchData
    act(() => {
      result.current.fetchData();
    });

    // Loading should be true while fetching
    expect(result.current.isLoading).toBe(true);

    // Wait for the hook to update (i.e., fetch completes)
    await waitForNextUpdate();

    // Loading should be false after fetching
    expect(result.current.isLoading).toBe(false);
  });

  test('should update jobPostings correctly on successful fetch', async () => {
    const mockResponse = {
      results: [
        {
          id: '1',
          remote_opportunities: 'Yes',
          city: 'New York',
          position_title: 'Software Engineer',
          requisition_description: 'Build amazing apps!',
          public_job_desc: 'Public description here.',
          job_code: 'SE123',
          modified: '2023-09-28T12:00:00Z',
          post_on_careerportal: '2023-09-28',
          closing_date: '2023-10-15',
          job_start_date: '2023-10-01',
          job_end_date: '2023-12-01',
          job_status: 'Open',
          created: '2023-09-01T12:00:00Z',
          pay_rates: [
            {
              pay_rate_currency: 'USD',
              pay_rate: '100',
              pay_rate_pay_frequency_type: 'Hourly',
              pay_rate_employment_type: 'Full-time',
            },
          ],
          posted_by: 'John Doe',
          assigned_recruiter: 'Jane Smith',
          primary_recruiter: 'John Doe',
          business_unit_id: 123,
          currency: 'USD',
          employment_type: 'Full-time',
          country: 'USA',
          state: 'NY',
          tax_terms: 'W2',
          industry: 'Software',
          updated: '2023-09-28T12:00:00Z',
          apply_job: 'Apply here',
          apply_job_without_registration: 'No',
          skills: 'React, TypeScript',
          postal_code: '10001',
        },
      ],
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result, waitForNextUpdate } = renderHook(() => useJobPostings());

    act(() => {
      result.current.fetchData();
    });

    await waitForNextUpdate();

    expect(result.current.jobPostings.length).toBe(1);
    expect(result.current.jobPostings[0].id).toBe('1');
    expect(result.current.jobPostings[0].city).toBe('New York');
    expect(result.current.jobPostings[0].position_title).toBe('Software Engineer');
  });

  test('should handle errors by clearing jobPostings and setting isLoading to false', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Error occurred' }), // Mock an error response
    });

    const { result, waitForNextUpdate } = renderHook(() => useJobPostings());

    act(() => {
      result.current.fetchData();
    });

    await waitForNextUpdate();

    expect(result.current.jobPostings).toEqual([]); // Job postings should be cleared
    expect(result.current.isLoading).toBe(false); // Loading should be false after error
  });
});