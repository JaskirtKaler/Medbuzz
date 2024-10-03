/**
 * HOW TO IMPORT VARS
 * import { variableName } from 'path';
 * Label is what is displayed
 * value is what is passed
 */

export const disciplineOptions = [
    { label: 'Registered Nurse', value: 'Registered Nurse' },
    { label: 'Licensed Practical Nurse', value: 'Licensed Practical Nurse' },
    { label: 'Allied Health Professional', value: 'Allied Health Professional' },
    { label: 'CMA', value: 'CMA' },
    { label: 'Certified Nursing Assistant', value: 'Certified Nursing Assistant' },
    { label: 'Faculty Staff', value: 'Faculty Staff' },
    { label: 'Non Health Worker', value: 'Non Health Worker' },
    { label: 'Social Worker', value: 'Social Worker' },
    { label: 'Therapist', value: 'Therapist' },
    { label: 'School-Based Healthcare Professional', value: 'School-Based Healthcare Professional' },
    { label: 'Nurse Practitioner', value: 'Nurse Practitioner' },
    { label: 'Physician Assistant', value: 'Physician Assistant' },
    { label: 'Certified Registered Nurse Anesthetist', value: 'Certified Registered Nurse Anesthetist' },
    { label: 'Advanced Practice Registered Nurse', value: 'Advanced Practice Registered Nurse' }
  ];
export const categoryOptions = [
    { label: 'Allied Health', value: 'Allied Health' },
    { label: 'Advanced Practice RN', value: 'Advanced Practice RN' },
    { label: 'Social Work', value: 'Social Work' },
    { label: 'Nurse Practitioner', value: 'Nurse Practitioner' },
    { label: 'Nursing', value: 'Nursing' },
    { label: 'Therapy', value: 'Therapy' },
    { label: 'CNA', value: 'CNA' },
    { label: 'Non Healthcare', value: 'Non Healthcare' },
    { label: 'CMA', value: 'CMA' },
    { label: 'CRNA', value: 'CRNA' }
  ];
