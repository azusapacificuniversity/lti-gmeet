const fs = require('fs');
const path = require('path');

/*
 * This is the controller that returns the LTI configuration XML for Canvas to use
 */
exports.xmlCallback = async function(context) {
    context.res.setHeader('Content-Type', 'text/xml');
    return (await fs.readFileSync(path.resolve(__dirname, "../lti-config.xml"))).toString();
}