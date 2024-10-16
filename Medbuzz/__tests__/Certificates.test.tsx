import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Certificiates from '../SurveyPages/Certificates';
import { NavigationContainer } from '@react-navigation/native';

test('Press continue button without selection', () => {
	const { getByText } = render(
	<NavigationContainer>
		<Certificiates/>
	</NavigationContainer>);

	const continueButton = getByText('Continue');
	fireEvent.press(continueButton);
});

test('Drop down selection', () => {
	const { getByTestId } = render(
	<NavigationContainer>
		<Certificiates/>
	</NavigationContainer>);

	const dropDown = getByTestId('dropDownTest');
	fireEvent.press(dropDown);
});