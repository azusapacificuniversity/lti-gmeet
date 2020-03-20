const env = require("../env.js");
const LtiMeet = require('../classes/LtiMeet.js');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

exports.ltiHtmlPost = function(context) {
    context.res.setHeader('Content-Type', 'text/html');
    return lti(context.knex, context.requestBody.custom_canvas_course_id, context.requestBody.roles, context);
}

exports.ltiHtmlGet = function(context) {
    context.res.setHeader('Content-Type', 'text/html');
    return lti(context.knex, context.params.query.course_id, context.params.query.roles, context);
}

async function lti(knex, course_id, roles = 'student', context) {
    let ltiMeet = new LtiMeet(env.createGCal(), env.createStoreRepo(knex));
    let meet = await ltiMeet.findMeetByClassId(course_id);
    console.log(meet);
    if (meet) {
        context.res
            .status(301)
            .setHeader('Location', meet.link);
        return;
    }
    console.log(env.createOAuthClient().generateAuthUrl(course_id));
    let pathStr = roles && roles.includes('Instructor') ? "/../views/authorize.html" : "/../views/notReady.html";
    let source = fs.readFileSync(path.resolve(__dirname + pathStr)).toString();
    let template = handlebars.compile(source);
    let data = {
        link: env.createOAuthClient().generateAuthUrl(course_id)
    };

    return template(data);
}
