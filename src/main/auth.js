const {
    google
} = require('googleapis');
const SCOPES = [
    "https://www.googleapis.com/auth/calendar"
];

class Auth {
    constructor(client_id, client_secret, redirect_url) {
        this.oAuth2Client = google.auth.OAuth2(
            client_id,
            client_secret,
            redirect_url
        );
        return this;
    }

    generateAuthUrl(state) {
        return this.oauth2Client.generateAuthUrl({
            scope: SCOPES,
            state: state
        });
    }

}


module.exports = Auth;
