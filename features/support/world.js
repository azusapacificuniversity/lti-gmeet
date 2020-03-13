const { setWorldConstructor } = require("cucumber");
const mockGoogleCalendar = require("./mockGoogleCalendar.js");
const mockStoreLookupRepo = require("./mockStoreLookupRepo.js");
const LtiMeet = require("./../../src/main/classes/LtiMeet.js");

class LtiGoogleMeetWorld {
    constructor() {
        this.arrCalendar = [];
        this.arrStore = [];
        this.cal = new mockGoogleCalendar(this.arrCalendar);
        this.repo = new mockStoreLookupRepo(this.arrStore);
        this.ltiMeet = new LtiMeet(this.cal, this.repo);
    }

    async meetByClassId(classId){
        this.ltiMeet.meetByClassId(classId);
    }
}

setWorldConstructor(LtiGoogleMeetWorld);
