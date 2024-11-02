//add extra info to the object as you see fit but keep it organized

export const UserObject = {
  profilePicture: null,
  idToken: null,
  personalInfo: {
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    professionalSummary: '',
  },
  education: {
    schoolName: '',
    schoolCity: '',
    schoolCountry: '',
    gradDate: {
      month: '',
      year: '',
    },
    degreeType: '',
    fieldOfStudy: '',
  },
  homeAddress: {
    street: '',
    city: '',
    state: '',
    zipcode: '',
  },
  expertise: {
    discipline: '',
    certification: '',
    yearsOfExperience: '',
  },
  identityVerification: {
    DOB: '',
    last4ssn: '',
    legalFirstName: '',
    legalLastName: '',
  },
  uploadedFiles: {
    resume: '',
    license: {
      licenseType: '',
      licenseState: '',
      licenseNumber: '',
      expirationDate: '',
      firstName: '',
      lastName: '',
      licenseFile: '',
    },
    degree: '',
    certifications: '',
    references: '',
    vaccination: '',
  },
  staffRolePrefs: {
    toggle: '',
    startDate: '',
    preferredLocation: '',
    relocate: false,
    desiredPay: '',
    preferredHours: '',
  },
  travelContractsPrefs: {
    toggle: '',
    startDate: '',
    preferredLocation: '',
    relocate: false,
    desiredPay: '',
    preferredHours: '',
  },
  localContractsPrefs: {
    toggle: '',
    startDate: '',
    preferredLocation: '',
    relocate: false,
    desiredPay: '',
    preferredHours: '',
  },
  //currently location preferences are set separately as 
  // locationPreference: {
  //   state: '',
  //   city: '',
  // },
  myJobs: {
    appliedJobs: [
      {
        jobID: '',
        dateApplied: '',
      },
    ],
  },
  messages: [
    {
      messageid: '',
    },
  ],
};
