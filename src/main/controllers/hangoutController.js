const env = require("../env.js");
const LtiMeet = require('../classes/LtiMeet.js');

exports.gMeet = async function gMeet(context) {
    ltiMeet = new LtiMeet(env.createGCal(), env.createStoreRepo(context.knex));
    let meet = await ltiMeet.meetByClassId(context.requestBody.custom_canvas_course_id);
    context.res
        .status(301)
        .setHeader('Location', meet.link);
};