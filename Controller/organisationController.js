var express = require('express');
var app = express();
//var path = require('path');

const { check, body, validationResult } = require('express-validator');
const path = require('path');
var con = require('./../Model/organisationModel')
var roleService = require('./../Service/roleService')
var courseModel = require('./../Model/courseModel');



//get list of all homes in organisation
module.exports.getHomeList =  function (req, res) {
    var id = req.params.id;
   // check('id');

     con.getHomesList(id, function (resultObj) {
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        else if (resultObj.success && resultObj.result.length == 0) {
            res.status(200).send('No Home Found!')
        }
        else{
         //   console.log('response',result);
            res.status(200).send(resultObj.result);
        }

    });
}

module.exports.getOrganisationDetails = function (req, res) {
    var id = req.params.id;
    con.getOrganisationDetails(id, function (resultObj) {
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        else if (resultObj.success && resultObj.result.length==0) {
            res.status(200).send('No Organisation Found!')
        }
        else{
            res.status(200).send(resultObj.result);
        }

    });
}
module.exports.getAllHomesCount = function (req, res) {
 con.getAllHomesCount( function (resultObj) {
    if (!resultObj.success) {
        res.status(400).send('Something went wrong!')
    }
    // else if (resultObj.success && resultObj.result.length==0) {
    //     res.status(200).send('No Organisation Found!')
    // }
    else{
      //  console.log(resultObj.result)
        res.status(200).send(String(resultObj.result));
    }
 })
}
module.exports.getRoleLength = function (req, res) {
    con.getRoleLength( function (resultObj) {
       if (!resultObj.success) {
           res.status(400).send('Something went wrong!')
       }
       // else if (resultObj.success && resultObj.result.length==0) {
       //     res.status(200).send('No Organisation Found!')
       // }
       else{
        //   console.log(resultObj.result)
           res.status(200).send(String(resultObj.result));
       }
    })
   };
module.exports.editTrainingStandards = function (req, res) {
    var trainingObj = req.body
    con.editTrainingStandards(trainingObj, function (resultObj) {
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        else if (resultObj.success && resultObj.result.length == 0) {
            res.status(200).send('No Standards Found!')
        }
        else{
            res.status(200).send(resultObj.result);
        }
        
      });
}
module.exports.editOrgDetails = function(req,res){
    var editOrgDetailObj = req.body;
    con.editOrgDetails(editOrgDetailObj,function(resultObj){
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        else if(resultObj.success && resultObj.result.length==0){
            res.status(200).send('No Organisation Found!')
        }
        else{
            res.status(200).send(resultObj.result);
        }        
      });
}

module.exports.addNewStandard = function(req,res){
    let newStandardObj = req.body
    con.addNewStandard(newStandardObj,function(resultObj){
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        
        else{
            res.status(200).send(resultObj.result);
        }
        
      });
}
module.exports.getStaffList = function (req, res) {
    var id = req.params.id;
    con.getStaffList(id, function (resultObj) {
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        if (resultObj.success && resultObj.result.length == 0) {
            res.status(400).send('No Member Found!')
        }
        else{
            res.status(200).send(resultObj.result);
        }

    });
}
module.exports.getHomeDetails = function (req, res) {
    var id = req.params.id;
    con.getHomeDetails(id, function (resultObj) {
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        else if (resultObj.success && resultObj.result.length == 0) {
            res.status(400).send('No Home Found!')
        }
        else{
            res.status(200).send(resultObj.result);
        }

    });
}
module.exports.editHomeDetails = function(req,res){
    var homeDetailObj = req.body
    con.editHomeDetails(homeDetailObj.homeDetails,function(resultObj){
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        else if(resultObj.success && resultObj.result.length==0){
            res.status(400).send('No Home Found!')
        }
        else{
            res.status(200).send(resultObj.result);
        }
        
      });
}
module.exports.editStaffStatus = function(req,res){
    var staffStatus = req.body;
    con.editStaffStatus(staffStatus,function(resultObj){
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        if(resultObj.success && resultObj.result.length==0){
            res.status(400).send('No Staff Found!')
        }
        else{
            res.status(200).send(resultObj.result)
        }
    })
}
module.exports.addNewStaff = function(req,res){
    var addStaffObj = req.body;
    con.addNewStaff(addStaffObj,function(resultObj){
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        else{
            res.status(200).send(resultObj.result)
        }
    })
}
module.exports.showHomeCheckList = function(req,res){
    var id = req.params.id;
    con.showHomeCheckList(id,function(resultObj){
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        if(resultObj.success && resultObj.result.length==0){
            res.status(400).send('No Role Found!')
        }
        else{
            res.status(200).send(resultObj.result)
        }
    })
}
module.exports.editRoleStatus = function(req,res){
    var editRoleObj = req.body
    con.editRoleStatus(editRoleObj,function(resultObj){
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        else if(resultObj.success && resultObj.result.length==0){
            res.status(200).send('No Role Found!')
        }
        else{
            res.status(200).send(resultObj.result)
        }
    })
}
module.exports.addNewRole = function(req,res){
    var newRoleObj = req.body
    con.addNewRole(newRoleObj,function(resultObj){
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        else if(resultObj.success && resultObj.result.length==0){
            res.status(400).send('Something went wrong!')
        }
        else{
            res.status(200).send(resultObj.result)
        }
    })
}
module.exports.getRoleTemplateDetails = function(req,res){
    var home_id = req.params.homeId;
    var role_id = req.params.roleId;
    con.getRoleTemplateDetails({"home_id":home_id,"role_id":role_id}, function (resultObj) {
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        else if (resultObj.success && resultObj.result.length == 0) {
            res.status(200).send('No Role Found!')
        }
        else{
            res.status(200).send(resultObj.result);
        }

    });
}
module.exports.addNewHome = function(req,res){
    var homeObj = req.body
    con.addNewHome(homeObj, function (resultObj) {
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        if (resultObj.success && resultObj.result.length == 0) {
            res.status(200).send('Something Went Wrong!')
        }
        else{
            res.status(200).send(resultObj.result);
        }

    });
}

