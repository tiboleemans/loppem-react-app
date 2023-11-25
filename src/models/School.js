class School {
  constructor(name, street, houseNr, busNr, city, zip, titleProf, nameProf, years, hours, immersion) {
    this.name = name;
    this.street = street;
    this.houseNr = houseNr;
    this.busNr = busNr;
    this.city = city;
    this.zip = zip;
    this.titleProf = titleProf;
    this.nameProf = nameProf;
    this.years = years;
    this.hours = hours;
    this.immersion = immersion;
  }

  static fromApi(school) {
    return new School(school.name, school.street, school.houseNr, school.busNr, school.city, school.zip, school.titleProf, school.nameProf, school.years, school.hours, school.immersion);
  }
}

export default School;