const oauthSignature = require('oauth-signature');
const TOKEN = '';
const HTTP_POST = 'POST';
const HTTP_PROTOCOL = 'https';

class oAuth1Sign {
    /**
     * @param {String} hostname Your hostname
     * @param {String} consumer_key Your consumer key
     * @param {String} consumer_secret Your consumer secret
     */
    constructor(hostname, consumer_key, consumer_secret) {
        this.hostname = hostname;
        this.consumer_key = consumer_key;
        this.consumer_secret = consumer_secret;
    }

    /**
     * Generate an oAuth signature for a URL
     *
     * @param {String} path the path of the URL
     * @param {String} params the paramaters of the URL
     */
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

    /**
     * Authenticate an oAuth signature for a URL
     *
     * @param {String} path the path of the URL
     * @param {String} params the paramaters of the URL
     */
    authSignature(path, params) {
        let oauth_signature = params.oauth_signature;
        delete params.oauth_signature; // remove `oauth_signature` for later comparison
        return this.genSignature(path, params) === oauth_signature;
    }
}

module.exports = oAuth1Sign;