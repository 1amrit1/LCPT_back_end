var { getHomeCourseRoleData } = require('../Model/homeCourseRoleModel')
var { getAdmUsrCrsData } = require('../Model/userCourseModel')
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