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
    { label: 'Medical Doctor (MD)', value: 'Medical Doctor (MD)' },
    { label: 'Doctor of Osteopathic Medicine (DO)', value: 'Doctor of Osteopathic Medicine (DO)' },
    { label: 'Nurse Practitioner (NP)', value: 'Nurse Practitioner (NP)' },
    { label: 'Registered Nurse (RN)', value: 'Registered Nurse (RN)' },
    { label: 'Licensed Practical Nurse (LPN)', value: 'Licensed Practical Nurse (LPN)' },
    { label: 'Certified Nursing Assistant (CNA)', value: 'Certified Nursing Assistant (CNA)' },
    { label: 'Physician Assistant (PA)', value: 'Physician Assistant (PA)' },
    { label: 'Certified Registered Nurse Anesthetist (CRNA)', value: 'Certified Registered Nurse Anesthetist (CRNA)' },
    { label: 'Certified Nurse Midwife (CNM)', value: 'Certified Nurse Midwife (CNM)' },
    { label: 'Pharmacist', value: 'Pharmacist' },
    { label: 'Dentist', value: 'Dentist' },
    { label: 'Psychologist', value: 'Psychologist' },
    { label: 'Physical Therapist (PT)', value: 'Physical Therapist (PT)' },
    { label: 'Occupational Therapist (OT)', value: 'Occupational Therapist (OT)' },
    { label: 'Radiologic Technologist', value: 'Radiologic Technologist' },
    { label: 'Diagnostic Medical Sonographer', value: 'Diagnostic Medical Sonographer' },
    { label: 'Speech-Language Pathologist (SLP)', value: 'Speech-Language Pathologist (SLP)' },
    { label: 'Respiratory Therapist (RT)', value: 'Respiratory Therapist (RT)' },
    { label: 'Emergency Medical Technician (EMT)', value: 'Emergency Medical Technician (EMT)' },
    { label: 'Paramedic', value: 'Paramedic' },
    { label: 'Licensed Clinical Social Worker (LCSW)', value: 'Licensed Clinical Social Worker (LCSW)' },
    { label: 'Chiropractor', value: 'Chiropractor' },
    { label: 'Optometrist', value: 'Optometrist' },
    { label: 'Clinical Social Worker', value: 'Clinical Social Worker' },
    { label: 'Certified Medical Assistant (CMA)', value: 'Certified Medical Assistant (CMA)' },
    { label: 'Certified Phlebotomy Technician (CPT)', value: 'Certified Phlebotomy Technician (CPT)' },
    { label: 'Certified EKG Technician (CET)', value: 'Certified EKG Technician (CET)' },
    { label: 'Certified Surgical Technologist (CST)', value: 'Certified Surgical Technologist (CST)' }
  ];
  

  export const usaStates = [
    { label: "Alabama", value: "Alabama" },
    { label: "Alaska", value: "Alaska" },
    { label: "Arizona", value: "Arizona" },
    { label: "Arkansas", value: "Arkansas" },
    { label: "California", value: "California" },
    { label: "Colorado", value: "Colorado" },
    { label: "Connecticut", value: "Connecticut" },
    { label: "District of Columbia", value: "District of Columbia"},
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

export const usaCeipalStateInts = [
  { label: "Alabama", value: 3681 },
  { label: "Alaska", value: 3680 },
  { label: "Arizona", value: 3683 },
  { label: "Arkansas", value: 3682 },
  { label: "California", value: 3684 },
  { label: "Colorado", value: 3685 },
  { label: "District of Columbia", value: 3687},
  { label: "Connecticut", value: 3686 },
  { label: "Delaware", value: 3688 },
  { label: "Florida", value: 3689 },
  { label: "Georgia", value: 3690 },
  { label: "Hawaii", value: 3691 },
  { label: "Idaho", value: 3692 },
  { label: "Illinois", value: 3694 },
  { label: "Indiana", value: 3695 },
  { label: "Iowa", value: 3692 },
  { label: "Kansas", value: 3696 },
  { label: "Kentucky", value: 3697 },
  { label: "Louisiana", value: 3698 },
  { label: "Maine", value: 3701 },
  { label: "Maryland", value: 3700 },
  { label: "Massachusetts", value: 3699 },
  { label: "Michigan", value: 3702 },
  { label: "Minnesota", value: 3703 },
  { label: "Mississippi", value: 3705 },
  { label: "Missouri", value: 3704 },
  { label: "Montana", value: 3706 },
  { label: "Nebraska", value: 3709 },
  { label: "Nevada", value: 3713 },
  { label: "New Hampshire", value: 3710 },
  { label: "New Jersey", value: 3711 },
  { label: "New Mexico", value: 3712 },
  { label: "New York", value: 3714 },
  { label: "North Carolina", value: 3707 },
  { label: "North Dakota", value: 3708 },
  { label: "Ohio", value: 3715 },
  { label: "Oklahoma", value: 3716 },
  { label: "Oregon", value: 3717 },
  { label: "Pennsylvania", value: 3718 },
  { label: "Rhode Island", value: 3719 },
  { label: "South Carolina", value: 3720 },
  { label: "South Dakota", value: 3721 },
  { label: "Tennessee", value: 3722 },
  { label: "Texas", value: 3723 },
  { label: "Utah", value: 3724 },
  { label: "Vermont", value: 3726 },
  { label: "Virginia", value: 3725 },
  { label: "Washington", value: 3727 },
  { label: "West Virginia", value: 3729 },
  { label: "Wisconsin", value: 3728 },
  { label: "Wyoming", value: 3730 }
];

// hourly pay for dropdown menu in Job Preference edits
export const hourlyPay = [
  {label: '$20.00 - $25.00', value: '$20.00 - $25.00'},
  {label: '$25.00 - $30.00', value: '$25.00 - $30.00'},
  {label: '$30.00 - $35.00', value: '$30.00 - $35.00'},
  {label: '$35.00 - $40.00', value: '$35.00 - $40.00'},
  {label: '$40.00 - $45.00', value: '$40.00 - $45.00'},
  {label: '$45.00 - $50.00', value: '$45.00 - $50.00'},
  {label: '$50.00+', value: '$50.00+'},
  {label: '---', value: '---'}
];

// Degrees for use with degree Dropdown selector
export const degrees = [
  {label: 'AA', value: 'aa'}, {label: 'AS', value: 'as'},
  {label: 'BA', value: 'ba'}, {label: 'BS', value: 'bs'},
  {label: 'MA', value: 'ma'}, {label: 'MS', value: 'ms'},
  {label: 'PHD', value: 'phd'}
];

// months and years, respectively, for use with graduation date Dropdown selector
export const months = [
  {label: 'January', value: 'january'}, {label: 'February', value: 'february'},
  {label: 'March', value: 'march'}, {label: 'April', value: 'april'},
  {label: 'May', value: 'may'}, {label: 'June', value: 'june'},
  {label: 'July', value: 'july'}, {label: 'August', value: 'august'},
  {label: 'September', value: 'september'}, {label: 'October', value: 'october'},
  {label: 'November', value: 'november'}, {label: 'December', value: 'december'},
];

export const years = [
  {label: '1975', value: '1975'}, {label: '1976', value: '1976'}, 
  {label: '1977', value: '1977'}, {label: '1978', value: '1978'},
  {label: '1979', value: '1979'}, {label: '1980', value: '1980'},
  {label: '1981', value: '1981'}, {label: '1982', value: '1982'},
  {label: '1983', value: '1983'}, {label: '1984', value: '1984'},
  {label: '1985', value: '1985'}, {label: '1986', value: '1986'},
  {label: '1987', value: '1987'}, {label: '1988', value: '1988'},
  {label: '1989', value: '1989'}, {label: '1990', value: '1990'},
  {label: '1991', value: '1991'}, {label: '1992', value: '1992'},
  {label: '1993', value: '1993'}, {label: '1994', value: '1994'},
  {label: '1995', value: '1995'}, {label: '1996', value: '1996'},
  {label: '1997', value: '1997'}, {label: '1998', value: '1998'},
  {label: '1999', value: '1999'}, {label: '2000', value: '2000'},
  {label: '2001', value: '2001'}, {label: '2002', value: '2002'},
  {label: '2003', value: '2003'}, {label: '2004', value: '2004'},
  {label: '2005', value: '2005'}, {label: '2006', value: '2006'},
  {label: '2007', value: '2007'}, {label: '2008', value: '2008'},
  {label: '2009', value: '2009'}, {label: '2010', value: '2010'},
  {label: '2011', value: '2011'}, {label: '2012', value: '2012'},
  {label: '2013', value: '2013'}, {label: '2014', value: '2014'},
  {label: '2015', value: '2015'}, {label: '2016', value: '2016'},
  {label: '2017', value: '2017'}, {label: '2018', value: '2018'},
  {label: '2019', value: '2019'}, {label: '2020', value: '2020'},
  {label: '2021', value: '2021'}, {label: '2022', value: '2022'},
  {label: '2023', value: '2023'}, {label: '2024', value: '2024'},
  {label: '2025', value: '2025'}, {label: '2026', value: '2026'},
  {label: '2027', value: '2027'}, {label: '2028', value: '2028'},
];