var express = require('express');
var { getAllUsers, getUserById, validateUser, saveUser, updateUser, fetchUserHomeRoleMapping } = require('../Controller/userController')
var userRouter = express.Router();


userRouter.get('/getAll', getAllUsers);
userRouter.get('/getUser/:id', getUserById);
userRouter.post('/validateUser', validateUser);
userRouter.put('/update/:id', updateUser);
userRouter.post('/save', saveUser);
userRouter.get('/fetchUHRdetails/:id', fetchUserHomeRoleMapping);

module.exports = userRouter;