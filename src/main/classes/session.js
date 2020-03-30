const expressSess = require('express-session');
var MySQLStore = require('express-mysql-session')(expressSess);

const MySQLoptions = {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    schema: {
        tableName: 'canvas_lti_sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires_date',
            data: 'custom_data'
        }
    }
};

module.exports = expressSess({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore(MySQLoptions),
    cookie: {
        path: '/',
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60
    }
});
