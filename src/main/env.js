require('dotenv').config();
const util = require('util');
const ldap = require('./ldap/conn.js');
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

function createConn(_logger = console) {
  return createKnexConn(_logger);
}

function createRepository(repo, _logger = console) {
  var Repo = require(util.format('./%s/repos/%s.js', backend, repo))
  return new Repo(createConn(), _logger);
}

module.exports = {
  createLdapConn,
  createRepository
};