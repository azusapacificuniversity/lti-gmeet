const knex = require('knex');
const assert = require('assert').strict;

class KnexConnection {
    constructor(_dbtype, _host, _db, _user, _pwd, _logger = console) {
        return knex({
            client: _dbtype,
            connection: {
                host: _host,
                user: _user,
                password: _pwd,
                database: _db
            },
            pool: { min: 0, max: 7 },
            log: _logger
        });
    }
}

module.exports = KnexConnection;
