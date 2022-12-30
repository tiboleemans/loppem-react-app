class School {
    constructor(nameSchool,
                streetSchool,
                houseNrSchool,
                busNrSchool,
                citySchool,
                zipSchool,
                titleProfSchool,
                nameProfSchool,
                yearsSchool,
                hoursSchool,
                immersionSchool,
                reportSchool) {
        this.nameSchool = nameSchool;
        this.streetSchool = streetSchool;
        this.houseNrSchool = houseNrSchool;
        this.busNrSchool = busNrSchool;
        this.citySchool = citySchool;
        this.zipSchool = zipSchool;
        this.titleProfSchool = titleProfSchool;
        this.nameProfSchool = nameProfSchool;
        this.yearsSchool = yearsSchool;
        this.hoursSchool = hoursSchool;
        this.immersionSchool = immersionSchool;
        this.reportSchool = reportSchool;
    }

    static fromApi(data) {
        return new School(data.nameSchool, data.streetSchool, data.houseNrSchool, data.busNrSchool, data.citySchool, data.zipSchool, data.titleProfSchool, data.nameProfSchool, data.yearsSchool, data.hoursSchool, data.immersionSchool, data.reportSchool);
    }
}

export default School;