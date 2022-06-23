var { getHomeCourseRoleData } = require('../Model/homeCourseRoleModel');
var { getAdmUsrCrsData } = require('../Model/userCourseModel');
var { editUserCrsStatus } = require('../Model/userCourseModel');
module.exports.sendHomeCrsRoleData = async (req, res) => {
    var data = [];
    var data = await getHomeCourseRoleData();

    res.send(data);
}

module.exports.sendUserCrsData = async (req, res) => {
    var data = [];
    var data = await getAdmUsrCrsData();

    res.send(data);
}


module.exports.verifyCredentials = async (req, res) => {

    var userId = req.body.userId;
    var courseId = req.body.courseId;
    var validityDate = req.body.validityDate;
    var isURLValid = req.body.isURLValid;

    var data = await editUserCrsStatus(userId, courseId, validityDate, isURLValid);
    console.log(data);
    res.send(data);


}