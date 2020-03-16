const { google } = require("googleapis");
var crypto = require('crypto');
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

class GoogleCalendar {
    /**
     * @param {Object} config Service credentials used for Google API, specifically client email and private key
     * @param {String} user APU email
     * @param {String} calendarId, the Id of the Calendar where the events are stored
     */
    constructor(config, user, calendarId) {
        this.jwtClient = new google.auth.JWT(
            config.client_email,
            null,
            config.private_key,
            SCOPES,
            user
        );

        this.calendar = google.calendar({
            version: "v3",
            auth: this.jwtClient
        });

        this.calendarId = calendarId;
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
     * @param {String} calendarId Id of calendar where events will be stored
     */
    async saveEvent(event, calendarId) {
        return await this.calendar.events.insert({
            calendarId: calendarId,
            resource: event,
            conferenceDataVersion: 1
        }).then(async event => {
            return {
                class_id: parseInt(event.data.summary),
                link: event.data.hangoutLink,
                phone: event.data.conferenceData.entryPoints[1].uri,
                verification_code: event.data.conferenceData.entryPoints[1].pin
            }
        }).catch(err => { throw err });
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
                    requestId: randomValueHex(12)
                }
            }
        }

        let ltiEvent = await this.saveEvent(googleEvent, this.calendarId)
            .then(storedEvent => { return storedEvent; })
            .catch(err => { return err;})

        return ltiEvent;
    }

    static randomValueHex(len) {
      return crypto
        .randomBytes(Math.ceil(len / 2))
        .toString('hex') // convert to hexadecimal format
        .slice(0, len) // return required number of characters
    }
}

module.exports = GoogleCalendar
