const express = require('express');
const { loginFn } = require('../Controller/loginController');
let loginRouter = express.Router()

loginRouter.get('/', loginFn);

module.exports = loginRouter
