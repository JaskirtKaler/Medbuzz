/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */

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

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the correct number of jobs', async () => {
    const mockJobPostings = Array.from({ length: 25 }, (_, i) => generateMockJob(i + 1));

    (loadUsersJobs as jest.Mock).mockReturnValue({
      jobPostings: mockJobPostings,
      isLoading: false,
      fetchData: jest.fn(),
      page_count: 2,
      total_jobs: 25,
    });

    render(<MyJobsPage />);

    await waitFor(() => {
      const detailButtons = screen.getAllByText('Click for more details');
      expect(detailButtons.length).toBe(25);
    });
  });

  test('navigates to JobInfo screen when "Click for more details" is pressed', async () => {
    const mockJobPostings = [generateMockJob(1)];

    (loadUsersJobs as jest.Mock).mockReturnValue({
      jobPostings: mockJobPostings,
      isLoading: false,
      fetchData: jest.fn(),
      page_count: 1,
      total_jobs: 1,
    });

    render(<MyJobsPage />);

    const detailButton = await screen.findByText('Click for more details');
    fireEvent.press(detailButton);

    expect(mockNavigate).toHaveBeenCalledWith('JobInfo', { job: mockJobPostings[0] });
  });

  test('displays "No jobs available" when there are no jobs', async () => {
    (loadUsersJobs as jest.Mock).mockReturnValue({
      jobPostings: [],
      isLoading: false,
      fetchData: jest.fn(),
      page_count: 0,
      total_jobs: 0,
    });

    render(<MyJobsPage />);

    const noJobsText = await screen.findByText('No jobs available');
    expect(noJobsText).toBeTruthy();
  });

  test('renders pagination buttons and allows page change', async () => {
    const mockJobPostings = Array.from({ length: 30 }, (_, i) => generateMockJob(i + 1));
    let currentPage = 1;

    const fetchDataMock = jest.fn((page: number) => {
      currentPage = page;
    });

    (loadUsersJobs as jest.Mock).mockImplementation(() => {
      const start = (currentPage - 1) * 20;
      const end = currentPage * 20;
      const jobPostings = mockJobPostings.slice(start, end);
      const page_count = Math.ceil(mockJobPostings.length / 20);
      return {
        jobPostings,
        isLoading: false,
        fetchData: fetchDataMock,
        page_count,
        total_jobs: mockJobPostings.length,
      };
    });

    render(<MyJobsPage />);

    // Wait for the initial render to complete
    await waitFor(() => {
      const detailButtons = screen.getAllByText('Click for more details');
      expect(detailButtons.length).toBe(20);
    });

    // Verify that pagination buttons are rendered
    const pageButtons = screen.getAllByText(/^\d+$/);
    expect(pageButtons.length).toBe(2); // Expecting 2 pages based on 30 jobs and 20 per page

    // Simulate clicking the second page button
    fireEvent.press(screen.getByText('2'));

    // Wait for the page change to take effect
    await waitFor(() => {
      expect(fetchDataMock).toHaveBeenCalledWith(2);
    });

    // Mock the second page's job postings and re-render
    const updatedJobPostings = mockJobPostings.slice(20, 30);
    (loadUsersJobs as jest.Mock).mockReturnValue({
      jobPostings: updatedJobPostings,
      isLoading: false,
      fetchData: fetchDataMock,
      page_count: 2,
      total_jobs: 30,
    });

    render(<MyJobsPage />);

    // Verify the number of jobs rendered on the second page
    await waitFor(() => {
      const detailButtons = screen.getAllByText('Click for more details');
      expect(detailButtons.length).toBe(10); // 10 jobs on the second page
    });
});
});