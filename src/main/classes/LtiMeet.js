class LtiMeet {

    constructor(calendar, store) {
        this.calendar = calendar;
        this.store = store;
    }

    async meetByClassId(classId, role, forceCreate = false) {
        let meet = await this.store.findByClassId(classId);

        // there is a meet! Return the meet
        if (meet) {
            console.log(`meet found for class: ${classId}`);
            return findMeetByClassId(classId);
        }

        console.log(`meet not found for class: ${classId}`);

        if (forceCreate) {
            console.log(`Force creating meet for ${classId}`);
            return createMeet(classId);
        }

        // No meet, can not create
        if (role === 'Instructor') {
            // show authorization page
        } else { // if student
            // show not ready page
        }
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