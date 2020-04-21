const oauthSignature = require('oauth-signature');

const TOKEN = '';
const HTTP_POST = 'POST';
const HTTP_PROTOCOL = 'https';

class oAuth1Sign {
  /**
     * @param {String} hostname Your hostname
     * @param {String} consumerKey Your consumer key
     * @param {String} consumerSecret Your consumer secret
     */
  constructor(hostname, consumerKey, consumerSecret) {
    this.hostname = hostname;
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
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
      `${HTTP_PROTOCOL}://${this.hostname}${path}`, // url
      params,
      this.consumerSecret, TOKEN, {
        encodeSignature: false,
      },
    );
  }

  /**
     * Authenticate an oAuth signature for a URL
     *
     * @param {String} path the path of the URL
     * @param {String} params the paramaters of the URL
     */
  authSignature(path, params) {
    const { newOauthSignature } = params;
    delete params.oauthSignature; // remove `oauthSignature` for later comparison
    return this.genSignature(path, params) === newOauthSignature;
  }
}

module.exports = oAuth1Sign;
