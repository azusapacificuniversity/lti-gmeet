require('dotenv').config();
const util = require('util');
const knex = require('./knex/conn.js');
const backend = process.env.BACKEND;

function createKnexConn(_logger = console) {
    return new knex(
        process.env.DB_TYPE,
        process.env.DB_HOST,
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        _logger
    );
}

function createStoreRepo(_knex = createKnexConn(), _logger = console) {
    return new StoreLookupRepo(_knex, _logger);
}

function createGCal(_logger = console) {
    return new GoogleCalendar(
        process.env.GCAL_SERVICE_ACCOUNT,
        process.env.GCAL_PRIVATE_KEY,
        process.env.GCAL_CALENDAR_USER,
        process.env.GCAL_CALENDAR_ID,
    );
}

module.exports = {
    createStoreRepo,
    createGCal,
    createKnexConn
};
