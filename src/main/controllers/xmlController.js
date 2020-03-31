const fs = require('fs');
const path = require('path');

exports.xmlCallback = async function(context) {
    context.res.setHeader('Content-Type', 'text/xml');
    return (await fs.readFileSync(path.resolve(__dirname, "../lti-config.xml"))).toString();
}