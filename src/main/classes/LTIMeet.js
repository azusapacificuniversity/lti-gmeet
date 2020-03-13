const calendarId = '';

class LTIMeet {

    constructor(calendar, store) {
        this.calendar = calendar;
        this.store = store;
    }

    async meetByClassId(classId) {
        let meet = this.store.findByClassId(classId);
        if (!meet) {
            meet = this.calendar.createEvent({course_id: classId}, classId);
            await this.calendar.saveEvent(meet, calendarId);
            this.store.saveCourse(meet);
        }
        return meet;
    }

}
