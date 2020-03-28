const env = require("../env.js");
const LtiMeet = require('../classes/LtiMeet.js');
const fs = require('fs');
const path = require('path');

exports.ltiHtmlPost = function(context) {
    context.res.setHeader('Content-Type', 'text/html');
    return lti(context.extraContext.knex, context.requestBody.custom_canvas_course_id, context.requestBody.roles, context);
}

exports.ltiHtmlGet = function(context) {
    context.res.setHeader('Content-Type', 'text/html');
    return lti(context.extraContext.knex, context.params.query.course_id, context.params.query.roles, context);
}

async function lti(knex, course_id, roles = 'student', context) {
    // Authenticate user
    let oAuth1Sign = context.extraContext.oAuth1Sign;
    let oAuthResult = oAuth1Sign.authSignature("/api/v1" + context.route.path, context.requestBody);
    if (!oAuthResult) {
        context.res.status(401);
        return;
    }

    // Find and return existing Google Meet
    let ltiMeet = new LtiMeet(env.createGCal(), env.createStoreRepo(knex));
    let meet = await ltiMeet.findMeetByClassId(course_id);
    if (meet) {
        context.res
            .status(302)
            .setHeader('Location', meet.link);
        return;
    }

    // Create and return existing Google Meet
    context.req.session.course_id = course_id;
    let allowedRoles = ['Instructor', 'Administrator'];
    let view = roles && allowedRoles.some(r => roles.includes(r)) ? "authorize" : "not_ready";
    return context.extraContext.views.getView(view, {
        link: env.createOAuthClient().generateAuthUrl()
    });
}
