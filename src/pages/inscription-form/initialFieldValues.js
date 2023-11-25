export const initialFieldValues = {
  id: '',
  // StudentInformation
  student: {
    language: '',
    period: '',
    firstName: '',
    lastName: '',
    gender: '',
    birthdate: null,
  },
  // ParentInformation
  parent: {
    firstName: '',
    lastName: '',
    email: '',
    relation: '',
    language: '',
    street: '',
    houseNr: '',
    busNr: '',
    city: '',
    zipCode: '',
    gsm: '',
    gsm2: '',
  },

  // SchoolInformation
  school: {
    name: '',
    street: '',
    houseNr: '',
    busNr: '',
    city: '',
    zip: '',
    titleProf: '',
    nameProf: '',
    years: '',
    hours: '',
    immersion: '',
  },

  // ExtraInformation
  extra: {
    referral: '',
    contact: '',
    additionalInfo: '',
    foodInfo: '',
    interest: '',
    acceptPictures: false,
    acceptTerms: false
  }
}