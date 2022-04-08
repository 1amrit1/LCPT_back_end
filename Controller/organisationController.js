var express = require('express');
var app = express();

const { check, body, validationResult } = require('express-validator');
const path = require('path');
var con = require('./../Model/organisationModel')


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
    con.editTrainingStandards(req.body, function (result) {
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
    con.editOrgDetails(req.body,function(result){
        if(result.length==0){
            res.status(400).send('No Organisation Found!')
        }
        else{
            res.status(200).send(result);
        }
        
      });
}


