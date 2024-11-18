// For testing, type the following in the terminal: 
// npm test -- __tests__/Discipline.test.tsx


import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DisciplineScreen from '../SurveyPages/Discipline';
import { NavigationContainer } from '@react-navigation/native';

const mockRoute = {
  params: {
    authState: {},
    decodedIdToken: {
      given_name: 'Test',
      family_name: 'User',
      emails: ['test@example.com'],
    },
  },
};

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useRoute: () => mockRoute,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});

test('Validate years of experience with single digit', () => {
  const { getByText, getByPlaceholderText } = render(
    <NavigationContainer>
      <DisciplineScreen />
    </NavigationContainer>
  );
  const yearsInput = getByPlaceholderText('Enter years of experience');

  fireEvent.changeText(yearsInput, '1');
  const continueButton = getByText('Continue');
  fireEvent.press(continueButton);
});

test('Validate years of experience with double digits', () => {
  const { getByText, getByPlaceholderText } = render(
    <NavigationContainer>
      <DisciplineScreen />
    </NavigationContainer>
  );
  const yearsInput = getByPlaceholderText('Enter years of experience');

  fireEvent.changeText(yearsInput, '11');
  const continueButton = getByText('Continue');
  fireEvent.press(continueButton);
});

test('Validate years of experience does not take triple digits', () => {
  const { getByText, getByPlaceholderText } = render(
    <NavigationContainer>
      <DisciplineScreen />
    </NavigationContainer>
  );
  const yearsInput = getByPlaceholderText('Enter years of experience');

  fireEvent.changeText(yearsInput, '111');
  const continueButton = getByText('Continue');
  fireEvent.press(continueButton);
});
