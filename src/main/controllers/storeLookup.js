class StoreLookupRepo {
    constructor(_knex) {
        this.knex = _knex;
        this.db = 'canvas_lti_google_meets';
    }

    saveCourse(event) {
        return this.knex
            .insert({class_id: event.id, link: event.hangoutLink, phone: event.phone, pin: event.pin})
            .into(this.db);
    }

    findByClassId(classId) {
        return this.knex
            .select().from(this.db).where('class_id', classId);
    }
}

module.exports = StoreLookupRepo;
