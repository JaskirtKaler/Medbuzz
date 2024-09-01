import React, { useState } from 'react';
import ParentPage from './ParentPage'

const LicensesScreen = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    { label: 'Registered Nurse (RN)', value: 'Registered Nurse (RN)' },
    { label: 'Licensed Practical Nurse', value: 'Licensed Practical Nurse' },
    { label: 'Medical Doctor (MD)', value: 'Medical Doctor (MD)' },
    { label: 'Doctor of Osteopathic Medicine (DO)', value: 'Doctor of Osteopathic Medicine (DO)' },
    { label: 'Nurse Practitioner (NP)', value: 'Nurse Practitioner (NP)' },
    { label: 'Licensed Practical Nurse (LPN)', value: 'Licensed Practical Nurse (LPN)' },
    { label: 'Physician Assistant (PA)', value: 'Physician Assistant (PA)' },
    { label: 'Pharmacist', value: 'Pharmacist' },
    { label: 'Dentist', value: 'Dentist' },
    { label: 'Psychologist', value: 'Psychologist' },
    { label: 'Physical Therapist', value: 'Physical Therapist' },
    { label: 'Occupational Therapist', value: 'Occupational Therapist' },
    { label: 'Other', value: 'Other' },
    { label: '---', value: '---' },
  ];

  return (
    <ParentPage
      progress={60}
      options={options}
      licenses={selectedOption}
      setLicenses={setSelectedOption}
      title="Type of License"
      nextScreen="LicenseLocation"
    />
  );
};

export default LicensesScreen;