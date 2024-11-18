
// For testing, type the following in the terminal: 
// npm test -- __tests__/MyJobsPage.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import MyJobsPage from '../Screens/MyJobs';
import { loadUsersJobs } from '../API Fetch/LoadUsersJobs';
import { useNavigation } from '@react-navigation/native';

const generateMockJob = (id: number) => ({
  id: id.toString(),
  position_title: `Job Title ${id}`,
  city: `City ${id}`,
  state: `State ${id}`,
  job_status: 'Open',
  job_start_date: '2023-11-01T00:00:00Z',
  job_end_date: '2024-02-01T00:00:00Z',
});

jest.mock('../API Fetch/LoadUsersJobs');
jest.mock('@react-navigation/native');

describe('MyJobsPage Component', () => {
  const mockNavigate = jest.fn();
  const mockJobPostings = Array.from({ length: 30 }, (_, i) => generateMockJob(i + 1));
  let currentPage = 1;

  beforeEach(() => {
    jest.clearAllMocks();
    currentPage = 1; // Reset page to 1 before each test
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
  });

  (loadUsersJobs as jest.Mock).mockImplementation(() => {
    const jobsPerPage = 10; // Correctly reflects MyJobsPage logic
    const start = (currentPage - 1) * jobsPerPage;
    const end = currentPage * jobsPerPage;
    return {
      jobPostings: mockJobPostings.slice(start, end),
      isLoading: false,
      fetchData: (page: number) => { currentPage = page; },
      page_count: Math.ceil(mockJobPostings.length / jobsPerPage),
      total_jobs: mockJobPostings.length,
    };
  });

  test('renders the correct number of jobs', async () => {
    render(<MyJobsPage />);

    await waitFor(() => {
      const detailButtons = screen.getAllByText('Click for more details');
      expect(detailButtons.length).toBe(10); // Updated to match logic (10 jobs per page)
    });
  });

  test('navigates to JobInfo screen when "Click for more details" is pressed', async () => {
    render(<MyJobsPage />);

    const detailButtons = await screen.findAllByText('Click for more details');
    fireEvent.press(detailButtons[0]); // Press the first job's button

    expect(mockNavigate).toHaveBeenCalledWith('JobInfo', { job: mockJobPostings[0] });
  });

  test('displays "No jobs available" when there are no jobs', async () => {
    (loadUsersJobs as jest.Mock).mockImplementation(() => ({
      jobPostings: [],
      isLoading: false,
      fetchData: jest.fn(),
      page_count: 0,
      total_jobs: 0,
    }));

    render(<MyJobsPage />);

    const noJobsText = await screen.findByText('No jobs available');
    expect(noJobsText).toBeTruthy();
  });

  test('renders pagination buttons and allows page change', async () => {
    (loadUsersJobs as jest.Mock).mockImplementation(() => ({
        jobPostings: mockJobPostings.slice(0, 10), // First 10 jobs
        isLoading: false,
        fetchData: jest.fn((page: number) => {
            currentPage = page;
        }),
        page_count: 3, // Total pages
        total_jobs: 30, // Total jobs
    }));

    const { rerender } = render(<MyJobsPage />);

    // Verify pagination buttons render
    await waitFor(() => {
        expect(screen.getByText('1')).toBeTruthy();
        expect(screen.getByText('2')).toBeTruthy();
        expect(screen.getByText('3')).toBeTruthy();
    });

    // Simulate clicking the second page button
    fireEvent.press(screen.getByText('2'));

    // Mock data for the second page
    (loadUsersJobs as jest.Mock).mockImplementation(() => ({
        jobPostings: mockJobPostings.slice(10, 20), // Second 10 jobs
        isLoading: false,
        fetchData: jest.fn((page: number) => {
            currentPage = page;
        }),
        page_count: 3,
        total_jobs: 30,
    }));

    // Re-render the component to reflect the updated state
    rerender(<MyJobsPage />);

    // Verify jobs for the second page render correctly
    await waitFor(() => {
        const detailButtons = screen.getAllByText('Click for more details');
        expect(detailButtons.length).toBe(10); // Expect 10 jobs on page 2
    });
});

  
});
