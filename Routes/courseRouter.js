const express = require('express');
const { addCourseFn, getAllCoursesFn, updateCourseFn } = require('../Controller/courseController');
let courseRouter = express.Router();

courseRouter.post('/create-course', addCourseFn);
courseRouter.get('/view-all-courses', getAllCoursesFn);
courseRouter.put('/update-course', updateCourseFn);

module.exports = courseRouter
