import React, { useState } from 'react';
import ParentPage from './ParentPage'
import { categoryOptions, certificationMap} from '../mapVariables/optionsData.tsx';
type CategoryType = keyof typeof certificationMap; // Create a union type from the certificationMap keys
interface OptionType {
  label: string;
  value: string;
}
const CertificatesScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [certificationOptions, setCertificationOptions] = useState<OptionType[]>(categoryOptions); // Initially, it holds categories
  const [selectedCertification, setSelectedCertification] = useState<string | null>(null);
  const [isCategorySelected, setIsCategorySelected] = useState(false); // Boolean to check if category is selected

  // Handle the dropdown change
  const handleDropdownChange = (value: string) => {
    if (value === 'back') {
      // Handle the case where the user wants to go back to category selection
      resetDropdown();
    } else if (!isCategorySelected) {
      // User selected a category, now we show certifications
      setSelectedCategory(value as CategoryType);
      const certifications = certificationMap[value as CategoryType] || [];
      setCertificationOptions([{ label: 'Back to Category', value: 'back' }, ...certifications]); // Add the back option to certifications
      setIsCategorySelected(true); // Indicate that category is selected
    } else {
      // User selected a certification
      setSelectedCertification(value);
    }
  };

  // Reset the dropdown to category selection
  const resetDropdown = () => {
    setSelectedCategory(null);
    setCertificationOptions(categoryOptions); // Reset options to categories
    setIsCategorySelected(false); // Reset category selection
    setSelectedCertification(null); // Reset selected certification
  };

  return (
    <ParentPage
      progress={40}
      options={certificationOptions} // Dynamically show categories or certifications
      certificate={isCategorySelected ? selectedCertification ?? '' : selectedCategory ?? ''} // Display selected category or certification
      setCertificate={handleDropdownChange} // Handle change for category and certification
      title={isCategorySelected ? 'Select Certification' : 'Select Certification Category'} // Change title based on current selection
      nextScreen="Licenses" // Assuming this navigates to the license screen
    />
  );
};

export default CertificatesScreen;