class Student {
    constructor(firstName, lastName, period, birthdate, gender, language) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.period = period;
        this.birthdate = birthdate;
        this.gender = gender;
        this.language = language;
    }

    static fromApi(student) {
        return new Student(student.firstName, student.lastName, student.period, student.birthdate, student.gender, student.language)
    }
}

export default Student;