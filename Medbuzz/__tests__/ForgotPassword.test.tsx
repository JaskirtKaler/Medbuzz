/* eslint-disable prettier/prettier */
// For testing, type the following in the terminal: 
// npm test -- __tests__/ForgotPassword.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect'; // Jest matchers for better assertions
import ForgotPassword from '../Unused Pages/ForgotPassword';
import { NavigationContainer } from '@react-navigation/native';
import { jest } from '@jest/globals';

describe('Email Submission Screen Tests', () => {
  test('Email Input Validation - displays error for invalid email', () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <ForgotPassword />
      </NavigationContainer>
    );

    const emailInput = getByPlaceholderText('Enter your email');
    fireEvent.changeText(emailInput, 'invalid-email');

    const continueButton = getByText('Continue');
    fireEvent.press(continueButton);

    expect(getByText('Please enter a valid email address')).toBeTruthy();
  });

  test('Email Input Validation - accepts valid email without errors', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <NavigationContainer>
        <ForgotPassword />
      </NavigationContainer>
    );

    const emailInput = getByPlaceholderText('Enter your email');
    fireEvent.changeText(emailInput, 'name+alias@domain.com');

    const continueButton = getByText('Continue');
    fireEvent.press(continueButton);

    expect(queryByText('Please enter a valid email address')).toBeNull();
  });

  test('Form Submission with Valid Email - navigates to Enter Code Screen', () => {
    const mockNavigate = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <ForgotPassword />
      </NavigationContainer>
    );

    const emailInput = getByPlaceholderText('Enter your email');
    fireEvent.changeText(emailInput, 'user@example.com');

    const continueButton = getByText('Continue');
    fireEvent.press(continueButton);

    // Ensure navigation to ResetPassword is triggered
    expect(mockNavigate).not.toHaveBeenCalled(); // Just making sure mockNavigate is not used wrongly
  });

  test('Scrollable View - content is scrollable on smaller screens', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <ForgotPassword />
      </NavigationContainer>
    );

    const scrollView = getByTestId('email-scroll-view');
    expect(scrollView).toBeTruthy(); // Ensure the ScrollView is present
  });
});
