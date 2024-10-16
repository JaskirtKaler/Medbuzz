// Passes the tests but will give an error because there is no proper
// API implementation. 
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EditBasicDetails from '../UserInfo/EditBasicDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native'; 

jest.mock('@react-native-async-storage/async-storage'); // Mock AsyncStorage

// Mocking the navigation prop
const mockNavigation: Partial<NavigationProp<any>> = { 
  goBack: jest.fn(), 
  navigate: jest.fn(),
  dispatch: jest.fn(),
  reset: jest.fn(),
  isFocused: jest.fn(() => true),
  canGoBack: jest.fn(() => true),
  getId: jest.fn(),
  getState: jest.fn(),
};

beforeEach(() => {
  AsyncStorage.clear(); // Clear AsyncStorage before each test
});

describe('EditBasicDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  it('should render correctly with initial inputs', () => {
    const { getByTestId } = render(
      <EditBasicDetails navigation={mockNavigation as NavigationProp<any>} />
    );

    // Initial input values should be empty
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

    // Test First Name
    fireEvent.changeText(getByTestId('firstNameInput'), 'John');
    expect(getByTestId('firstNameInput').props.value).toBe('John');

    // Test Middle Name
    fireEvent.changeText(getByTestId('middleNameInput'), 'Michael');
    expect(getByTestId('middleNameInput').props.value).toBe('Michael');

    // Test Last Name
    fireEvent.changeText(getByTestId('lastNameInput'), 'Doe');
    expect(getByTestId('lastNameInput').props.value).toBe('Doe');

    // Test Phone Number
    fireEvent.changeText(getByTestId('phoneNumberInput'), '1234567890');
    expect(getByTestId('phoneNumberInput').props.value).toBe('1234567890');

    // Test Email
    fireEvent.changeText(getByTestId('emailInput'), 'john.doe@example.com');
    expect(getByTestId('emailInput').props.value).toBe('john.doe@example.com');

    // Test Professional Summary
    fireEvent.changeText(getByTestId('professionalSummaryInput'), 'Experienced Software Developer');
    expect(getByTestId('professionalSummaryInput').props.value).toBe('Experienced Software Developer');

    // Test School Name
    fireEvent.changeText(getByTestId('schoolNameInput'), 'XYZ University');
    expect(getByTestId('schoolNameInput').props.value).toBe('XYZ University');

    // Test Country
    fireEvent.changeText(getByTestId('countryInput'), 'United States');
    expect(getByTestId('countryInput').props.value).toBe('United States');

    // Test City
    fireEvent.changeText(getByTestId('cityInput'), 'New York');
    expect(getByTestId('cityInput').props.value).toBe('New York');

    // Test Field of Study
    fireEvent.changeText(getByTestId('fieldOfStudyInput'), 'Computer Science');
    expect(getByTestId('fieldOfStudyInput').props.value).toBe('Computer Science');

    // Test Home Street Address
    fireEvent.changeText(getByTestId('homeStreetAddressInput'), '123 Main St');
    expect(getByTestId('homeStreetAddressInput').props.value).toBe('123 Main St');

    // Test Home City
    fireEvent.changeText(getByTestId('homeCityInput'), 'New York');
    expect(getByTestId('homeCityInput').props.value).toBe('New York');

    // Test Home State
    fireEvent.changeText(getByTestId('homeStateInput'), 'NY');
    expect(getByTestId('homeStateInput').props.value).toBe('NY');

    // Test ZIP Code
    fireEvent.changeText(getByTestId('zipCodeInput'), '10001');
    expect(getByTestId('zipCodeInput').props.value).toBe('10001');

    // Test Years of Experience
    fireEvent.changeText(getByTestId('yearsOfExperienceInput'), '5');
    expect(getByTestId('yearsOfExperienceInput').props.value).toBe('5');

    // Test Date of Birth
    fireEvent.changeText(getByTestId('dateOfBirthInput'), '01/01/1990');
    expect(getByTestId('dateOfBirthInput').props.value).toBe('01/01/1990');

    // Test SSN Last Four
    fireEvent.changeText(getByTestId('ssnLastFourInput'), '1234');
    expect(getByTestId('ssnLastFourInput').props.value).toBe('1234');

    // Test Legal First Name
    fireEvent.changeText(getByTestId('legalFirstNameInput'), 'John');
    expect(getByTestId('legalFirstNameInput').props.value).toBe('John');

    // Test Legal Last Name
    fireEvent.changeText(getByTestId('legalLastNameInput'), 'Doe');
    expect(getByTestId('legalLastNameInput').props.value).toBe('Doe');
  });
});
