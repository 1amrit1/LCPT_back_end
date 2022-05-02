var express = require('express');
var app = express();

const { check, body, validationResult } = require('express-validator');
const path = require('path');
var con = require('./../Model/organisationModel')
var roleService = require('./../Service/roleService')
var courseModel = require('./../Model/courseModel');



//get list of all homes in organisation
module.exports.getHomeList = function (req, res) {
    var id = req.params.id;
    con.getHomesList(id, function (result) {
        if (result.length == 0) {
            res.status(400).send('No Home Found!')
        }
        else{
         //   console.log('response',result);
            res.status(200).send(result);
        }

    });
}

module.exports.getOrganisationDetails = function (req, res) {
    var id = req.params.id;
    con.getOrganisationDetails(id, function (result) {
        if (result.length == 0) {
            res.status(400).send('No Organisation Found!')
        }
        else{
       //     console.log('response',result);
            res.status(200).send(result);
        }

    });
}

module.exports.editTrainingStandards = function (req, res) {
    var trainingObj = req.body
    console.log("trainingObj",trainingObj)
    con.editTrainingStandards(trainingObj, function (result) {
        if (result.length == 0) {
            res.status(400).send('No Organisation Found!')
        }
        else{
         //   console.log('response',result);
            res.status(200).send(result);
        }
        
      });
}
module.exports.editOrgDetails = function(req,res){
    console.log(req.body)
    var editOrgDetailObj = req.body;
    con.editOrgDetails(editOrgDetailObj,function(result){
        if(result.length==0){
            res.status(400).send('No Organisation Found!')
        }
        else{
            res.status(200).send(result);
        }
        
      });
}

module.exports.addNewStandard = function(req,res){
    console.log(req.body)
    let newStandardObj = req.body
    con.addNewStandard(newStandardObj,function(result){
        if(result.length==0){
            res.status(400).send('No Organisation Found!')
        }
        else{
            res.status(200).send(result);
        }
        
      });
}
module.exports.getStaffList = function (req, res) {
    var id = req.params.id;
    con.getStaffList(id, function (result) {
        if (result.length == 0) {
            res.status(400).send('No Member Found!')
        }
        else{
         //   console.log('response',result);
            res.status(200).send(result);
        }

    });
}
module.exports.getHomeDetails = function (req, res) {
    var id = req.params.id;
   // console.log(id)
    con.getHomeDetails(id, function (result) {
        if (result.length == 0) {
            res.status(400).send('No Member Found!')
        }
        else{
            res.status(200).send(result);
        }

    });
}
module.exports.editHomeDetails = function(req,res){
    var homeDetailObj = req.body
    con.editOrgDetails(homeDetailObj,function(result){
        if(result.length==0){
            res.status(400).send('No Organisation Found!')
        }
        else{
            res.status(200).send(result);
        }
        
      });
}
module.exports.editStaffStatus = function(req,res){
    var staffStatus = req.body;
    con.editStaffStatus(staffStatus,function(result){
        if(result.length==0){
            res.status(400).send('No User Found!')
        }
        else{
            res.status(200).send(result)
        }
    })
}
module.exports.addNewStaff = function(req,res){
    var addStaffObj = req.body;
    con.addNewStaff(addStaffObj,function(result){
        if(result.length==0){
            res.status(400).send('No User Found!')
        }
        else{
            res.status(200).send(result)
        }
    })
}
module.exports.showHomeCheckList = function(req,res){
    var id = req.params.id;
    con.showHomeCheckList(id,function(result){
       // console.log("checkList result",result)
        if(result.length==0){
            res.status(400).send('No Role Found!')
        }
        else{
            res.status(200).send(result)
        }
    })
}
module.exports.editRoleStatus = function(req,res){
    //var id = req.params.id;
    var editRoleObj = req.body
    con.editRoleStatus(editRoleObj,function(result){
        if(result.length==0){
            res.status(400).send('No Role Found!')
        }
        else{
            res.status(200).send(result)
        }
    })
}
module.exports.addNewRole = function(req,res){
    //var id = req.params.id;
    var newRoleObj = req.body
    con.addNewRole(newRoleObj,function(result){
        if(result.length==0){
            res.status(400).send('Sorry! Something went wrong.')
        }
        else{
            res.status(200).send(result)
        }
    })
}
module.exports.getRoleTemplateDetails = function(req,res){
    var home_id = req.params.homeId;
    var role_id = req.params.roleId;
    con.getRoleTemplateDetails({"home_id":home_id,"role_id":role_id}, function (result) {
        if (result.length == 0) {
            res.status(400).send('No Role Found!')
        }
        else{
            res.status(200).send(result);
        }

    });
}
module.exports.addNewHome = function(req,res){
    var homeObj = req.body
    con.addNewHome(homeObj, function (result) {
        if (result.length == 0) {
            res.status(400).send('No Role Found!')
        }
        else{
            res.status(200).send(result);
        }

    });
}

