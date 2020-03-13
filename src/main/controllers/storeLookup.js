class StoreLookupRepo {
    constructor(_knex) {
        this.knex = _knex;
    }
    saveCourse(event) {
        return this.toCanonical(this.knex
            .insert({class_id: event.id, link: event.hangoutLink, phone: event.phone, pin: event.pin})
            .into('canvas_lti_google_meets')
    }
    toCanonical(data) {
        return data.map(p => ({
            apuId: p.EMPLID,
            firstName: p.FIRST_NAME,
            apuEmail: p.EMAIL_ADDR
        }));
    }
}

module.exports = StoreLookupRepo;
