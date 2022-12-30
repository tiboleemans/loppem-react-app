class Student {
    constructor(language,
                period,
                firstNameStudent,
                lastNameStudent,
                gender,
                birthday) {
        this.language = language;
        this.period = period;
        this.firstNameStudent = firstNameStudent;
        this.lastNameStudent = lastNameStudent;
        this.gender = gender;
        this.birthday = birthday;
    }

    static fromApi(data) {
        return new Student(data.language, data.period, data.firstNameStudent, data.lastNameStudent, data.gender, data.birthday)
    }
}

export default Student;