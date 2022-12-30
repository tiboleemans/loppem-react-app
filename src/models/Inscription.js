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

    static fromApi(data) {
        return new Inscription(data.id, Student.fromApi(data.student), Parent.fromApi(data.parent), School.fromApi(data.school), Extra.fromApi(data.extra));
    }
}

export default Inscription;