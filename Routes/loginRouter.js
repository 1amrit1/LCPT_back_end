const { application } = require('express');
const express = require('express');
const { sendLoginDetails } = require('../Controller/loginController');
let loginRouter = express.Router()
const app = express();


loginRouter.post('/', sendLoginDetails);

module.exports = loginRouter
