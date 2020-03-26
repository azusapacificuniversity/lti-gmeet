const env = require("../env.js");
const LtiMeet = require('../classes/LtiMeet.js');
const fs = require('fs');
const path = require('path');

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
    if (meet) {
        context.res
            .status(302)
            .setHeader('Location', meet.link);
    }

    let view = roles && roles.includes('Instructor' || 'Administrator') ? "authorize" : "not_ready";
    return context.extraContext.views.getView(view, {
        link: env.createOAuthClient().generateAuthUrl(course_id)
    });
}