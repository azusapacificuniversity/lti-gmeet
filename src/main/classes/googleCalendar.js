const { google } = require("googleapis");
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const USER = "imtexpdeveloper@apu.edu";

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
    }
    
    /**
     * Creates an event using Google Calendar API and returns an object
     * containing only 
     *  - class_id (taken from event summary)
     *  - link (hangoutsLink)
     *  - phone
     *  - pin
     * 
     * @param {String} calendarId Id of calendar where events will be stored
     */
    async saveEvent(event, calendarId) {        
        return await this.calendar.events.insert({
            calendarId: calendarId,
            resource: event,
            conferenceDataVersion: 1
        }).then(event => {
            let customEvent = {
                class_id: event.data.summary,
                link: event.data.hangoutsLink,
                phone: event.data.conferenceData.entryPoints[1].label,
                pin: event.data.conferenceData.entryPoints[1].pin
            }

            return customEvent
            // return event.data
        }).catch(err => {
            return err
        })
    }

    /**
     * Creates event from Canvas data to be used with Google Calendar API
     * 
     * @param {Object} canvasData Response from Canvas API
     * @param {String} requestId Random client generated id 
     * @param {String} event Object of event that is being stored
     */
    createEvent(canvasData, requestId) {
        const today = new Date()
        
        let event  = {
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

        return event;
    }
}

module.exports = GoogleCalendar
