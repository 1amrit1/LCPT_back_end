const { response } = require("express");
const { insert_1_course, get_all_courses } = require("../Model/courseModel");

module.exports.addCourseFn = function (req, res) {
    console.log("---------------====================== addCourseFn");
    console.log(req.body.courseFormDetails);


    insert_1_course(req.body.courseFormDetails)
    res.send({ msg: "success" })
    // var testDescription = "placeholder descp placeholder descp placeholder descp placeholder descp placeholder descp placeholder descp placeholder descp placeholder descp "


}
module.exports.getAllCoursesFn = async function (req, res) {
    console.log("---------------====================== getAllCoursesFn");


    var response = await get_all_courses()
    console.log(response)
    res.send(response)


}
