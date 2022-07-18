const express = require('express');
var { addPermissionFn, update_1_permission } = require('../Controller/permissionController')



var permissionRouter = express.Router();


permissionRouter.post('/add', addPermissionFn);
permissionRouter.get('/verifyNewAdmin/:userId/:permissionType/:permissionId', update_1_permission);



module.exports = permissionRouter;
