class Parent {
    constructor(firstNameParent,
                lastNameParent,
                email,
                relation,
                siteLanguage,
                street,
                houseNr,
                busNr,
                city,
                zipCode,
                gsm,
                gsm2) {
        this.firstNameParent = firstNameParent;
        this.lastNameParent = lastNameParent;
        this.email = email;
        this.relation = relation;
        this.siteLanguage = siteLanguage;
        this.street = street;
        this.houseNr = houseNr;
        this.busNr = busNr;
        this.city = city;
        this.zipCode = zipCode;
        this.gsm = gsm;
        this.gsm2 = gsm2;
    }

    static fromApi(data) {
        return new Parent(data.firstNameParent, data.lastNameParent, data.email, data.relation, data.siteLanguage,
            data.siteLanguage, data.street, data.houseNr, data.busNr, data.city, data.zipCode, data.gsm, data.gsm2);
    }
}

export default Parent;