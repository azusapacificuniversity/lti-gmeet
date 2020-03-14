const knex_json = require('../_test/knexdev.json');
const ConnClass = require('../knex/conn.js');
const Store = require('../controllers/storeLookup.js');

let knexConnection = new ConnClass(knex_json.dbtype, knex_json.hostname, knex_json.database, knex_json.username, knex_json.password)
let store = new Store(knexConnection);
let event = {
    id: 11,
    link: 'https://www.google.com',
    phone: '3238041862',
    pin: 'pin'
    
}
// This tests if it saves to the database
store.saveCourse(event)
.then(res => { console.log(res)})
.catch(err => { console.err(err)})

// This tests if it is able to find the id
store.findByClassId('12345')
.then(res => { console.log(res)})
.catch(err => { console.err(err)})