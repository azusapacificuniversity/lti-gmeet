class mockGoogleCalendar {

    constructor(arr) {
        this.arr = arr;
    }

    async saveEvent(event, calendarId) {
        this.arr.push({
            calendarId: calendarId,
            resource: event,
            conferenceDataVersion: 1
        });
        return {
            class_id: event.summary,
            link: 'http://meet.google.com/abc-fed-xyz',
            phone: '+1 626-777-7777',
            pin: '971376278'
        };
    }

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

module.exports = mockGoogleCalendar;
