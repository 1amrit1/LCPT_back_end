var organizationModel = require('./../Model/organisationModel')
var auditReportModel = require('./../Model/auditReportModel')

var checkUserForComplaintFn = async (user_id, role_id, home_id) => {
    //loop to get all the user's courses in an array

    //get the courses array from home_crs_role by find query on home and role id.

    // outer loop on courses array from home_crs_role to every course_id
    // inner loop on user's courses array => to check if the array home_crs is in it or not.

    var userCrsArr = await auditReportModel.getUserAllCoursesArr(user_id)

    var roleHomeCrsArr = await auditReportModel.getCoursesForRoleHome(home_id, role_id);
    var numNotComplaint = 0;
    console.log(userCrsArr)
    console.log(roleHomeCrsArr)

    for (let i = 0; i < roleHomeCrsArr.length; i++) {
        if (!userCrsArr.includes(roleHomeCrsArr[i])) {
            numNotComplaint++;
        }
    }

    if (numNotComplaint > 0) {
        return false;
    } else {
        return true;
    }



}

var homesComplaintSummary = async (homeID) => {
    // isme hume user course and home course role table me total complaint and total number bhejna hoga of users in that home 
    var URHbyHome = await auditReportModel.getURHMapByHomeID(homeID);
    var singleHomeCompliant = { "total": URHbyHome.length, "total_Complaint": 0, }
    for (let i = 0; i < URHbyHome.length; i++) {
        var user_id = URHbyHome[i].user_id;
        var role_id = URHbyHome[i].role_arr[0].role_id;
        var home_id = URHbyHome[i].homeID;
        var isUserComplaint = await checkUserForComplaintFn(user_id, role_id, home_id);
        if (!isUserComplaint) {
            console.log("false")
            // return false;
        } else {
            singleHomeCompliant.total_Complaint = singleHomeCompliant.total_Complaint + 1;
        }
        // singleHomeCompliant.total = singleHomeCompliant.total + 1;

    }
    console.log(singleHomeCompliant)
    return singleHomeCompliant;

}
// homesComplaintSummary("1")

module.exports.sendOganizationSummary = async (req, res) => {
    var org_id = req.params.org_id;
    console.log("org summ ")
    console.log(org_id)
    var homeList = [];
    organizationModel.getHomesList(org_id, async function (result) {
        if (result.length == 0) {
            res.status(400).send('No Home Found!')
            // res.send("error!")
        }
        else {
            //   console.log('response',result);
            homeList = result;
            var orgSummData = [];
            for (let i = 0; i < homeList.length; i++) {
                var orgSumRow = [];
                orgSumRow.push(homeList[i].home_id);
                orgSumRow.push(homeList[i].name);
                var homeCompObj = await homesComplaintSummary(homeList[i].home_id);
                var isComplaintHome = (homeCompObj.total - homeCompObj.total_Complaint == 0) ? true : false;
                orgSumRow.push(isComplaintHome)
                orgSumRow.push(homeCompObj.total_Complaint)
                orgSumRow.push(homeCompObj.total - homeCompObj.total_Complaint)
                orgSummData.push(orgSumRow);

            }
            res.send(orgSummData)
        }


    });


}