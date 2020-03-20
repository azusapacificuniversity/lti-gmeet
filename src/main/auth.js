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
        // console.log(code);
        this.oAuth2Client.getToken(code, (err, tokens) => {
            if (err) {
                console.error('Error getting oAuth tokens:');
                throw err;
            }
            this.oAuth2Client.credentials = tokens;
            console.log('Authentication successful!');
        });
        // return (await this.oAuth2Client.getToken(code));
    }

    setCredentials(tokens) {
        this.oAuth2Client.setCredentials(tokens);
    }
}


module.exports = Auth;
