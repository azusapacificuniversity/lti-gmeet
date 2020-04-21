const {
    google
} = require('googleapis');
const SCOPES = [
    "https://www.googleapis.com/auth/calendar"
];

class Auth {
    /**
     * @param {String} client_id Your client ID
     * @param {String} client_secret Your client secret
     * @param {String} redirect_url Your redirect URL
     */
    constructor(client_id, client_secret, redirect_url) {
        this.oAuth2Client = new google.auth.OAuth2(
            client_id,
            client_secret,
            redirect_url
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
            state: state
        });
    }

    /**
     * Retrives the access and refresh oAuth tokens
     *
     * @param {String} code Authorization code
     */
    async getToken(code) {
        return await this.oAuth2Client.getToken(code);
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