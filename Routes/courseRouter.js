const express = require('express');
const { addCourseFn, getAllCoursesFn } = require('../Controller/courseController');
let courseRouter = express.Router();

courseRouter.post('/create-course', addCourseFn);
courseRouter.get('/view-all-courses', getAllCoursesFn);

module.exports = courseRouter
