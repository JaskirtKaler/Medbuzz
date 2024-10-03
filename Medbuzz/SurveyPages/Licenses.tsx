import React, { useState } from 'react';
import ParentPage from './ParentPage.tsx'
import { licenseType } from '../mapVariables/optionsData.tsx';
const LicensesScreen = () => {
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <ParentPage
      progress={60}
      options={licenseType}
      license={selectedOption}
      setLicense={setSelectedOption}
      title="Type of License"
      nextScreen="LicenseLocation"
    />
  );
};

export default LicensesScreen;