const env = require("../env.js");
const LtiMeet = require('../classes/LtiMeet.js');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

exports.gMeet = async function gMeet(context) {
    let ltiMeet = new LtiMeet(env.createGCal(), env.createStoreRepo(context.knex));
    let meet = await ltiMeet.meetByClassId(context.requestBody.custom_canvas_course_id);
    context.res
        .status(301)
        .setHeader('Location', meet.link);
};

exports.ltiHtml = function(context) {
    return lti(context.knex, context.requestBody.custom_canvas_course_id);
}

exports.ltiHtmlTest = function(context) {
    context.res.setHeader('Content-Type', 'text/html');
    return lti(context.knex, context.params.query.course_id);
}

async function lti (knex, course_id) {
    let ltiMeet = new LtiMeet(env.createGCal(), env.createStoreRepo(knex));
    let meet = await ltiMeet.meetByClassId(course_id);

    var source = fs.readFileSync(path.resolve(__dirname + "/../views/index.html")).toString();
    var template = handlebars.compile(source);


    return template(meet);
}
