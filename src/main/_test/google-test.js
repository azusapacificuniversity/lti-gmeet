const GoogleCalendar = require('../classes/googleCalendar');
const config = require('/Users/greg/Documents/Projects/lti.googlemeet/src/main/_test/client_secret.json');

const user = 'imtexpdeveloper@apu.edu';

const calendar = new GoogleCalendar(config, user);
const dummyCanvas = {
  course_id: 9999,
};
calendar.createEvent(dummyCanvas, 'request')
  .then((res) => { console.log(res); })
  .catch((err) => { console.err(err); });
