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
    city: '',
    years: '',
    hours: '',
    immersion: '',
  },

  // ExtraInformation
  extra: {
    contact: '',
    additionalInfo: '',
    foodInfo: '',
    acceptPictures: false,
    acceptTerms: false
  }
}