class StoreLookupRepo {
    constructor(_knex) {
        this.knex = _knex;
        this.db = 'canvas_lti_google_meets';
    }

    async saveCourse(event) {
        return await this.knex
            .insert({class_id: event.class_id, link: event.link, phone: event.phone, verification_code: event.verification_code})
            .into(this.db)
            .then(result => {
                return result;
            })
            .catch(err => {
                return err;
            });
    }

    async findByClassId(classId) {
        return await this.knex
            .select()
            .from(this.db)
            .where('class_id', classId)
            .then(result => {
                return result
            }).catch(err => {
                return err
            })
    }
}

module.exports = StoreLookupRepo;
