const User = require('../Model/userModelSchema');
var UserService = require('../Service/userService');
var RoleService = require('../Service/roleService');

exports.getAllUsers = async function (req, res, next) {
    // Validate request parameters, queries using express-validator

    var page = req.params.page ? req.params.page : 1;
    var limit = req.params.limit ? req.params.limit : 10;
    try {
        var users = await UserService.getAllUsers({}, page, limit)
        console.log("Success > " + users);
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getUserById = async function (req, res, next) {
    var userId = req.params.id;
    try {

        //console.log("+++++++++++++ "+userId);
        //var queryWithId = {userId:userId};
        var users = await UserService.getUser(userId);
        //console.log("Success > "+users);
        return res.status(200).json({ status: 200, data: users[0], message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.validateUser = async function (req, res, next) {
    var Email = req.body.email;
    var Password = req.body.password;
    try {
        var queryWithDetails = { email: Email, password: Password };
        var users = await UserService.getUserValidated(queryWithDetails)
        //console.log("Success > "+users[0]);
        return res.status(200).json({ status: 200, data: users[0], message: "Succesfully retrieved user" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};


exports.saveUser = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var user = new User(req.body);
    try {
        console.log(user);
        var users = await UserService.saveUser(user)
        return res.status(200).json({ status: 200, data: users, message: "Succesfully saved user" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.updateUser = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var userObj = new User(req.body);
    var userId = req.params.id;
    try {
        var user = await UserService.updateUser(userId, userObj)
        return res.status(200).json({ status: 200, data: user, message: "Succesfully updated user" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.fetchUserHomeRoleMapping = function (req, res) {
    var userId = req.params.id;
    RoleService.getUserHomeRoleDetails(userId, function (result) {
        if (result.length == 0) {
            res.status(400).send('No User-Role-Home Mapping Found!')
        }
        else {
            console.log("=== User Role Home Mapping === \n", result);
            res.status(200).send(result);
        }

    });
}

exports.saveCourseBadgeUrl = function (req, res) {
    var userId = req.body.userId;
    var courseId = req.body.courseId;
    var badgeUrl = req.body.badgeUrl;
    console.log("=== Saving Badge Url for === ", userId, courseId, badgeUrl);
    RoleService.saveUserCourseBadgeUrl(userId, courseId, badgeUrl, function (resultObj) {
        if (!resultObj.success) {
            res.status(400).send('Something went wrong!')
        } else {
            res.status(200).send(resultObj.result)
        }

    });
}
