const express = require('express');
const { addCourseFn } = require('../Controller/courseController');
let courseRouter = express.Router();

courseRouter.post('/create-course', addCourseFn);

module.exports = courseRouter
