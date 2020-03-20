const env = require("../env.js");
const LtiMeet = require('../classes/LtiMeet.js');

/*
 * This is the controller that would receive the authorization code
 * from Google. It is the controller processing the `redirect_url`
 * after a user successfully authorizes the oAuth scopes on his resouces
 */
exports.oAuthCallback = async function(context) {
    oAuth2Client = env.createOAuthClient();
    // console.log(context);
    await oAuth2Client.getToken(context.params.query.code);
    // console.log(tokens);
    // oAuth2Client.setCredentials(tokens);

    let ltiMeet = new LtiMeet(env.createGCal(oAuth2Client), env.createStoreRepo(context.knex));
    let meet = await ltiMeet.createMeet(context.params.state);

    context.res
        .status(301)
        .setHeader('Location', meet.link);
};
