const env = require("../env.js");
const LtiMeet = require('../classes/LtiMeet.js');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

exports.ltiHtmlPost = function(context) {
    context.res.setHeader('Content-Type', 'text/html');
    return lti(context.knex, context.requestBody.custom_canvas_course_id, context);
}

exports.ltiHtmlGet = function(context) {
    context.res.setHeader('Content-Type', 'text/html');
    return lti(context.knex, context.params.query.course_id, context);
}

async function lti(knex, course_id, context) {
    let ltiMeet = new LtiMeet(env.createGCal(), env.createStoreRepo(knex));
    let meet = await ltiMeet.findMeetByClassId(course_id);

    if (meet) {
        context.res
            .status(301)
            .setHeader('Location', meet.link);
        return;
    }
    let pathStr = context.roles.includes('Instructor') ? "/../views/authorize.html" : "/../views/notReady.html";
    let source = fs.readFileSync(path.resolve(__dirname + pathStr)).toString();
    let template = handlebars.compile(source);

    return template(meet);
}