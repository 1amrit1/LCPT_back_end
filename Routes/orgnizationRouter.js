const { check, body, validationResult } = require('express-validator');
const path = require('path');
var con = require('./../Model/organisationModel')
const express = require('express');
var { getHomeList, getOrganisationDetails, editTrainingStandards } = require('../Controller/organisationController')
var organizationRouter = express.Router();


//get list of all homes in organisation
organizationRouter.get('/getHomesList/:id', getHomeList);

organizationRouter.get('/getOrganisationDetails/:id', getOrganisationDetails)

organizationRouter.put('/editTrainingStandards', editTrainingStandards)



module.exports = organizationRouter;