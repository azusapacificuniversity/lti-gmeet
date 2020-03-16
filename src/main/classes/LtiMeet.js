class LtiMeet {

    constructor(calendar, store) {
        this.calendar = calendar;
        this.store = store;
    }

    async meetByClassId(classId) {
        let meet = this.store.findByClassId(classId);
        if (!meet) {
            meet = this.calendar.createEvent(classId);
            await this.calendar.saveEvent(meet, calendarId);
            this.store.saveCourse(meet);
        }
        return meet;
    }

}

module.exports = LtiMeet;
