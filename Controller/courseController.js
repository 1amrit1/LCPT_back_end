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

    module.exports.getUserBasedCourseDetails = async function (req, res) {
    var homeId = req.body.homeId;
    var roleId = 4;//req.body.roleId;
    var userId = req.body.userId;
        var allCourseJson = [];
        var userCourseJson = [];
        var allCourseList = [];
        console.log(homeId," == ", roleId," == ", userId);
            await courseModel.getUserCourseDetails(homeId, roleId, userId, function (result) {
                if (result.length==0) {
                    return res.status(400).send('No data Found!')
                }
                else{
                    console.log("=========== Got response ======= ", result);
                    allCourseJson.push(result);
                    courseModel.getUserCompletedCourses(homeId, roleId, userId, function (result) {
                        if (result.length==0) {
                            return res.status(400).send('No data Found!')
                        }
                        else{
                            console.log("=========== Got response ======= ", result);
                            userCourseJson.push(result);

                            courseModel.getAllCourses(function (result) {
                                if (result.length==0) {
                                    return res.status(400).send('No data Found!')
                                }else{
                                    allCourseList.push(result);
                                    if(userCourseJson === [] && allCourseJson === []){
                                        res.status(400).send(responseJson);
                                    }else{
                                          console.log("======= Performing manipulation =========== ");
                                         console.log("======= User completed Courses =========== ");
                                          var arrayOfCourseCompleted = [];
                                          var tempArrayOfCompltdCourseIds = [];
                                          var userCourseId = '';
                                          userCourseJson.forEach(upper => {
                                              //console.log(upper[0]);
                                              upper[0].courseDetails.forEach(inner => {
                                                //console.log(inner.id);
                                                userCourseId = inner.id;
                                                allCourseList.forEach(mid => {
                                                    mid.forEach(lowest => {
                                                    if(userCourseId === lowest.courseID){
                                                        tempArrayOfCompltdCourseIds.push(userCourseId);
                                                        var mapOfCoursesCompleted = {};
                                                        mapOfCoursesCompleted['homeId'] = upper[0].homeId;
                                                        mapOfCoursesCompleted['roleId'] = upper[0].roleId;
                                                        mapOfCoursesCompleted['userId'] = upper[0].userId;
                                                        mapOfCoursesCompleted['roleName'] = upper[0].roleName;
                                                        mapOfCoursesCompleted['crsId'] = lowest.courseID;
                                                        mapOfCoursesCompleted['title'] = lowest.title;
                                                        mapOfCoursesCompleted['trainDuration'] = lowest.training_duration;
                                                        mapOfCoursesCompleted['validity'] = lowest.validity_duration;
                                                        mapOfCoursesCompleted['extDoc'] = (lowest.external_document === undefined) ? 'N/A' : lowest.external_document;
                                                        mapOfCoursesCompleted['sharedEmp'] = (lowest.shared_with_emp === undefined) ? 'No' : lowest.shared_with_emp;;
                                                        mapOfCoursesCompleted['status'] = (lowest.status === undefined) ? 'Complete' : lowest.status;
                                                        arrayOfCourseCompleted.push(mapOfCoursesCompleted);
                                                    }
                                                });
                                                });
                                                
                                              });
                                        });
                                        console.log("========= Completed courses ==== ", arrayOfCourseCompleted);
                                        console.log("========= Completed courses IDs ==== ", tempArrayOfCompltdCourseIds);

                                        console.log("======= User pending Courses =========== ");
                                        var arrayOfPendingCourses = [];
                                        allCourseJson.forEach(upper => {
                                            upper[0].course_details.forEach(mid => {
                                                if(tempArrayOfCompltdCourseIds.indexOf(mid.crsId) === -1){
                                                    console.log("Pending Course == > ", mid.crsId)
                                                    allCourseList.forEach(inner => {
                                                        inner.forEach(lowest => {
                                                            if(mid.crsId === lowest.courseID){
                                                                var mapOfPendingCourses = {};
                                                                mapOfPendingCourses['homeId'] = upper[0].home_id;
                                                                mapOfPendingCourses['roleId'] = upper[0].role_id;
                                                                mapOfPendingCourses['userId'] = userId;
                                                                mapOfPendingCourses['roleName'] = upper[0].role_name;
                                                                mapOfPendingCourses['crsId'] = lowest.courseID;
                                                                mapOfPendingCourses['title'] = lowest.title;
                                                                mapOfPendingCourses['trainDuration'] = lowest.training_duration;
                                                                mapOfPendingCourses['validity'] = lowest.validity_duration;
                                                                mapOfPendingCourses['extDoc'] = (lowest.external_document === undefined) ? 'N/A' : lowest.external_document;
                                                                mapOfPendingCourses['sharedEmp'] = (lowest.shared_with_emp === undefined) ? 'No' : lowest.shared_with_emp;;
                                                                mapOfPendingCourses['status'] = (lowest.status === undefined) ? 'Pending' : lowest.status;
                                                                arrayOfPendingCourses.push(mapOfPendingCourses);
                                                            }
                                                        });
                                                    });
                                                }
                                                
                                              });
                                          });


                                          console.log("========= Pending courses ==== ", arrayOfPendingCourses);
                                          let responseJson = {"completedCourses": arrayOfCourseCompleted, "pendingCourses": arrayOfPendingCourses, "allCourseList":allCourseList};
                                          //console.log("======== Final ==== ", responseJson);
                                        res.status(200).send(responseJson);
                                    }
                                }
                            });



                            
                        };
                    });
                    return new Promise(resolve => {
                        console.log("one");
                        resolve();
                      });
                }
            });

    }


