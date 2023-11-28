class School {
  constructor(name, city, years, hours, immersion) {
    this.name = name;
    this.city = city;
    this.years = years;
    this.hours = hours;
    this.immersion = immersion;
  }

  static fromApi(school) {
    return new School(school.name, school.city, school.years, school.hours, school.immersion);
  }
}

export default School;