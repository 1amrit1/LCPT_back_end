const express = require('express');
// var { addCourseFn, getAllCoursesFn, updateCourseFn, getUserBasedCourseDetails } = require('../Controller/courseController');
var { sendOganizationSummary, getHomeSummary } = require('../Controller/auditReportController')
var auditReportRouter = express.Router();


// auditReportRouter.post('/path', fn);
auditReportRouter.get('/org-summary/:org_id', sendOganizationSummary);
auditReportRouter.get('/home-summary/:home_id', getHomeSummary);

module.exports = auditReportRouter;
