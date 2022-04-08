const { application } = require('express');
const express = require('express');
const { loginFn } = require('../Controller/loginController');
let loginRouter = express.Router()
const app = express();
// const organisationRoutes = require('./../Controller/organisationController');


loginRouter.get('/', loginFn);
// app.use('/',organisationRoutes);

module.exports = loginRouter
