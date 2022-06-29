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
        if (!userCrsArr.includes(roleHomeCrsArr[i])) { // here one more check to see if it's document is true or do it in the model for this fn
            numNotComplaint++;
        }
    }

    if (numNotComplaint > 0) {
        return false;
    } else {
        return true;
    }



}
var userMissingCourses = async (user_id, role_id, home_id) => {
    //loop to get all the user's courses in an array

    //get the courses array from home_crs_role by find query on home and role id.

    // outer loop on courses array from home_crs_role to every course_id
    // inner loop on user's courses array => to check if the array home_crs is in it or not.

    var userCrsArr = await auditReportModel.getUserAllCoursesArr(user_id)

    var roleHomeCrsArr = await auditReportModel.getCoursesForRoleHome(home_id, role_id);
    // var numNotComplaint = 0;
    console.log(userCrsArr)
    console.log(roleHomeCrsArr)
    var missingCourseArr = [];

    for (let i = 0; i < roleHomeCrsArr.length; i++) {
        if (!userCrsArr.includes(roleHomeCrsArr[i])) {// here one more check to see if it's document is true or do it in the model for this fn
            missingCourseArr.push(roleHomeCrsArr[i])
        }
    }
    return missingCourseArr;

    // if (numNotComplaint > 0) {
    //     return false;
    // } else {
    //     return true;
    // }



}

