const express = require('express');
var { addCourseFn, getAllCoursesFn, updateCourseFn, getUserBasedCourseDetails, getAllAppliedCourses } = require('../Controller/courseController');
var courseRouter = express.Router();

courseRouter.post('/create-course', addCourseFn);
courseRouter.get('/view-all-courses', getAllCoursesFn);
courseRouter.put('/update-course', updateCourseFn);

courseRouter.post('/fetchCourseDetails', getUserBasedCourseDetails);
courseRouter.get('/fetchPendingCourses/:userId', getAllAppliedCourses);

module.exports = courseRouter;
