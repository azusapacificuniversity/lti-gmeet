const { google } = require("googleapis");
const crypto = require('crypto');
const CALENDAR_ID='primary';


class GoogleCalendar {
    /**
     * @param {String} service_account The service account used authorized to create events in the calendar
     * @param {String} private_key An RSA private Key to auth the service account
     * @param {String} cal_user APU email, the user to whon the calendar belongs
     * @param {String} cal_id, the Id of the Calendar where the events are stored
     */
    constructor(oAuth2Client, _logger = console) {
        this.calendar = google.calendar({
            version: "v3",
            auth: oAuth2Client.getClient()
        });

        this.logger = _logger;
    }

    /**
     * Creates an event using Google Calendar API and returns an object
     * containing only 
     *  - class_id (taken from event summary)
     *  - link (hangoutsLink)
     *  - phone
     *  - pin
     * 
     * @param {Object} event Event to be saved into Google Calendar
     */
    async saveEvent(event) {
        return await this.calendar.events.insert({
            calendarId: CALENDAR_ID,
            resource: event,
            conferenceDataVersion: 1
        }).then(event => {
            return {
                class_id: parseInt(event.data.summary),
                link: event.data.hangoutLink,
                phone: event.data.conferenceData.entryPoints[1].uri,
                verification_code: event.data.conferenceData.entryPoints[1].pin
            }
        }).catch(err => {
            throw err
        });
    }

    /**
     * Creates event from Canvas data to be used with Google Calendar API
     *
     * @param {Object} canvas_course_id Course ID coming from POST Request of Canvas LTI
     */
    async createEvent(canvas_course_id) {
        const today = new Date()

        let googleEvent = {
            summary: canvas_course_id,
            description: canvas_course_id,
            start: {
                dateTime: today.toISOString(),
                timeZone: "America/Los_Angeles"
            },
            end: {
                dateTime: today.toISOString(),
                timeZone: "America/Los_Angeles"
            },
            conferenceData: {
                createRequest: {
                    requestId: this.randomValueHex(12)
                }
            },
            visibility: "public"
        }

        let ltiEvent = await this.saveEvent(googleEvent)
            .catch(err => {
                throw err;
            })

        return ltiEvent;
    }

    randomValueHex(len) {
        return crypto
            .randomBytes(Math.ceil(len / 2))
            .toString('hex') // convert to hexadecimal format
            .slice(0, len) // return required number of characters
    }
}

module.exports = GoogleCalendar