/** Added by Ayush */
module.exports.getHomeDetailsJson = function (req, res) {
    var id = req.params.id;
    var queryWithDetails = {'home_id': String(id)};
    con.getHome_Crs_Role_Json(queryWithDetails, function (result) {
        if (result.length == 0) {
            res.status(400).send('No Member Found!')
        }
        else{
           // console.log('Ressullt ',result);
            return res.status(200).send(result);
        }
    });
}


/** Added by Ayush */
module.exports.getHomeRoleCourseJson = function (req, res) {
    var id = req.params.homeId;
    var roleId = req.params.roleId;
    var queryWithDetails = {'home_id': String(id), 'role_id': String(roleId)};
  // console.log(queryWithDetails)
   var arrayOfHomeCourses = [];
//    var mapOfRoleCourse = new Map();
//    var course  = new Map();
    con.getHome_Crs_Role_Json(queryWithDetails, function (result) {
        if (result.length == 0) {
            res.status(400).send('No Member Found!')
        }
        else{
            var courseMap = new Map();
            courseModel.getAllCourses(function (crsResult) {
                if (crsResult.length==0) {
                    return res.status(400).send('No data Found!')
                }else{
                 //  console.log(crsResult);
                    crsResult.forEach(res => {
                        courseMap.set(String(res.courseID),res);
                    });
                    result.forEach(res => {
                       //mapOfRoleCourse = {};
                       // course  = {};
                        res.course_details.forEach(inner => {
                            var crsObj = courseMap.get(String(inner.id));
                            //console.log("Got course => ",crsObj);
                            //course[inner.id]=crsObj;
                           // mapOfRoleCourse[res.role_id +"~~"+ res.role_name]= course;
                            arrayOfHomeCourses.push(crsObj);
                        });
                        
                    });
                    let response = arrayOfHomeCourses;
                    return res.status(200).send(response);
                }
            });
            
            //console.log("++++ Array to response => ",arrayOfHomeCourses);
            //res.status(200).send(arrayOfHomeCourses);
        }})
    }
module.exports.getCourseList = function(req,res){
    con.getCourseList(function (resultObj) {
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        else if (resultObj.success && resultObj.result.length == 0) {
            res.status(200).send('No Course Found!')
        }
        else{
            res.status(200).send(resultObj.result);
        }

    });
}
module.exports.addCheckListRole = function(req,res){
    var roleObj = req.body
   // console.log("In checkList Body",roleObj)
    con.addCheckListRole(roleObj, function (resultObj) {
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        if (resultObj.success && resultObj.result.length == 0) {
            res.status(400).send('Something went wrong!')
        }
        else{
            res.status(200).send(resultObj.result);
        }

    });
}
module.exports.editCourseDetails =  function(req,res){
    var roleObj = req.body
    con.editCourseDetails(roleObj, function (resultObj) {
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        else if (resultObj.success && resultObj.result.length == 0) {
            res.status(400).send('Something went wrong!')
        }
        else{
            res.status(200).send(resultObj.result);
        }

    });
}
module.exports.addAssignRoleText = function(req,res){
    var roleObj = req.body
    con.addAssignRoleText(roleObj, function (resultObj) {
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        else if (resultObj.success && resultObj.result.length == 0) {
            res.status(400).send('Something went wrong!')
        }
        else{
            res.status(200).send(resultObj.result);
        }

    });
}
/** Added by Ayush */
module.exports.getAllHomes = function (req, res) {
    var id = req.params.id;
    con.getAllHomesList(id, function (result) {
        if (result.length == 0) {
            res.status(400).send('No Home Found!')
        }
        else{
            console.log('=== All homes list === ',result);
            res.status(200).send(result);
        }

    });
}
/** Added by Ayush */
module.exports.getRolesFromHomeId = function (req, res) {
    var id = req.params.id;
   // console.log("==== ID ==== ", id);
    roleService.getAllRolesByHomeId(id, function (result) {
        if (result.length == 0) {
            res.status(400).send('No Role Found!')
        }
        else{
      //      console.log("=== Result === ", result);
            res.status(200).send(result);
        }

    });
}
module.exports.addNewOrg = function(req,res){
    var OrgObj = req.body
    con.addNewOrg(OrgObj, function (result) {
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        if (resultObj.success && resultObj.result.length == 0) {
            res.status(400).send('Something Went Wrong!')
        }
        else{
            res.status(200).send(resultObj.result);
        }

    });
}


/** Added by Ayush */
module.exports.verifyNewUserForHome = function(req,res){
    var userId = req.params.userId;
    var homeId = req.params.homeId;
    console.log(' Email confirmation > ',userId, homeId);
    con.verifyNewUserForHome(userId, homeId, function (resultObj) {
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        }
        if (resultObj.success && resultObj.result.length == 0) {
            res.status(400).send('Something Went Wrong!')
        }
        else{
            res.sendFile(path.resolve('./Service/emailResponse.html'));
           //res.status(200).sendFile('../Service/emailResponse.html', {root: __dirname })
        }

    });
}

