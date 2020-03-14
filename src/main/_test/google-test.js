const googleCalendar = require('../classes/googleCalendar')
const config = require('/Users/greg/Documents/Projects/lti.googlemeet/src/main/_test/client_secret.json')
const user = 'imtexpdeveloper@apu.edu'

let calendar = new googleCalendar(config, user)
let dummyCanvas = {
    course_id: 9999
} 
let event = calendar.createEvent(dummyCanvas, 'request')
.then(res => {console.log(res);})
.catch(err => {console.err(err);})