var homesComplaintSummary = async (homeID) => {
    // isme hume user course and home course role table me total complaint and total number bhejna hoga of users in that home 
    var URHbyHome = await auditReportModel.getURHMapByHomeID(homeID);
    console.log(URHbyHome);
    var singleHomeCompliant = { "total": URHbyHome.length, "total_Complaint": 0, }
    for (let i = 0; i < URHbyHome.length; i++) {
        var user_id = URHbyHome[i].user_id;
        var role_id = URHbyHome[i].role_arr[0].role_id;
        var home_id = URHbyHome[i].home_id;
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
    // if()
    return singleHomeCompliant;

}
// homesComplaintSummary("1")

module.exports.sendOganizationSummary = async (req, res) => {
    var org_id = req.params.org_id;
    //console.log("org summ ")
    console.log(org_id)
    var homeList = [];
    organizationModel.getHomesList(org_id, async function (result) {
        if (result.length == 0) {
            res.status(400).send('No Home Found!')
            // res.send("error!")
        }
        else {
            //   console.log('response',result);
            homeList = result.result;
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
            console.log(orgSummData);
            res.send(orgSummData)
        }


    });


}
var isRoleAlreadyInArrFn = (objArr, role_id) => {
    for (let i = 0; i < objArr.length; i++) {
        if (objArr[i].role_id == role_id) {
            return i;
        }
    }
    return -1;
}

module.exports.getHomeSummary = async (req, res) => {
    var homeID = req.params.home_id
    var URHbyHome = await auditReportModel.getURHMapByHomeID(homeID);
    var homeSummObjArr = [];
    var singleHomeCompliant = { "total": URHbyHome.length, "total_Complaint": 0, }
    for (let i = 0; i < URHbyHome.length; i++) {
        var user_id = URHbyHome[i].user_id;
        var role_id = URHbyHome[i].role_arr[0].role_id;
        var home_id = URHbyHome[i].home_id;
        var role_name = URHbyHome[i].role_arr[0].role_name;


        var isUserComplaint = await checkUserForComplaintFn(user_id, role_id, home_id);
        var rolePosInArr = isRoleAlreadyInArrFn(homeSummObjArr, role_id);
        if (rolePosInArr == -1) {
            var homeSumObj = { 'role_name': role_name, 'home_id': home_id, 'role_id': role_id, 'total_staff': 0, 'complaint_staff': 0, 'non_complaint_staff': 0 };
            if (!isUserComplaint) {
                console.log("false")
                homeSumObj.non_complaint_staff += 1;
                // return false;
            } else {
                homeSumObj.complaint_staff += 1;
            }
            homeSumObj.total_staff += 1;
            homeSummObjArr.push(homeSumObj);

        } else {
            if (!isUserComplaint) {
                homeSummObjArr[rolePosInArr].non_complaint_staff += 1
            } else {
                homeSummObjArr[rolePosInArr].complaint_staff += 1

            }
            homeSummObjArr[rolePosInArr].total_staff += 1
        }

        // singleHomeCompliant.total = singleHomeCompliant.total + 1;

    }
    console.log(homeSummObjArr)
    res.send(homeSummObjArr)
}
// getHomeSummary("1")

module.exports.getHomeStaffSummData = async (req, res) => {
    var homeId = req.params.home_id
    var finalObjArr = [];
    var URHbyHome = await auditReportModel.getURHMapByHomeID(homeId);
    for (let i = 0; i < URHbyHome.length; i++) {
        var roleArr = URHbyHome[i].role_arr;
        var userId = URHbyHome[i].user_id;
        for (let j = 0; j < roleArr.length; j++) {
            var isURHComplaint = await checkUserForComplaintFn(userId, roleArr[j].role_id, homeId);
            var finalObj = {
                'user_id': userId,
                'role_id': roleArr[j].role_id,
                'role_name': roleArr[j].role_name,
                'home_id': homeId,
                'status': URHbyHome[i].emp_status,
                'is_complaint': isURHComplaint,
                'user_name': URHbyHome[i].user_name

            }
            finalObjArr.push(finalObj);

        }

    }
    console.log(finalObjArr);
    res.send(finalObjArr);

}

// getHomeStaffSummData("1");

module.exports.getOrganizationStaffTemplates = async (req, res) => {
    var orgId = req.params.org_id
    // var orgId = org_id

    organizationModel.getHomesList(orgId, async function (result) {
        if (result.length == 0) {
            res.status(400).send('No Home Found!')
            // res.send("error!")
        }
        else {
            var home_list = [];
            var user_list = [];
            result = result.result;

            //   console.log('response',result);
            //from homes get users and from users get user course details
            for (let i = 0; i < result.length; i++) {
                home_list.push(result[i].home_id);

            }
            for (let i = 0; i < home_list.length; i++) {

                var URHData = await auditReportModel.getURHMapByHomeID(home_list[i])
                console.log(URHData)
                console.log("URHData")
                for (let j = 0; j < URHData.length; j++) {
                    if (!user_list.includes(URHData[j].user_id)) {
                        user_list.push(URHData[j].user_id);
                    }
                }

            }
            var resObjArr = [];
            for (let i = 0; i < user_list.length; i++) {
                console.log("----------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>AUDIT")
                console.log(user_list[i])
                var userCrsArr = await auditReportModel.getUserCourseByUser(user_list[i]);
                var userName = await auditReportModel.getUserByUserID(user_list[i]);
                console.log(userName);
                var crsName = await auditReportModel.getCourseByCrsID(userCrsArr);
                console.log(crsName);
                console.log(userCrsArr)
                console.log("userCrsArr")
                resObjArr = resObjArr.concat(userCrsArr)
            }
            // console.log("res obh arr  in getOrganizationStaffTemplates function--------------------------")
            // console.log(resObjArr);
            res.send(resObjArr);
        }


    });

}
// getOrganizationStaffTemplates("1")

module.exports.getOrganizationDeficiencyData = async (req, res) => {
    var orgId = req.params.org_id
    organizationModel.getHomesList(orgId, async function (result) {
        if (result.result.length == 0) {
            res.status(400).send('No Home Found!')
            // res.send("error!")
        }
        else {
            var home_list = [];
            // var user_list = [];
            var resObjArr = [];
            result = result.result;

            //   console.log('response',result);
            //from homes get users and from users get user course details
            for (let i = 0; i < result.length; i++) {
                home_list.push(result[i].home_id);

            }
            for (let i = 0; i < home_list.length; i++) {

                var URHData = await auditReportModel.getURHMapByHomeID(home_list[i])
                console.log(URHData)
                console.log("URHData")
                for (let j = 0; j < URHData.length; j++) {
                    var roleArr = URHData[j].role_arr
                    for (let k = 0; k < roleArr.length; k++) {

                        var URHMissingCrs = userMissingCourses(URHData[j].user_id, roleArr[k].role_id, URHData[j].home_id)
                        console.log(URHMissingCrs)
                        var resObj = {
                            "user_id": URHData[j].user_id,
                            "user_name": URHData[j].user_name,
                            "role_id": roleArr[k].role_id,
                            "role_name": roleArr[k].role_name,
                            "home_id": URHData[j].home_id,
                            "missing_courses": (await URHMissingCrs).toString()
                        }
                        resObjArr.push(resObj);
                    }

                }

            }



            console.log(resObjArr);

            res.send(resObjArr);
        }


    });

}
// getOrganizationDeficiencyData("1");