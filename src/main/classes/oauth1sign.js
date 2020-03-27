const oauthSignature = require('oauth-signature');
const TOKEN = '';
const HTTP_POST = 'POST';
const HTTP_PROTOCOL = 'https';

class oAuth1Sign {

    constructor(hostname, consumer_key, consumer_secret) {
        this.hostname = hostname;
        this.consumer_key = consumer_key;
        this.consumer_secret = consumer_secret;
    }

    genSignature(path, params) {
        return oauthSignature.generate(
            HTTP_POST,
            HTTP_PROTOCOL + "://" + this.hostname + path, // url
            params,
            this.consumer_secret, TOKEN, {
                encodeSignature: false
            }
        );
    }

    authSignature(path, params) {
        let oauth_signature = params.oauth_signature;
        delete params.oauth_signature;
        return this.genSignature(path, params) === oauth_signature;
    }
}

module.exports = oAuth1Sign;