const { insert_1_course } = require("../Model/courseModel");
module.exports.addCourseFn = function (req, res) {
    console.log("---------------====================== addCourseFn");
    console.log(req.body.courseFormDetails);


    insert_1_course(req.body.courseFormDetails)
    res.send({ msg: "success" })
    // var testDescription = "placeholder descp placeholder descp placeholder descp placeholder descp placeholder descp placeholder descp placeholder descp placeholder descp "


}