/** Added by Ayush */
module.exports.getHomeDetailsJson = function (req, res) {
    var id = req.params.id;
   // console.log(id)
   var arrayOfHomeCourses = [];
   var mapOfRoleCourse = new Map();
   var course  = new Map();
    con.getHome_Crs_Role_Json(id, function (result) {
        if (result.length == 0) {
            res.status(400).send('No Member Found!')
        }
        else{
            var courseMap = new Map();
            courseModel.getAllCourses(function (crsResult) {
                if (crsResult.length==0) {
                    return res.status(400).send('No data Found!')
                }else{
                   // console.log(crsResult);
                    crsResult.forEach(res => {
                        courseMap.set(String(res.courseID),res);
                    });


                    //console.log("========Map of all courses ===== ", courseMap);
                   
                    result.forEach(res => {
                        mapOfRoleCourse = new Map();
                        course  = new Map();
                        res.course_details.forEach(inner => {
                            var crsObj = courseMap.get(String(inner.id));
                            //console.log("Got course => ",crsObj);
                            course[inner.id]=crsObj;
                            mapOfRoleCourse.set(res.role_id +"~~"+ res.role_name, course);
                            
                        });
                        console.log("+++++++++++++++++++++++++++++++++++++");
                       console.log("Map = > ",mapOfRoleCourse);
                       console.log("+++++++++++++++++++++++++++++++++++++");
                        arrayOfHomeCourses.push(mapOfRoleCourse);
                      //  console.log("+++++++++++++++++++++++++++++++++++++");
                      //  console.log("Map = > ",mapOfRoleCourse);
                      //  console.log("+++++++++++++++++++++++++++++++++++++");

                        
                    });
                    console.log("Array to response => ",arrayOfHomeCourses);
                    return res.status(200).send(arrayOfHomeCourses);
                }
            });
            
            //console.log("++++ Array to response => ",arrayOfHomeCourses);
            //res.status(200).send(arrayOfHomeCourses);
        }})
    }
module.exports.getCourseList = function(req,res){
   
    con.getCourseList(function (result) {
        if (result.length == 0) {
            res.status(400).send('No Course Found!')
        }
        else{
            res.status(200).send(result);
        }

    });
}
module.exports.addCheckListRole = function(req,res){
    var roleObj = req.body
    con.addCheckListRole(roleObj, function (result) {
        if (result.length == 0) {
            res.status(400).send('Sorry Something went wrong!')
        }
        else{
            res.status(200).send(result);
        }

    });
}
module.exports.editCourseDetails =  function(req,res){
    var roleObj = req.body
    con.editCourseDetails(roleObj, function (result) {
        if (result.length == 0) {
            res.status(400).send('Sorry Something went wrong!')
        }
        else{
            res.status(200).send(result);
        }

    });
}
module.exports.addAssignRoleText = function(req,res){
    var roleObj = req.body
    con.addAssignRoleText(roleObj, function (result) {
        if (result.length == 0) {
            res.status(400).send('Sorry Something went wrong!')
        }
        else{
            res.status(200).send(result);
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
        