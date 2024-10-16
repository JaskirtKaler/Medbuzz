import React from 'react';
import {render, fireEvent} from '@testing-library/react-native'
import Discipline from '../SurveyPages/Discipline';
import handlePhoneNumberInput from '../SurveyPages/Discipline';
import { NavigationContainer } from '@react-navigation/native';

test('Validate years of experience with single digit', () => {
    const { getByText, getByPlaceholderText } = render(
    <NavigationContainer><Discipline/></NavigationContainer>);
    const yearsInput = getByPlaceholderText('Enter years of experience');

    fireEvent.changeText(yearsInput, '1');
    const continueButton = getByText('Continue');
    fireEvent.press(continueButton);
});

test('Validate years of experience with double digits', () => {
    const { getByText, getByPlaceholderText } = render(
        <NavigationContainer><Discipline/></NavigationContainer>);
    const yearsInput = getByPlaceholderText('Enter years of experience');

    fireEvent.changeText(yearsInput, '11');
    const continueButton = getByText('Continue');
    fireEvent.press(continueButton);
});

test('Validate years of experience does not take trible digits', () => {
    const { getByText, getByPlaceholderText } = render(
        <NavigationContainer><Discipline/></NavigationContainer>);
    const yearsInput = getByPlaceholderText('Enter years of experience');

    fireEvent.changeText(yearsInput, '111');
    const continueButton = getByText('Continue');
    fireEvent.press(continueButton);
});