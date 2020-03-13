require('dotenv').config();
const util = require('util');
const ldap = require('./ldap/conn.js');
const knex = require('./knex/conn.js');
const backend = process.env.BACKEND;

function createLdapConn(_logger = console) {
    return new ldap(
        process.env.LDAP_BASE,
        process.env.LDAP_URL,
        process.env.LDAP_DN,
        process.env.LDAP_PWD,
        _logger
    );
}

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
    switch (backend) {
        case 'ldap':
            return createLdapConn(_logger);
            break;
        case 'knex':
            return createKnexConn(_logger);
            break;
    }
    throw new Exception("Invalid BACKEND env variable.");
}

function createRepository(repo, _logger = console) {
    var Repo = require(util.format('./%s/repos/%s.js', backend, repo))
    return new Repo(createConn(), _logger);
}

module.exports = {
    createLdapConn,
    createRepository
};
