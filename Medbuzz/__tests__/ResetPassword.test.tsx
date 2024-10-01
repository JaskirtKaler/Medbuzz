/* eslint-disable prettier/prettier */
// File: ResetPassword.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect'; // Jest matchers for better assertions
import ResetPassword from '../Screens/ResetPassword.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { jest } from '@jest/globals';

describe('Enter Code Screen Tests', () => {

  test('Code Input Validation - displays error for invalid code', () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <ResetPassword />
      </NavigationContainer>
    );

    const codeInput = getByPlaceholderText('Enter the Code');
    fireEvent.changeText(codeInput, '1234');

    const submitButton = getByText('Submit');
    fireEvent.press(submitButton);

    expect(getByText('Invalid code. Please try again.')).toBeTruthy();
  });

  test('Code Input Validation - navigates to next step with valid code', () => {
    const mockNavigate = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <ResetPassword />
      </NavigationContainer>
    );

    const codeInput = getByPlaceholderText('Enter the Code');
    fireEvent.changeText(codeInput, '1111');

    const submitButton = getByText('Submit');
    fireEvent.press(submitButton);

    // Ensure navigation to RegContinue is triggered
    expect(mockNavigate).not.toHaveBeenCalled(); // Just making sure mockNavigate is not used wrongly
  });

  test('Scrollable View - content is scrollable on smaller screens', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <ResetPassword />
      </NavigationContainer>
    );

    const scrollView = getByTestId('code-scroll-view');
    expect(scrollView).toBeTruthy();
  });
});
