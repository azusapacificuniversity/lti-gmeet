const { google } = require("googleapis");
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

class GoogleCalendar {
    /**
     * @param {Object} config Service credentials used for Google API, specifically client email and private key
     * @param {String} user APU email
     */
    constructor(config, user) {
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

        this.calendarId = 'apu.edu_ejli52n4u535n3etqhqutf0mbk@group.calendar.google.com'
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
            let customEvent = {
                class_id: parseInt(event.data.summary),
                link: event.data.hangoutLink,
                phone: event.data.conferenceData.entryPoints[1].uri,
                verification_code: event.data.conferenceData.entryPoints[1].pin
            }

            return customEvent;
        }).catch(err => {
            return err
        })
    }

    /**
     * Creates event from Canvas data to be used with Google Calendar API
     * 
     * @param {Object} canvasData Response from Canvas API
     * @param {String} requestId Random client generated id 
     */
    async createEvent(canvasData, requestId) {
        const today = new Date()

        let googleEvent = {
            summary: canvasData.course_id,
            description: canvasData.course_id,
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
                    requestId: requestId
                }
            }
        }

        let ltiEvent = await this.saveEvent(googleEvent, this.calendarId)
            .then(storedEvent => { return storedEvent; })
            .catch(err => { return err;})

        return ltiEvent;
    }
}

module.exports = GoogleCalendar
