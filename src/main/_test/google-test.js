const googleCalendar = require('../classes/googleCalendar')
const config = require('/Users/greg/Documents/Projects/lti.googlemeet/src/main/_test/client_secret.json')
const user = 'imtexpdeveloper@apu.edu'

let calendar = new googleCalendar(config, user)

let dummyCanvas = {
    course_id: '9999'
}
let event = calendar.createEvent(dummyCanvas, 'request');

calendar.saveEvent(event, 'apu.edu_ejli52n4u535n3etqhqutf0mbk@group.calendar.google.com')
.then(res => {console.log(res);})
.catch(err => {console.log(err);})