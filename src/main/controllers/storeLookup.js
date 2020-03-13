class StoreLookupRepo {
    constructor(_knex) {
        this.knex = _knex;
    }
    saveCourse(event) {
        return this.knex
            .insert({class_id: event.id, link: event.hangoutLink, phone: event.phone, pin: event.pin})
            .into('canvas_lti_google_meets')
    }
}

module.exports = StoreLookupRepo;
