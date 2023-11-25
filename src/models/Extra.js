class Extra {
  constructor(referral, contact, additionalInfo, foodInfo, interest, acceptPictures, acceptTerms) {
    this.referral = referral;
    this.contact = contact;
    this.additionalInfo = additionalInfo;
    this.foodInfo = foodInfo;
    this.interest = interest;
    this.acceptPictures = acceptPictures;
    this.acceptTerms = acceptTerms;
  }

  static fromApi(extra) {
    return new Extra(extra.referral, extra.contact, extra.additionalInfo, extra.foodInfo, extra.interest, extra.acceptPictures, extra.acceptTerms)
  }
}

export default Extra;