const express = require('express');
var { sendHomeCrsRoleData, sendUserCrsData } = require('../Controller/adminDataController')
// var { sendOganizationSummary, getHomeSummary, getHomeStaffSummData, getOrganizationStaffTemplates, getOrganizationDeficiencyData } = require('../Controller/auditReportController')
var adminDataRouter = express.Router();


// auditReportRouter.post('/path', fn);
adminDataRouter.get('/home-crs-role', sendHomeCrsRoleData);
adminDataRouter.get('/user-crs', sendUserCrsData);


module.exports = adminDataRouter;
