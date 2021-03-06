require('dotenv').config();
const OAuth1Sign = require('./classes/oauth1sign.js');
const Knex = require('./knex/conn.js');
const GoogleCalendar = require('./classes/googleCalendar.js');
const OAuth2Client = require('./classes/oAuth2GApi.js');
const StoreLookupRepo = require('./classes/storeLookup.js');

/**
 * Creates the Knex instance using environment variables
 *
 * @param {Object} _logger An optional logger, incase you want to customize your logging output
 */
function createKnexConn(_logger = console) {
  return new Knex(
    process.env.DB_TYPE,
    process.env.DB_HOST,
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    _logger,
  );
}

/**
 * Configures Oauth using environment variables
 *
 */
function createOAuth1Sign() {
  return new OAuth1Sign(
    process.env.HOSTNAME,
    process.env.OAUTH_CONSUMER_KEY,
    process.env.OAUTH_CONSUMER_SECRET,
  );
}

/**
 * Creates the connection to storeLookup
 *
 * @param {Object} _knex An optional knex connection, incase you have not created one already
 * @param {Object} _logger An optional logger, incase you want to customize your logging output
 */
function createStoreRepo(_knex = createKnexConn(), _logger = console) {
  return new StoreLookupRepo(_knex, _logger);
}

/**
 * Creates the oAuth2 client for Google Calendar
 */
function createOAuthClient() {
  return new OAuth2Client(
    process.env.GCAL_OAUTH_CLIENT_ID,
    process.env.GCAL_OAUTH_CLIENT_SECRET,
    process.env.GCAL_OAUTH_REDIRECT_URL,
  );
}

/**
 * Creates the connection to Google Calendar
 *
 * @param {Object} oAuth2Client An optional oAuth2 client, incase you have not created one already
 * @param {Object} _logger An optional logger, incase you want to customize your logging output
 */
function createGCal(oAuth2Client = createOAuthClient(), _logger = console) {
  return new GoogleCalendar(oAuth2Client, _logger);
}

module.exports = {
  createOAuthClient,
  createStoreRepo,
  createGCal,
  createKnexConn,
  createOAuth1Sign,
};
