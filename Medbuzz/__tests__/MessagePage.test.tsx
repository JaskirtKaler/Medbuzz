import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import MessagePage from '../Screens/MessagePage'; // Adjust the import path as necessary
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

// Mock the necessary modules
jest.mock('@react-native-firebase/messaging', () => ({
  requestPermission: jest.fn(),
  getToken: jest.fn(),
  onMessage: jest.fn((callback) => {
    // Simulate a new message
    const mockMessage = {
      notification: {
        title: 'New message!',
        body: 'You have a new message',
      },
      data: {
        messageId: '123',
        senderId: '1',
      },
    };
    callback(mockMessage);
  }),
}));

jest.mock('@notifee/react-native', () => ({
  createChannel: jest.fn(),
  displayNotification: jest.fn(),
}));

describe('MessagePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<MessagePage />);
    expect(getByText('Messages')).toBeTruthy(); // Check for the presence of the header
  });

  it('requests notification permission on mount', async () => {
    render(<MessagePage />);
    await waitFor(() => {
      expect(messaging.requestPermission).toHaveBeenCalled();
    });
  });

  it('receives and displays a new message', async () => {
    const { getByText } = render(<MessagePage />);
    
    await waitFor(() => {
      expect(getByText('You have a new message')).toBeTruthy();
    });

    // Check if a notification was displayed
    expect(notifee.displayNotification).toHaveBeenCalled();
  });

  it('handles pressing the back button', () => {
    const mockGoBack = jest.fn();
    jest.mock('@react-navigation/native', () => ({
      useNavigation: () => ({
        goBack: mockGoBack,
      }),
    }));

    const { getByText } = render(<MessagePage />);
    const backButton = getByText('Back'); // Adjust this to the actual text or find the button another way
    fireEvent.press(backButton);

    expect(mockGoBack).toHaveBeenCalled();
  });

  it('sends a notification when a message is added', async () => {
    const { getByText } = render(<MessagePage />);
    
    // Trigger the function that adds a message
    const testButton = getByText('Test Notification');
    fireEvent.press(testButton);

    expect(notifee.displayNotification).toHaveBeenCalledWith(expect.objectContaining({
      title: expect.stringContaining('New message from Radixsol'),
      body: expect.stringContaining('You have 1 unread messages from Radixsol'),
    }));
  });

  // Additional tests can be added here for other functionalities
});
