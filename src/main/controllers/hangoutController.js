exports.gMeet = async function gMeet(context) {
  console.log(context.requestBody);
  if (context.requestBody.custom_canvas_course_id !== null && context.requestBody.custom_canvas_course_id !== undefined) {
    context.res
      .status(200)
      .setBody(context.requestBody.custom_canvas_course_id);
  } else {
    context.res
      .status(400)
      .setBody('Class Code not specified');
  }
};