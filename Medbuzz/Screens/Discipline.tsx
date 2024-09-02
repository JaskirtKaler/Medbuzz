import React, { useState } from 'react';
import ParentPage from './ParentPage'
import Navigation from '../Components/Navigation';

const DisciplineScreen = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    { label: 'Registered Nurse', value: 'Registered Nurse' },
    { label: 'Licensed Practical Nurse', value: 'Licensed Practical Nurse' },
    { label: 'CMA', value: 'CMA' },
    { label: 'Faculty Staff', value: 'Faculty Staff' },
    { label: 'blah', value: 'blah' },
    { label: 'blahblah', value: 'blahblah' },
    { label: 'blahblahblah', value: 'blahblahblah' },
    { label: '---', value: '---' },
  ];

 

  return (
    <ParentPage
      progress={20}
      options={options}
      discipline={selectedOption}
      setDiscipline={setSelectedOption}
      title="What's your discipline?"
      nextScreen="Certificates"
    />
  );
};

export default DisciplineScreen;