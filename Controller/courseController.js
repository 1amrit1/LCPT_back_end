const { response } = require("express");
const { insert_1_course, get_all_courses, update_1_course } = require("../Model/courseModel");
var courseModel = require('../Model/courseModel');

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
module.exports.updateCourseFn = async function (req, res) {
    console.log("update course");
    console.log(req.body.courseFormDetails);
    res = {}
    try {
        var res = await update_1_course(req.body.crsId, req.body.courseFormDetails);
        res.send(res)

    } catch (err) {
        console.log(err);
        // res.send(err)

    }


    module.exports.getRolesFromHomeId = function (req, res) {
        var id = req.params.id;
        console.log("==== ID ==== ", id);
        roleService.getAllRolesByHomeId(id, function (result) {
            if (result.length == 0) {
                res.status(400).send('No Role Found!')
            }
            else{
                console.log("=== Result === ", result);
                res.status(200).send(result);
            }
    
        });
    }

    // module.exports.getUserBasedCourseDetails = async function (req, res, next) {
    //         var homeId = req.body.homeId;
    //         var roleId = req.body.roleId;
    //         var userId = req.body.userId;
            
    //         //var users = await UserService.getAllUsers({}, page, limit)
    //         var allCoursesRequired = await getUserBasedCourseDetails(homeId, roleId);
    //         var userCompletedCourses = await getUserCompletedCourses(userId, roleId, homeId);
    //         var jsonToReturn = { "RequiredCourses": allCoursesRequired, "CompletedCourses": userCompletedCourses }
    //         if(allCoursesRequired === undefined)
    //               res.status(200).send("Cannot retrieve data");
    //         console.log("Success > "+jsonToReturn);
    //          res.status(200).send(jsonToReturn);
       
    // };

    module.exports.getUserBasedCourseDetails = async function (req, res) {
        var homeId = req.body.homeId;
            var roleId = req.body.roleId;
            var userId = req.body.userId;
            try{
       // console.log(id)
       courseModel.getUserCourseDetails(homeId, roleId, userId, function (result) {
        if (result.length == 0) {
            return res.send('No Member Found!')
        }
        else{
           return res.send(result);
        };
    });
    } catch (err){
        throw new err;
    }
    //    var userCompletedCourses = await getUserCompletedCourses(userId, roleId, homeId);
    //     con.getHomeDetails(id, function (result) {
    //         if (result.length == 0) {
    //             res.status(400).send('No Member Found!')
    //         }
    //         else{
    //             res.status(200).send(result);
    //         }
    
    //     });
    

    }

}
