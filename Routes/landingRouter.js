const { application } = require('express');
const express = require('express');
const { loginFn } = require('../Controller/landingController');
let landingRouter = express.Router()
const app = express();
// const organisationRoutes = require('./../Controller/organisationController');


landingRouter.get('/', loginFn);
// app.use('/',organisationRoutes);

module.exports = landingRouter
