const ConnClass = require('../knex/conn.js');
const Store = require('../controllers/storeLookup.js');

const knexConnection = new ConnClass();
const store = new Store(knexConnection);

for (let i = 0; i < 999; i += 1) {
  const event = {
    id: i,
    link: 'https://www.google.com',
    phone: '3238041862',
    pin: 'fghjgfdiuytredrftyh',

  };

  store.saveCourse(event)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.err(err);
    });
}

// This tests if it saves to the database


// This tests if it is able to find the id
// store.findByClassId('12345')
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => {
//     console.err(err)
//   })
