import React, { useState } from 'react';
import ParentPage from './ParentPage'

const CertificatesScreen = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    { label: 'ACLS', value: 'ACLS' },
    { label: 'BLS', value: 'BLS' },
    { label: 'Cert3', value: 'Cert3' },
    { label: 'Cert4', value: 'Cert4' },
    { label: 'Cert5', value: 'Cert5' },
    { label: 'Bla', value: 'Bla' },
    { label: 'Duende', value: 'Duende' },
    { label: 'None', value: 'Select Certificates ▼' },
  ];

  return (
    <ParentPage
      progress={40}
      options={options}
      certificate={selectedOption}
      setCertificate={setSelectedOption}
      title="Select Certificates"
      nextScreen="Licenses"
    />
  );
};

export default CertificatesScreen;