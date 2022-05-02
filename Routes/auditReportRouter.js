const express = require('express');
// var { addCourseFn, getAllCoursesFn, updateCourseFn, getUserBasedCourseDetails } = require('../Controller/courseController');
var { sendOganizationSummary } = require('../Controller/auditReportController')
var auditReportRouter = express.Router();


// auditReportRouter.post('/path', fn);
auditReportRouter.get('/org-summary/:org_id', sendOganizationSummary);

module.exports = auditReportRouter;
