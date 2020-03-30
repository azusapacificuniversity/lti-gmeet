const {
    google
} = require('googleapis');
const SCOPES = [
    "https://www.googleapis.com/auth/calendar"
];

class Auth {
    constructor(client_id, client_secret, redirect_url) {
        this.oAuth2Client = new google.auth.OAuth2(
            client_id,
            client_secret,
            redirect_url
        );
    }

    generateAuthUrl(state) {
        return this.oAuth2Client.generateAuthUrl({
            scope: SCOPES,
            state: state
        });
    }

    async getToken(code) {
        return await this.oAuth2Client.getToken(code);
    }

    setCredentials(tokens) {
        this.oAuth2Client.setCredentials(tokens);
    }

    getClient() {
        return this.oAuth2Client;
    }
}


module.exports = Auth;