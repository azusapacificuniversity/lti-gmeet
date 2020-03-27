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

// URL: https://google-meet-lti.apu.edu/hangout/url
//
// oauth_consumer_key: '151980178295-k33eneqdlb5lk6058odu142lasad8bno.apps.googleusercontent.com',
//   oauth_signature_method: 'HMAC-SHA1',
//   oauth_timestamp: '1585326543',
//   oauth_nonce: 'WsS9lRvzsT0fg7O61wF3JG2VezITf8lUJXtAgAz1Xs',
//   oauth_version: '1.0',
//   context_id: 'df300d99740d0bf9cbf1bd243c97ca843267faed',
//   context_label: '123',
//   context_title: 'Google meet test 1',
//   custom_canvas_api_domain: 'canvas.apu.edu',
//   custom_canvas_course_id: '20843',
//   custom_canvas_enrollment_state: 'active',
//   custom_canvas_user_id: '3318',
//   custom_canvas_user_login_id: 'sdemirdjian',
//   custom_canvas_workflow_state: 'available',
//   ext_roles: 'urn:lti:instrole:ims/lis/Instructor,urn:lti:instrole:ims/lis/Student,urn:lti:role:ims/lis/Learner,urn:lti:sysrole:ims/lis/User',
//   launch_presentation_document_target: 'iframe',
//   launch_presentation_height: '400',
//   launch_presentation_locale: 'en',
//   launch_presentation_return_url: 'https://canvas.apu.edu/courses/20843/external_content/success/external_tool_redirect',
//   launch_presentation_width: '800',
//   lis_person_contact_email_primary: 'sdemirdjian@apu.edu',
//   lis_person_name_family: 'Demirdjian',
//   lis_person_name_full: 'Samuel Demirdjian',
//   lis_person_name_given: 'Samuel',
//   lis_person_sourcedid: '001610517',
//   lti_message_type: 'basic-lti-launch-request',
//   lti_version: 'LTI-1p0',
//   oauth_callback: 'about:blank',
//   resource_link_id: 'df300d99740d0bf9cbf1bd243c97ca843267faed',
//   resource_link_title: 'Google Meet',
//   roles: 'Learner',
//   tool_consumer_info_product_family_code: 'canvas',
//   tool_consumer_info_version: 'cloud',
//   tool_consumer_instance_contact_email: 'notifications@instructure.com',
//   tool_consumer_instance_guid: 'NhsLZzyp0zG3ojoyvI2MOG2yWS0D97o45fLxaom1',
//   tool_consumer_instance_name: 'Azusa Pacific University',
//   user_id: 'ace86f1efd8da189f35b9d029a1e9f2ed2c983b4',
//   user_image: 'https://canvas.instructure.com/images/messages/avatar-50.png',
//   oauth_signature: 'sAJdgw3C2yAInxvPO32HiPgSr6o='



// { custom_canvas_course_id: '2085678654', roles: 'Instructor' }
// /hangout/url
// KKuzdXSKthONFuTDjQrgEZgn6eI=


// const params = {
//     consumerKey: 'consumerKey',
//     consumerSecret: 'consumerSecret',
//     unixTimestamp: 1582326295,
//     method: 'get',
//     url: 'https://signature.com',
//     nonce: 'qxBuOTgTb1I',
//     queryParams: {
//         format: 'json',
//         location: 'ca',
//     },
// };
//
// describe('OAuth1 signature', () => {
//     test('should return a valid signature', () => {
//         const actual = signature(params);
//
//         const expectedSignature = 'Y+tPzgo+M06XZFBDJMJvX2FH64U=';
//
//         expect(actual.signature).toBe(expectedSignature);
//     });
//
//     test('should return the initial query params merged with the oauth params', () => {
//         const actual = signature(params);
//
//         const expectedParams = {
//             ...params.queryParams,
//             oauth_consumer_key: 'consumerKey',
//             oauth_nonce: 'qxBuOTgTb1I',
//             oauth_signature_method: 'HMAC-SHA1',
//             oauth_timestamp: 1582326295,
//             oauth_version: '1.0',
//             oauth_signature: 'Y+tPzgo+M06XZFBDJMJvX2FH64U=',
//         };
//
//         expect(actual.params).toEqual(expectedParams);
//     });
// });