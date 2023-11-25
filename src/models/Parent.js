class Parent {
  constructor(firstName, lastName, email, relation, language, street, houseNr, busNr, city, zipCode, gsm, gsm2) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.relation = relation;
    this.language = language;
    this.street = street;
    this.houseNr = houseNr;
    this.busNr = busNr;
    this.city = city;
    this.zipCode = zipCode;
    this.gsm = gsm;
    this.gsm2 = gsm2;
  }

  static fromApi(parent) {
    return new Parent(parent.firstName, parent.lastName, parent.email, parent.relation, parent.language, parent.street, parent.houseNr, parent.busNr, parent.city,
      parent.zipCode, parent.gsm, parent.gsm2);
  }
}

export default Parent;