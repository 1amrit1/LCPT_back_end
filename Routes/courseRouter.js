const express = require('express');
var { addCourseFn, getAllCoursesFn, updateCourseFn, getUserBasedCourseDetails, getAllAppliedCourses, getAllCoursesUserBased } = require('../Controller/courseController');
var courseRouter = express.Router();

courseRouter.post('/create-course', addCourseFn);
courseRouter.get('/view-all-courses', getAllCoursesFn);
courseRouter.put('/update-course', updateCourseFn);

courseRouter.post('/fetchCourseDetails', getUserBasedCourseDetails);
courseRouter.get('/fetchPendingCourses/:userId', getAllAppliedCourses);

courseRouter.get('/getAllCourses/:userId', getAllCoursesUserBased);
module.exports = courseRouter;
