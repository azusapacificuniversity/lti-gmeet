const TABLE = 'canvas_lti_google_meets';

class StoreLookupRepo {
    constructor(_knex, _logger = console) {
        this.knex = _knex;
        this.logger = _logger;
    }

    async saveCourse(event) {
        return await this.knex
            .insert({
                class_id: event.class_id,
                link: event.link,
                phone: event.phone,
                verification_code: event.verification_code
            })
            .into(TABLE)
            .then(result => {
                return result;
            })
            .catch(err => {
                throw err;
            });
    }

    async findByClassId(classId) {
        return await this.knex
            .select()
            .from(TABLE)
            .where('class_id', classId)
            .then(result => {
                return result
            }).catch(err => {
                throw err
            })
    }
}

module.exports = StoreLookupRepo;
