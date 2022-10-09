class Inscription {
    constructor(
        id,
        sitelanguage,
        language,
        period,
        firstNameStudent,
        lastNameStudent,
        gender,
        birthday,
        firstNameParent,
        lastNameParent,
        email,
        relation,
        street,
        houseNr,
        busNr,
        city,
        zipCode,
        gsm,
        gsm2,
        nameSchool,
        streetSchool,
        houseNrSchool,
        busNrSchool,
        citySchool,
        zipSchool,
        titleProfSchool,
        nameProfSchool,
        yearsSchool,
        hoursSchool,
        immersionSchool,
        reportSchool,
        apportedStudent,
        contact,
        additionalInfo,
        foodInfo,
        interest,
        acceptPictures,
        acceptTerms) {
        this.id = id;
        this.sitelanguage = sitelanguage;
        this.language = language;
        this.period = period;
        this.firstNameStudent = firstNameStudent;
        this.lastNameStudent = lastNameStudent;
        this.gender = gender;
        this.birthday = birthday;
        this.firstNameParent = firstNameParent;
        this.lastNameParent = lastNameParent;
        this.email = email;
        this.relation = relation;
        this.street = street;
        this.houseNr = houseNr;
        this.busNr = busNr;
        this.city = city;
        this.zipCode = zipCode;
        this.gsm = gsm;
        this.gsm2 = gsm2;
        this.nameSchool = nameSchool;
        this.streetSchool = streetSchool;
        this.houseNrSchool = houseNrSchool;
        this.busNrSchool = busNrSchool;
        this.citySchool = citySchool;
        this.zipSchool = zipSchool;
        this.titleProfSchool = titleProfSchool;
        this.nameProfSchool = nameProfSchool;
        this.yearsSchool = yearsSchool;
        this.hoursSchool = hoursSchool;
        this.immersionSchool = immersionSchool;
        this.reportSchool = reportSchool;
        this.apportedStudent = apportedStudent;
        this.contact = contact;
        this.additionalInfo = additionalInfo;
        this.foodInfo = foodInfo;
        this.interest = interest;
        this.acceptPictures = acceptPictures;
        this.acceptTerms = acceptTerms;
    }

    static fromApi(data) {
        return new Inscription(data.id, data.sitelanguage, data.language, data.period, data.firstNameStudent, data.lastNameStudent, data.gender, data.birthday, data.firstNameParent, data.lastNameParent, data.email, data.relation, data.street, data.houseNr, data.busNr, data.city, data.zipCode, data.gsm, data.gsm2, data.nameSchool, data.streetSchool, data.houseNrSchool, data.busNrSchool, data.citySchool, data.zipSchool, data.titleProfSchool, data.nameProfSchool, data.yearsSchool, data.hoursSchool, data.immersionSchool, data.reportSchool, data.apportedStudent, data.contact, data.additionalInfo, data.foodInfo, data.interest, data.acceptPictures, data.acceptTerms);
    }
}

export default Inscription;