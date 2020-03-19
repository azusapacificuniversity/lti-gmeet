require('dotenv').config();
const util = require('util');
const knex = require('./knex/conn.js');
const GoogleCalendar = require('./classes/googleCalendar.js');
const OAuth2Client = require('./auth.js');
const StoreLookupRepo = require('./classes/storeLookup.js');
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

function createGCal(oAuth2Client=createOAuthClient(), _logger = console) {
    return new GoogleCalendar(oAuth2Client, _logger);
}

function createOAuthClient(_logger = console) {
    return new OAuth2Client(
        process.env.GCAL_OAUTH_CLIENT_ID,
        process.env.GCAL_OAUTH_CLIENT_SECRET,
        createRedirectURL()
    );
}

function createRedirectURL() {
    let hostname = process.env.HOSTNAME;
    return `https://{{hostname}}/api/v1/oauthcallback`;
}

module.exports = {
    createStoreRepo,
    createGCal,
    createKnexConn
};
