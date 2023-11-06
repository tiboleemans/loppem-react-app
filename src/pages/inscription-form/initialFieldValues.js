export const initialFieldValues = {
    id: '',
    // StudentInformation
    student: {
        language: '',
        period: '',
        firstNameStudent: '',
        lastNameStudent: '',
        gender: '',
        birthday: null,
    },
    // ParentInformation
    parent: {
        firstNameParent: '',
        lastNameParent: '',
        email: '',
        relation: '',
        siteLanguage: '',
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
        nameSchool: '',
        streetSchool: '',
        houseNrSchool: '',
        busNrSchool: '',
        citySchool: '',
        zipSchool: '',
        titleProfSchool: '',
        nameProfSchool: '',
        yearsSchool: '',
        hoursSchool: '',
        immersionSchool: false,
        reportSchool: false
    },

    extra: {
        // ExtraInformation
        apportedStudent: '',
        contact: '',
        additionalInfo: '',
        foodInfo: '',
        interest: '',
        acceptPictures: false,
        acceptTerms: false
    }
}