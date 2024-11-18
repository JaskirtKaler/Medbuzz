// For testing, type the following in the terminal: 
// npm test -- __tests__/EditBasicDetails.test.tsx

// Passes the tests but will give an error because there is no proper
// API implementation. 
import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import EditBasicDetails from '../UserInfo/EditBasicDetails';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() =>
    Promise.resolve(
      JSON.stringify({
        firstName: '',
        lastName: '',
        middleName: '',
        phoneNumber: '',
        email: '',
      })
    )
  ),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock navigation prop
const mockNavigation: Partial<NavigationProp<any>> = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe('EditBasicDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.clear(); // Clear AsyncStorage before each test
  });

  it('should render correctly with initial inputs', async () => {
    const { getByTestId } = render(
      <EditBasicDetails navigation={mockNavigation as NavigationProp<any>} />
    );

    // Wait for the form to render
    await waitFor(() => {
      expect(getByTestId('firstNameInput')).toBeTruthy();
    });

    // Check initial values of inputs
    expect(getByTestId('firstNameInput').props.value).toBe('');
    expect(getByTestId('lastNameInput').props.value).toBe('');
    expect(getByTestId('middleNameInput').props.value).toBe('');
    expect(getByTestId('phoneNumberInput').props.value).toBe('');
    expect(getByTestId('emailInput').props.value).toBe('');
  });

  it('should accept valid inputs in all fields', async () => {
    const { getByTestId } = render(
      <EditBasicDetails navigation={mockNavigation as NavigationProp<any>} />
    );

    // Wait for the form to render
    await waitFor(() => {
      expect(getByTestId('firstNameInput')).toBeTruthy();
    });

    // Simulate user input
    fireEvent.changeText(getByTestId('firstNameInput'), 'John');
    expect(getByTestId('firstNameInput').props.value).toBe('John');

    fireEvent.changeText(getByTestId('lastNameInput'), 'Doe');
    expect(getByTestId('lastNameInput').props.value).toBe('Doe');

    fireEvent.changeText(getByTestId('middleNameInput'), 'Michael');
    expect(getByTestId('middleNameInput').props.value).toBe('Michael');

    fireEvent.changeText(getByTestId('phoneNumberInput'), '1234567890');
    expect(getByTestId('phoneNumberInput').props.value).toBe('1234567890');

    fireEvent.changeText(getByTestId('emailInput'), 'john.doe@example.com');
    expect(getByTestId('emailInput').props.value).toBe('john.doe@example.com');
  });
});
