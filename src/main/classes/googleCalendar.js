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
     * Creates an event using Google Calendar API and returns the event
     * 
     * @param {String} calendarId Id of calendar where events will be stored
     * @param {String} requestId Random client generated id 
     * @param {String} event Object of event that is being stored
     */
    async insert(calendarId, requestId, event) {        
        this.calendar.events.insert({
            calendarId: calendarId,
            resource: event,
            conferenceDataVersion: 1
        }).then(event => {
            return event.data
        }).catch(err => {
            return err
        })
    }

    /**
     * Creates event from Canvas data to be used with Google Calendar API
     * 
     * @param {Object} details 
     */
    createEvent(details) {
        const today = new Date()
        
        let event  = {
            summary: details.sumary,
            description: details.description,
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