const { check, body, validationResult } = require('express-validator');
var con = require('./../Model/organisationModel')
const express = require('express');
var { getHomeList, getOrganisationDetails, editTrainingStandards, editOrgDetails, addNewStandard, getStaffList,
    getHomeDetails, editHomeDetails, editStaffStatus, addNewStaff, getRolesFromHomeId, getAllHomes, getHomeDetailsJson, getHomeRoleCourseJson,
    showHomeCheckList, editRoleStatus, addNewRole, getRoleTemplateDetails, addNewHome, getCourseList, addCheckListRole, editCourseDetails,
    verifyNewUserForHome, addAssignRoleText, addNewOrg, addAssignRoleText, addNewOrg,
    getAllHomesCount, getRoleLength, getOrgList } = require('../Controller/organisationController');

var organizationRouter = express.Router();

//get list of all homes in organisation
organizationRouter.get('/getHomesList/:id', getHomeList);

organizationRouter.get('/getOrganizationList/', getOrgList);

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

organizationRouter.post('/addNewOrg', addNewOrg);

organizationRouter.get('/getAllHomesCount', getAllHomesCount);

organizationRouter.get('/getRoleLength', getRoleLength);

organizationRouter.put('/addCheckListRole', addCheckListRole);

organizationRouter.put('/editCourseDetails', editCourseDetails);

organizationRouter.get('/getRoleByHomeId/:id', getRolesFromHomeId);

organizationRouter.get('/getAllHomes', getAllHomes);

organizationRouter.get('/getHomeInfo/:id', getHomeDetailsJson);

organizationRouter.get('/getHRCInfo/:homeId/:roleId', getHomeRoleCourseJson);

organizationRouter.get('/emailVerification/:userId/:homeId', verifyNewUserForHome);

module.exports = organizationRouter;