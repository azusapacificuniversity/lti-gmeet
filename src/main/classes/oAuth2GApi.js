const {
  google,
} = require('googleapis');

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
];

class Auth {
  /**
     * @param {String} clientId Your client ID
     * @param {String} clientSecret Your client secret
     * @param {String} redirectUrl Your redirect URL
     */
  constructor(clientId, clientSecret, redirectUrl) {
    this.oAuth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUrl,
    );
  }

  /**
     * Generate a url that asks for permission to access the users Google Calendar
     *
     * @param {String} state A Canvas Course ID
     */
  generateAuthUrl(state) {
    return this.oAuth2Client.generateAuthUrl({
      scope: SCOPES,
      state,
    });
  }

  /**
     * Retrives the access and refresh oAuth tokens
     *
     * @param {String} code Authorization code
     */
  async getToken(code) {
    return this.oAuth2Client.getToken(code);
  }

  /**
     * Sets the oAuth credentials using the access and refresh tokens
     *
     * @param {String} tokens Access and refresh tokens
     */
  setCredentials(tokens) {
    this.oAuth2Client.setCredentials(tokens);
  }

  /**
     * Retrives the oAuth client
     */
  getClient() {
    return this.oAuth2Client;
  }
}


module.exports = Auth;
