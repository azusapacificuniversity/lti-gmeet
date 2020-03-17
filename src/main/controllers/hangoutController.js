const env = require("../env.js");
const LtiMeet = require('../classes/LtiMeet.js');

exports.gMeet = async function gMeet(context) {
    console.log(context);
    console.log("\n");
    ltiMeet = new LtiMeet(env.createGCal(), env.createStoreRepo(context.knex));
    console.log(ltiMeet);
    console.log("\n");
    let meet = await ltiMeet.meetByClassId(context.requestBody.custom_canvas_course_id);
    console.log(meet);
    context.res
        .status(301)
        .setHeader('Location', meet.link);
};