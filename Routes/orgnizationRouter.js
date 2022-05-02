const { check, body, validationResult } = require('express-validator');
const path = require('path');
var con = require('./../Model/organisationModel')
const express = require('express');
var { getHomeList, getOrganisationDetails, editTrainingStandards, editOrgDetails, addNewStandard, getStaffList,
    getHomeDetails, editHomeDetails, editStaffStatus, addNewStaff, getRolesFromHomeId, getAllHomes, getHomeDetailsJson ,
     showHomeCheckList, editRoleStatus, addNewRole, getRoleTemplateDetails, addNewHome, getCourseList, addCheckListRole, editCourseDetails, addAssignRoleText } = require('../Controller/organisationController');
var organizationRouter = express.Router();


//get list of all homes in organisation
organizationRouter.get('/getHomesList/:id', getHomeList);

organizationRouter.get('/getOrganisationDetails/:id', getOrganisationDetails);

organizationRouter.get('/getHomeDetails/:id', getHomeDetails);

organizationRouter.put('/editTrainingStandards', editTrainingStandards);

organizationRouter.put('/editOrgDetails', editOrgDetails);

organizationRouter.put('/editHomeDetails', editHomeDetails);

organizationRouter.get('/getStaffList/:id', getStaffList);

organizationRouter.get('/getCourseList', getCourseList);

organizationRouter.post('/addNewStaff', addNewStaff);

organizationRouter.get('/showHomeCheckList/:id', showHomeCheckList);

organizationRouter.put('/editRoleArchiveStatus', editRoleStatus);

organizationRouter.post('/addNewPosition', addNewRole);

organizationRouter.post('/addNewStandard', addNewStandard);

organizationRouter.put('/editStaffStatus', editStaffStatus);

organizationRouter.put('/addAssignRoleText', addAssignRoleText);

organizationRouter.get('/getRoleTemplateDetails/:homeId/:roleId', getRoleTemplateDetails);

organizationRouter.post('/addNewHome', addNewHome);

organizationRouter.put('/addCheckListRole', addCheckListRole);

organizationRouter.put('/editCourseDetails', editCourseDetails);

organizationRouter.get('/getRoleByHomeId/:id', getRolesFromHomeId);


organizationRouter.get('/getAllHomes', getAllHomes);
organizationRouter.get('/getHomeInfo/:id', getHomeDetailsJson);


module.exports = organizationRouter;