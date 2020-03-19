class LtiMeet {

    constructor(calendar, store) {
        this.calendar = calendar;
        this.store = store;
    }

    async meetByClassId(classId, role, forceCreate = false) {
        let meet = await this.store.findByClassId(classId);

        // there is a meet! Return the meet
        if (meet) {
            console.log(`meet not found, creating ${classId}`);
            return meet;
        }

        console.log(`meet not found ${classId}`);

        if (forceCreate) {
            console.log(`Force creating meet for ${classId}`);
            meet = await this.calendar.createEvent(classId);
            this.store.saveCourse(meet);
            return meet;
        }

        // No meet, can not create
        if (role === 'Instructor') {
            // show authorization page
        } else { // if student
            // show not ready page
        }
    }

}

module.exports = LtiMeet;
