const TABLE = 'canvas_lti_google_meets';

class StoreLookupRepo {
  /**
     * @param {Object} _knex The database connection for PeopleSoft
     * @param {Object} _logger An optional logger, incase you want to customize your logging output
     */
  constructor(_knex, _logger = console) {
    this.knex = _knex;
    this.logger = _logger;
  }

  /**
     * Save a course to the database
     * containing only
     *  - class_id (Canvas Course ID)
     *  - link (Google Hangouts Link)
     *  - phone (Google Hangouts Phone Number)
     *  - pin (Google Hangouts PIN Number)
     *
     * @param {Object} event Course to be saved into the database
     */
  async saveCourse(event) {
    return this.knex
      .insert({
        class_id: event.class_id,
        link: event.link,
        phone: event.phone,
        verification_code: event.verification_code,
      })
      .into(TABLE)
      .catch((err) => {
        throw err;
      });
  }

  /**
     * Retrives a class from the database via a Canvas Course ID
     *
     * @param {Object} classId Course to search for in the database
     */
  async findByClassId(classId) {
    const result = await this.knex
      .select()
      .from(TABLE)
      .where('class_id', classId)
      .catch((err) => {
        this.logger.error(err);
        throw err;
      });
    return result.length ? result[0] : null; // if length is 0 return null otherwise return the data from the row
  }
}

module.exports = StoreLookupRepo;
