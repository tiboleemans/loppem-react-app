import Student from "./Student";
import Parent from "./Parent";
import School from "./School";
import Extra from "./Extra";

class Inscription {
    constructor(id, student, parent, school, extra) {
        this.id = id;
        this.student = student;
        this.parent = parent;
        this.school = school;
        this.extra = extra;
    }

    static fromApi(registrationData) {
        return new Inscription(registrationData.id, Student.fromApi(registrationData.student), Parent.fromApi(registrationData.parent),
          School.fromApi(registrationData.school), Extra.fromApi(registrationData.extra));
    }
}

export default Inscription;