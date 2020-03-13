exports.gMeet = async function gMeet(context) {
  console.log(context.res);
  if (context.requestBody.custom_canvas_course_id !== null && context.requestBody.custom_canvas_course_id !== undefined) {
    context.res
      .status(200)
      .setBody('<html>  <body>  <h1>YouTube Searcher</h1>  <p>Search for a YouTube video below. The first result  is what will be shown whenever anyone loads this app.  </p>  <form id="form">    <input type="text" name="query" id="query"/><button type="submit">I\'m Feeling Lucky < /button>  </form > </body> </html> ');
  } else {
    context.res
      .status(400)
      .setBody('Class Code not specified');
  }
};