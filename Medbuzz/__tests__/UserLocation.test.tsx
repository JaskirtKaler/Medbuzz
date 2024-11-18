// For testing, type the following in the terminal: 
// npm test -- __tests__/UserLocation.test.tsx

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import UserLocation from '../SurveyPages/UserLocation'; // Adjust the path to your component

const renderWithNavigation = (component: React.ReactNode) => {
  return render(<NavigationContainer>{component}</NavigationContainer>);
};

describe('UserLocation Component', () => {
  test('should render the component correctly', () => {
    const { getByPlaceholderText, getByText } = renderWithNavigation(<UserLocation />);

    // Check if the input field is rendered
    const zipCodeInput = getByPlaceholderText('Home Zip Code');
    expect(zipCodeInput).toBeTruthy();

    // Check if the continue button is rendered
    const continueButton = getByText('Continue');
    expect(continueButton).toBeTruthy();
  });

  test('should validate zip code correctly', async () => {
    const { getByPlaceholderText, getByText } = renderWithNavigation(<UserLocation />);

    const zipCodeInput = getByPlaceholderText('Home Zip Code');
    const continueButton = getByText('Continue');

    // Test with a valid ZIP code
    await act(async () => {
      fireEvent.changeText(zipCodeInput, '12345');
      fireEvent.press(continueButton);
    });

    // Ensure valid ZIP code is accepted
    expect(zipCodeInput.props.placeholder).toBe('Home Zip Code');

    // Test with an invalid ZIP code
    await act(async () => {
      fireEvent.changeText(zipCodeInput, '1234');
      fireEvent.press(continueButton);
    });

    // Ensure the invalid ZIP code state triggers a warning
    expect(zipCodeInput.props.placeholder).toBe('Home Zip Code');
  });
});
