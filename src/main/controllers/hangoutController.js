const env = require('../env.js');
const LtiMeet = require('../classes/LtiMeet.js');

/*
 * This is the controller that receives the button click from the LTI
 * in Canvas. It is responsible for processing what webpage to show the user
 * if a Google Meet has not been created
 */
exports.ltiHtmlPost = async function (context) {
  context.res.setHeader('Content-Type', 'text/html');

  const { knex } = context.extraContext;
  const courseId = context.requestBody.custom_canvas_course_id;
  const roles = context.requestBody.roles || 'student';

  // authenticate user
  const { oAuth1Sign } = context.extraContext;
  const oAuthResult = oAuth1Sign.authSignature(`/api/v1${context.route.path}`, context.requestBody);
  if (!oAuthResult) {
    context.res.status(401);
    return;
  }

  // find and return existing Google Meet
  const ltiMeet = new LtiMeet(env.createGCal(), env.createStoreRepo(knex));
  const meet = await ltiMeet.findMeetByClassId(courseId);
  if (meet) {
    context.res
      .status(302)
      .setHeader('Location', meet.link);
    return;
  }

  // check if `context.req.session.courses` is an array
  if (!Array.isArray(context.req.session.courses)) {
    context.req.session.courses = [];
  }

  // check the role of the user
  const { courses } = context.req.session;
  const allowedRoles = ['Instructor', 'Administrator'];
  const allowAuth = (roles && allowedRoles.some((r) => roles.includes(r)));

  // if the role of the user is an Instructor or Administrator add the course to the session
  if (courses.indexOf(courseId) === -1 && allowAuth) courses.push(courseId);

  /**
     * show the authorization webpage, if an Instructor or Administratoror
     * otherwise show the not_ready webpage based on the user role
     */
  const view = allowAuth ? 'authorize' : 'not_ready';
  return context.extraContext.views.getView(view, {
    link: env.createOAuthClient().generateAuthUrl(courseId),
  });
};
