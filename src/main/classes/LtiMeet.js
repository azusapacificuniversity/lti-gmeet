class LtiMeet {

    constructor(calendar, store) {
        this.calendar = calendar;
        this.store = store;
    }

    async meetByClassId(classId) {
        let meet = await this.store.findByClassId(classId);
        if (!meet) {
            console.log(`meet not found, creating ${classId}`);
            meet = await this.calendar.createEvent(classId);
            this.store.saveCourse(meet);
        } else {
            console.log(`${classId} meet found`);
        }
        return meet;
    }


}

module.exports = LtiMeet;
