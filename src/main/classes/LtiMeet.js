class LtiMeet {

    constructor(calendar, store) {
        this.calendar = calendar;
        this.store = store;
    }

    async findMeetByClassId(classId) {
        return await this.store.findByClassId(classId);
    }

    async createMeet(classId) {
        let meet = await this.calendar.createEvent(classId);
        this.store.saveCourse(meet);
        return meet;
    }

}

module.exports = LtiMeet;
