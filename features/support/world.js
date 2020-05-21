const { setWorldConstructor } = require('cucumber');
const MockGoogleCalendar = require('./mockGoogleCalendar.js');
const MockStoreLookupRepo = require('./mockStoreLookupRepo.js');
const LtiMeet = require('../../src/main/classes/LtiMeet.js');

class LtiGoogleMeetWorld {
  constructor() {
    this.arrCalendar = [];
    this.arrStore = [];
    this.cal = new MockGoogleCalendar(this.arrCalendar);
    this.repo = new MockStoreLookupRepo(this.arrStore);
    this.ltiMeet = new LtiMeet(this.cal, this.repo);
  }

  async findMeetByClassId(classId) {
    await this.ltiMeet.findMeetByClassId(classId);
  }
}

setWorldConstructor(LtiGoogleMeetWorld);
