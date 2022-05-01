const express = require('express');
var { addCourseFn, getAllCoursesFn, updateCourseFn, getUserBasedCourseDetails } = require('../Controller/courseController');
var courseRouter = express.Router();

courseRouter.post('/create-course', addCourseFn);
courseRouter.get('/view-all-courses', getAllCoursesFn);
courseRouter.put('/update-course', updateCourseFn);

courseRouter.post('/fetchCourseDetails', getUserBasedCourseDetails);

module.exports = courseRouter;
