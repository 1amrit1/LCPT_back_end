var express = require('express');
var { getAllUsers, getUserById, validateUser, saveUser, updateUser, fetchUserHomeRoleMapping, saveCourseBadgeUrl, sendAuditEmailToEmp } = require('../Controller/userController')
var userRouter = express.Router();
const multer = require('multer');
const upload = multer();

userRouter.get('/getAll', getAllUsers);
userRouter.get('/getUser/:id', getUserById);
userRouter.post('/validateUser', validateUser);
userRouter.put('/update/:id', updateUser);
userRouter.post('/save', saveUser);
userRouter.get('/fetchUHRdetails/:id', fetchUserHomeRoleMapping);
userRouter.post('/saveBadgeUrl', saveCourseBadgeUrl);
userRouter.post('/sendEmailEmp', upload.single('file'),  sendAuditEmailToEmp);

module.exports = userRouter;