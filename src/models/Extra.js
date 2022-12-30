class Extra {
    constructor(apportedStudent,
                contact,
                additionalInfo,
                foodInfo,
                interest,
                acceptPictures,
                acceptTerms) {
        this.apportedStudent = apportedStudent;
        this.contact = contact;
        this.additionalInfo = additionalInfo;
        this.foodInfo = foodInfo;
        this.interest = interest;
        this.acceptPictures = acceptPictures;
        this.acceptTerms = acceptTerms;
    }

    static fromApi(data) {
        return new Extra(data.apportedStudent, data.contact, data.additionalInfo, data.foodInfo, data.interest, data.acceptPictures, data.acceptTerms)
    }
}

export default Extra;