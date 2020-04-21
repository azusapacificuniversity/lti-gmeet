class LtiMeet {
    /**
     * @param {String} calendar A Google Calendar
     * @param {String} store Your session store/database connection
     */
    constructor(calendar, store) {
        this.calendar = calendar;
        this.store = store;
    }

    /**
     * Find a Google Meet URL by Canvas Course ID
     *
     * @param {String} classId Canvas Course ID
     */
    async findMeetByClassId(classId) {
        return await this.store.findByClassId(classId);
    }

    /**
     * Create a Google Meet URL for a Canvas Course ID
     *
     * @param {String} classId Canvas Course ID
     */
    async createMeet(classId) {
        let meet = await this.calendar.createEvent(classId);
        this.store.saveCourse(meet);
        return meet;
    }

}

module.exports = LtiMeet;