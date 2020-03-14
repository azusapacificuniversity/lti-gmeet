const GoogleCalendar = require("../classes/mockGoogleCalendar.js");
const StoreLookupRepo = require("./storeLookupRepo.js");
const LtiMeet = require('../classes/LtiMeet.js');

exports.gMeet = async function gMeet(context) {
  litMeet = new LtiMeet(new GoogleCalendar(this.arrCalendar), new StoreLookupRepo(
  }))
context.res
  .status(301)
  .setHeader('Location', litMeet.meetByClassId(context.requestBody.custom_canvas_course_id));
};