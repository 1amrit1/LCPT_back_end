const express = require('express');
// var { addCourseFn, getAllCoursesFn, updateCourseFn, getUserBasedCourseDetails } = require('../Controller/courseController');
var { sendOganizationSummary, getHomeSummary, getHomeStaffSummData, getOrganizationStaffTemplates } = require('../Controller/auditReportController')
var auditReportRouter = express.Router();


// auditReportRouter.post('/path', fn);
auditReportRouter.get('/org-summary/:org_id', sendOganizationSummary);
auditReportRouter.get('/home-summary/:home_id', getHomeSummary);
auditReportRouter.get('/home-staff-summary/:home_id', getHomeStaffSummData);
auditReportRouter.get('/org-template-specific/:org_id', getOrganizationStaffTemplates);

module.exports = auditReportRouter;
