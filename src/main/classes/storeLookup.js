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
            .catch(err => {
                throw err;
            });
    }

    async findByClassId(classId) {
        var result = await this.knex
            .select()
            .from(TABLE)
            .where('class_id', classId)
            .catch(err => {
                this.logger.error(err)
                throw err
            });
        return result.length ? result[0] : null;
    }
}

module.exports = StoreLookupRepo;
