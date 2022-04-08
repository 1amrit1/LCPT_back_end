const { application } = require('express');
const express = require('express');
const { loginFn } = require('../Controller/loginController');
let userRouter = express.Router()
const app = express();
// const organisationRoutes = require('./../Controller/organisationController');


userRouter.get('/', loginFn);
// app.use('/',organisationRoutes);

module.exports = userRouter
