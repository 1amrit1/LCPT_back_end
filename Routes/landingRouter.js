const { application } = require('express');
const express = require('express');
const { loginFn } = require('../Controller/landingController');
let landingRouter = express.Router()
const app = express();


landingRouter.get('/', loginFn);

module.exports = landingRouter
