// For testing, type the following in the terminal: 
// npm test -- __tests__/MessagePage.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MessagePage from '../Screens/MessagePage'; // Adjust the path if necessary
import { useNavigation } from '@react-navigation/native';
import { useUnreadMessages } from '../Components/Utility/UnreadMessagesContext';

// Mock react-navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

// Mock UnreadMessagesContext
jest.mock('../Components/Utility/UnreadMessagesContext', () => ({
  useUnreadMessages: jest.fn(),
}));

// Mock react-native-gesture-handler to prevent native errors
jest.mock('react-native-gesture-handler', () => ({
  GestureHandlerRootView: jest.fn().mockImplementation(({ children }) => children),
  Swipeable: jest.fn().mockImplementation(({ children }) => children),
}));

// Mock SVG components
jest.mock('../Components/Svg/Backarrow', () => (props: any) => (
  <div {...props} testID="mock-backarrow">MockBackarrow</div>
));

jest.mock('../Components/Svg/Trashcan', () => 'MockTrashcan');
jest.mock('../Components/Svg/Profile', () => 'MockProfile');

describe('MessagePage Component', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const mockResetUnreadCount = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useUnreadMessages as jest.Mock).mockReturnValue({
      unreadCount: 5,
      resetUnreadCount: mockResetUnreadCount,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Messages header correctly', () => {
    const { getByText } = render(<MessagePage />);
    expect(getByText('Messages')).toBeTruthy();
  });

  it('calls resetUnreadCount when "Mark as Read" is pressed', () => {
    const { getByText } = render(<MessagePage />);
    fireEvent.press(getByText('Mark as Read'));
    expect(mockResetUnreadCount).toHaveBeenCalledTimes(1);
  });

  it('navigates to Homepage when the back arrow is clicked', () => {
    const { getByTestId } = render(<MessagePage />);
    fireEvent.press(getByTestId('mock-backarrow')); // Use the testID from the mock component
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Homepage');
  });

  it('navigates to Inbox when "Radixsol HR" is pressed', () => {
    const { getByText } = render(<MessagePage />);
    fireEvent.press(getByText('Radixsol HR'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Inbox');
  });
});
