exports.gMeet = async function gMeet(context) {
  context.res
    .status(301)
    .setHeader('Location', 'https://www.google.com/search?client=firefox-b-1-d&ei=NApsXvfvL9bH-gTijbOACA&q=' + context.requestBody.custom_canvas_course_id);
};