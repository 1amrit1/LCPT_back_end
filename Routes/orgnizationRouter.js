const { check, body, validationResult } = require('express-validator');
const path = require('path');
var con = require('./../Model/organisationModel')
const express = require('express');
var { getHomeList, getOrganisationDetails, editTrainingStandards, editOrgDetails, addNewStandard, getStaffList,
    getHomeDetails, editHomeDetails, editStaffStatus, addNewStaff, getRolesFromHomeId, getAllHomes, getHomeDetailsJson } = require('../Controller/organisationController')
var organizationRouter = express.Router();


//get list of all homes in organisation
organizationRouter.get('/getHomesList/:id', getHomeList);

organizationRouter.get('/getOrganisationDetails/:id', getOrganisationDetails);

organizationRouter.get('/getHomeDetails/:id', getHomeDetails);

organizationRouter.put('/editTrainingStandards', editTrainingStandards);

organizationRouter.put('/editOrgDetails', editOrgDetails);

organizationRouter.put('/editHomeDetails', editHomeDetails);

//organizationRouter.delete('/editTrainingStandards', editTrainingStandards);
organizationRouter.get('/getStaffList/:id', getStaffList);
organizationRouter.post('/addNewStaff', addNewStaff);


organizationRouter.post('/addNewStandard', addNewStandard);
organizationRouter.put('/editStaffStatus', editStaffStatus);


organizationRouter.get('/getRoleByHomeId/:id', getRolesFromHomeId);


organizationRouter.get('/getAllHomes', getAllHomes);
organizationRouter.get('/getHomeInfo/:id', getHomeDetailsJson);


module.exports = organizationRouter;