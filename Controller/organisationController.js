var express = require('express');
var app = express();


var router = express.Router();
const { check, body, validationResult } = require('express-validator');
const path = require('path');
var con = require('./../Model/organisationModel')


//get list of all homes in organisation
router.get('/getHomesList/:id',function(req,res){
    var id = req.params.id;
    con.getHomesList(id,function(result){
        if(result.length==0){
            res.status(400).send('No Home Found!')
        }
        else{
            console.log('response',result);
            res.status(200).send(result);
        }
        
      });
});

router.get('/getOrganisationDetails/:id',function(req,res){
    var id = req.params.id;
    con.getOrganisationDetails(id,function(result){
        if(result.length==0){
            res.status(400).send('No Organisation Found!')
        }
        else{
            console.log('response',result);
            res.status(200).send(result);
        }
        
      });
})

router.put('/editTrainingStandards',function(req,res){
    con.editTrainingStandards(req.body,function(result){
        if(result.length==0){
            res.status(400).send('No Organisation Found!')
        }
        else{
            console.log('response',result);
            res.status(200).send(result);
        }
        
      });
})



module.exports = router;