// Maps for each category's certifications
export const certificationMap = {
    'Allied Health': [
      { label: 'Certified Medical Assistant (CMA)', value: 'Certified Medical Assistant (CMA)' },
      { label: 'Certified Phlebotomy Technician (CPT)', value: 'Certified Phlebotomy Technician (CPT)' },
      { label: 'Certified EKG Technician (CET)', value: 'Certified EKG Technician (CET)' },
      { label: 'Certified Medical Administrative Assistant (CMAA)', value: 'Certified Medical Administrative Assistant (CMAA)' },
      { label: 'Physical Therapy Assistant (PTA)', value: 'Physical Therapy Assistant (PTA)' },
      { label: 'Occupational Therapy Assistant (COTA)', value: 'Occupational Therapy Assistant (COTA)' },
      { label: 'Respiratory Therapist (CRT)', value: 'Respiratory Therapist (CRT)' },
      { label: 'Radiologic Technologist (RT)', value: 'Radiologic Technologist (RT)' },
      { label: 'Diagnostic Medical Sonographer (ARDMS)', value: 'Diagnostic Medical Sonographer (ARDMS)' },
      { label: 'Surgical Technologist (CST)', value: 'Surgical Technologist (CST)' }
    ],
    'Advanced Practice RN': [
      { label: 'Advanced Practice Registered Nurse (APRN)', value: 'Advanced Practice Registered Nurse (APRN)' },
      { label: 'Certified Registered Nurse Anesthetist (CRNA)', value: 'Certified Registered Nurse Anesthetist (CRNA)' },
      { label: 'Certified Nurse Midwife (CNM)', value: 'Certified Nurse Midwife (CNM)' },
      { label: 'Clinical Nurse Specialist (CNS)', value: 'Clinical Nurse Specialist (CNS)' }
    ],
    'Social Work': [
      { label: 'Licensed Clinical Social Worker (LCSW)', value: 'Licensed Clinical Social Worker (LCSW)' },
      { label: 'Licensed Professional Counselor (LPC)', value: 'Licensed Professional Counselor (LPC)' },
      { label: 'Certified Rehabilitation Counselor (CRC)', value: 'Certified Rehabilitation Counselor (CRC)' }
    ],
    'Nurse Practitioner': [
      { label: 'Certified Nurse Practitioner (NP)', value: 'Certified Nurse Practitioner (NP)' },
      { label: 'Pediatric Nurse Practitioner (PNP)', value: 'Pediatric Nurse Practitioner (PNP)' },
      { label: 'Family Nurse Practitioner (FNP)', value: 'Family Nurse Practitioner (FNP)' }
    ],
    'Nursing': [
      { label: 'Registered Nurse (RN)', value: 'Registered Nurse (RN)' },
      { label: 'Licensed Practical Nurse (LPN)', value: 'Licensed Practical Nurse (LPN)' },
      { label: 'Certified Nurse Assistant (CNA)', value: 'Certified Nurse Assistant (CNA)' }
    ],
    'Therapy': [
      { label: 'Certified Physical Therapist (PT)', value: 'Certified Physical Therapist (PT)' },
      { label: 'Certified Occupational Therapist (OT)', value: 'Certified Occupational Therapist (OT)' },
      { label: 'Certified Speech-Language Pathologist (SLP)', value: 'Certified Speech-Language Pathologist (SLP)' }
    ],
    'CNA': [
      { label: 'Certified Nurse Assistant (CNA)', value: 'Certified Nurse Assistant (CNA)' }
    ],
    'Non Healthcare': [
      { label: 'No Certification Required', value: 'No Certification Required' }
    ],
    'CMA': [
      { label: 'Certified Medical Assistant (CMA)', value: 'Certified Medical Assistant (CMA)' }
    ],
    'CRNA': [
      { label: 'Certified Registered Nurse Anesthetist (CRNA)', value: 'Certified Registered Nurse Anesthetist (CRNA)' }
    ]
  };
  export const licenseType = [
    { label: 'Medical Doctor (MD)', value: 'md' },
    { label: 'Doctor of Osteopathic Medicine (DO)', value: 'do' },
    { label: 'Nurse Practitioner (NP)', value: 'np' },
    { label: 'Registered Nurse (RN)', value: 'rn' },
    { label: 'Licensed Practical Nurse (LPN)', value: 'lpn' },
    { label: 'Certified Nursing Assistant (CNA)', value: 'cna' },
    { label: 'Physician Assistant (PA)', value: 'pa' },
    { label: 'Certified Registered Nurse Anesthetist (CRNA)', value: 'crna' },
    { label: 'Certified Nurse Midwife (CNM)', value: 'cnm' },
    { label: 'Pharmacist', value: 'pharmacist' },
    { label: 'Dentist', value: 'dentist' },
    { label: 'Psychologist', value: 'psychologist' },
    { label: 'Physical Therapist (PT)', value: 'pt' },
    { label: 'Occupational Therapist (OT)', value: 'ot' },
    { label: 'Radiologic Technologist', value: 'rt' },
    { label: 'Diagnostic Medical Sonographer', value: 'dms' },
    { label: 'Speech-Language Pathologist (SLP)', value: 'slp' },
    { label: 'Respiratory Therapist (RT)', value: 'respiratory-therapist' },
    { label: 'Emergency Medical Technician (EMT)', value: 'emt' },
    { label: 'Paramedic', value: 'paramedic' },
    { label: 'Licensed Clinical Social Worker (LCSW)', value: 'lcsw' },
    { label: 'Chiropractor', value: 'chiropractor' },
    { label: 'Optometrist', value: 'optometrist' },
    { label: 'Clinical Social Worker', value: 'csw' },
    { label: 'Certified Medical Assistant (CMA)', value: 'cma' },
    { label: 'Certified Phlebotomy Technician (CPT)', value: 'cpt' },
    { label: 'Certified EKG Technician (CET)', value: 'cet' },
    { label: 'Certified Surgical Technologist (CST)', value: 'cst' }
  ];

  export const usaStates = [
    { label: "Alabama", value: "Alabama" },
    { label: "Alaska", value: "Alaska" },
    { label: "Arizona", value: "Arizona" },
    { label: "Arkansas", value: "Arkansas" },
    { label: "California", value: "California" },
    { label: "Colorado", value: "Colorado" },
    { label: "Connecticut", value: "Connecticut" },
    { label: "Delaware", value: "Delaware" },
    { label: "Florida", value: "Florida" },
    { label: "Georgia", value: "Georgia" },
    { label: "Hawaii", value: "Hawaii" },
    { label: "Idaho", value: "Idaho" },
    { label: "Illinois", value: "Illinois" },
    { label: "Indiana", value: "Indiana" },
    { label: "Iowa", value: "Iowa" },
    { label: "Kansas", value: "Kansas" },
    { label: "Kentucky", value: "Kentucky" },
    { label: "Louisiana", value: "Louisiana" },
    { label: "Maine", value: "Maine" },
    { label: "Maryland", value: "Maryland" },
    { label: "Massachusetts", value: "Massachusetts" },
    { label: "Michigan", value: "Michigan" },
    { label: "Minnesota", value: "Minnesota" },
    { label: "Mississippi", value: "Mississippi" },
    { label: "Missouri", value: "Missouri" },
    { label: "Montana", value: "Montana" },
    { label: "Nebraska", value: "Nebraska" },
    { label: "Nevada", value: "Nevada" },
    { label: "New Hampshire", value: "New Hampshire" },
    { label: "New Jersey", value: "New Jersey" },
    { label: "New Mexico", value: "New Mexico" },
    { label: "New York", value: "New York" },
    { label: "North Carolina", value: "North Carolina" },
    { label: "North Dakota", value: "North Dakota" },
    { label: "Ohio", value: "Ohio" },
    { label: "Oklahoma", value: "Oklahoma" },
    { label: "Oregon", value: "Oregon" },
    { label: "Pennsylvania", value: "Pennsylvania" },
    { label: "Rhode Island", value: "Rhode Island" },
    { label: "South Carolina", value: "South Carolina" },
    { label: "South Dakota", value: "South Dakota" },
    { label: "Tennessee", value: "Tennessee" },
    { label: "Texas", value: "Texas" },
    { label: "Utah", value: "Utah" },
    { label: "Vermont", value: "Vermont" },
    { label: "Virginia", value: "Virginia" },
    { label: "Washington", value: "Washington" },
    { label: "West Virginia", value: "West Virginia" },
    { label: "Wisconsin", value: "Wisconsin" },
    { label: "Wyoming", value: "Wyoming" }
];