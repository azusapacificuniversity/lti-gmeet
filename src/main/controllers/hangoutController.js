const env = require("../env.js");
const LtiMeet = require('../classes/LtiMeet.js');

exports.ltiHtmlPost = async function(context) {
    context.res.setHeader('Content-Type', 'text/html');

    let knex = context.extraContext.knex;
    let course_id = context.requestBody.custom_canvas_course_id;
    let roles = context.requestBody.roles ? context.requestBody.roles : 'student';

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

    // Show Authorization page, if Instructor or Administrator
    if (!Array.isArray(context.req.session.courses)) {
        context.req.session.courses = [];
    }

    let courses = context.req.session.courses;
    const allowedRoles = ['Instructor', 'Administrator'];
    const allowAuth = (roles && allowedRoles.some(r => roles.includes(r)));

    if (courses.indexOf(course_id) === -1 && allowAuth)
        courses.push(course_id);

    let view = allowAuth ? "authorize" : "not_ready";
    return context.extraContext.views.getView(view, {
        link: env.createOAuthClient().generateAuthUrl(course_id)
    });
}
