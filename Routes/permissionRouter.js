const express = require('express');
var { addPermissionFn } = require('../Controller/permissionController')


var permissionRouter = express.Router();


permissionRouter.post('/add', addPermissionFn);



module.exports = permissionRouter;
