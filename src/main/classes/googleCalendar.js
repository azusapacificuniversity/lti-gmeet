const { google } = require('googleapis');
const crypto = require('crypto');

const CALENDAR_ID = 'primary';
const HOUR_IN_MS = 1 * 60 * 60 * 1000;
const DT_START = new Date(0); // 1970-01-01T00:00:00.000Z
const DT_END = new Date(HOUR_IN_MS); // 1970-01-01T01:00:00.000Z


class GoogleCalendar {
  /**
     * @param {String} service_account The service account authorized to create events in the calendar
     * @param {String} private_key An RSA private Key to auth the service account
     * @param {String} cal_user APU email, the user to whon the calendar belongs
     * @param {String} cal_id, the Id of the Calendar where the events are stored
     */
  constructor(oAuth2Client, _logger = console) {
    this.calendar = google.calendar({
      version: 'v3',
      auth: oAuth2Client.getClient(),
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
    return this.calendar.events.insert({
      calendarId: CALENDAR_ID,
      resource: event,
      conferenceDataVersion: 1,
    }).then((calEvent) => ({
      class_id: parseInt(calEvent.data.summary, 10),
      link: calEvent.data.hangoutLink,
      phone: calEvent.data.conferenceData.entryPoints[1].uri,
      verification_code: calEvent.data.conferenceData.entryPoints[1].pin,
    })).catch((err) => {
      throw err;
    });
  }

  /**
     * Creates event from Canvas data to be used with Google Calendar API
     *
     * @param {Object} canvasCourseId Course ID coming from POST Request of Canvas LTI
     */
  async createEvent(canvasCourseId) {
    const googleEvent = {
      summary: canvasCourseId,
      description: canvasCourseId,
      start: {
        dateTime: DT_START,
      },
      end: {
        dateTime: DT_END,
      },
      conferenceData: {
        createRequest: {
          requestId: this.randomValueHex(12),
        },
      },
    };

    const ltiEvent = await this.saveEvent(googleEvent)
      .catch((err) => {
        throw err;
      });

    return ltiEvent;
  }

  randomValueHex(len) {
    return crypto
      .randomBytes(Math.ceil(len / 2))
      .toString('hex') // convert to hexadecimal format
      .slice(0, len); // return required number of characters
  }
}

module.exports = GoogleCalendar;
