var express = require('express');
var app = express();

const { check, body, validationResult } = require('express-validator');
const path = require('path');
var con = require('./../Model/organisationModel')
var roleService = require('./../Service/roleService')
var courseModel = require('../Model/courseModel');



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

module.exports.getUserBasedCourseDetails = async function (req, res) {
    var homeId = req.body.homeId;
        var roleId = req.body.roleId;
        var userId = req.body.userId;
        try{
   // console.log(id)
   courseModel.getUserBasedCourseDetails(homeId, roleId, userId, function (result) {
    if (result.length == 0) {
        res.status(400).send('No Member Found!')
    }
    else{
        res.status(200).send(result);
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
