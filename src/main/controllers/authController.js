const env = require("../env.js");
const LtiMeet = require('../classes/LtiMeet.js');

/*
 * This is the controller that would receive the authorization code
 * from Google. It is the controller processing the `redirect_url`
 * after a user successfully authorizes the oAuth scopes on his resouces
 */
exports.oAuthCallback = async function(context) {
    let courses = Array.isArray(context.req.session.courses) ?
        context.req.session.courses :
        [];
    let course_id = context.params.query.state;

    //Authenticate user, no course_id means no session
    if (!courses.includes(course_id)) {
        context.res.status(401);
        return;
    }

    oAuth2Client = env.createOAuthClient();
    const {
        tokens
    } = await oAuth2Client.getToken(context.params.query.code);
    await oAuth2Client.setCredentials(tokens);

    let ltiMeet = new LtiMeet(env.createGCal(oAuth2Client), env.createStoreRepo(context.knex));
    let meet = await ltiMeet.createMeet(course_id);

    context.res
        .status(302)
        .setHeader('Location', meet.link);
};