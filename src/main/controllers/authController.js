const env = require('../env.js');
const LtiMeet = require('../classes/LtiMeet.js');

/*
 * This is the controller that receives the authorization code
 * from Google. It is responsible for processing the `redirect_url`
 * after a user successfully authorizes the oAuth scopes on his resouces
 */
exports.oAuthCallback = async function (context) {
  const courses = Array.isArray(context.req.session.courses)
    ? context.req.session.courses : [];
  const courseId = context.params.query.state;

  // authenticate user, no courseId means no session
  if (!courses.includes(courseId)) {
    context.res.status(401);
    return;
  }

  // configure oAuth2 for the course
  const oAuth2Client = env.createOAuthClient();
  const {
    tokens,
  } = await oAuth2Client.getToken(context.params.query.code);
  await oAuth2Client.setCredentials(tokens);

  // create the Google Calendar event and the Google Meet URL
  const ltiMeet = new LtiMeet(env.createGCal(oAuth2Client), env.createStoreRepo(context.knex));
  const meet = await ltiMeet.createMeet(courseId);

  // redirect the user to the Google Meet URL
  context.res
    .status(302)
    .setHeader('Location', meet.link);
};
