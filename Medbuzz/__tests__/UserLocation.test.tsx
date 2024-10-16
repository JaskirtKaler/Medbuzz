import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import UserLocation from '../SurveyPages/UserLocation';
import { NavigationContainer } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

test("Testing valid zip code length", () => {
    const { getByText, getByPlaceholderText } = render(
    <NavigationContainer>
        <UserLocation/>
    </NavigationContainer>);

    const zipField = getByPlaceholderText("Home Zip Code");
    fireEvent.changeText(zipField, "12345");
    expect(getByText('Invalid zip code, cannot proceed')).toBeTruthy();
});

test("Testing valid zip code length", () => {
    const { getByText, getByPlaceholderText } = render(
    <NavigationContainer>
        <UserLocation/>
    </NavigationContainer>);

    const zipField = getByPlaceholderText("Home Zip Code");
    fireEvent.changeText(zipField, "1234");
});