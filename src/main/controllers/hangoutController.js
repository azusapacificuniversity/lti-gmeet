exports.gMeet = async function gMeet(context) {
  if (context.params.body.canvas_course_id !== null && context.params.body.canvas_course_id !== undefined) {

  } else {
    context.res
      .status(400)
      .setBody('Class Code not specified');
  }
};