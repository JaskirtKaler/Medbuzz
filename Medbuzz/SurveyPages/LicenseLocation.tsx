import React, { useState } from 'react';
import ParentPage from './ParentPage'
import { usaStates } from '../mapVariables/optionsData';

const LicensesScreen = () => {
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <ParentPage
      progress={80}
      options={usaStates}
      licenseLocation={selectedOption}
      setLicenseLocation={setSelectedOption}
      title="Licensed State"
      nextScreen="UserLocation"
    />
  );
};

export default LicensesScreen;