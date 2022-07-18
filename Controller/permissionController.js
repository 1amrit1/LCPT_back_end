var { add_1_permission, update_1_permission } = require("../Model/permissionModel");
var { getUser } = require("../Service/userService");
var { sendMailForNewAdmin } = require("../Service/email");
const path = require('path');

module.exports.addPermissionFn = async (req, res) => {
    try {

        console.log("---------------====================== add Permission FUnction");
        console.log(req.body.userId, req.body.permissionType, req.body.permissionOfId);
        var user_id = req.body.userId;

        var permission_type = req.body.permissionType;

        var permission_of_id = req.body.permissionOfId;


        await add_1_permission(req.body.userId, req.body.permissionType, req.body.permissionOfId);
        getUser(req.body.userId).then((user) => {
            user = user[0];








            //send email------------------------------------
            // get user Id, name and email (will also use  permission type and id )

            console.log(user)
            console.log(req.body.userId)


            var userName = user.fullName;

            var userEmail = user.email;
            console.log("user name and mail");
            console.log(userName);
            console.log(userEmail);


            var addPermissionObj = {
                "user_name": userName,

                "user_id": user_id,

                "permission_type": permission_type,

                "permission_of_id": permission_of_id,

                "email": userEmail

            }

            sendMailForNewAdmin(addPermissionObj);



            res.send({ msg: "success" })
        }

        );


        // var testDescription = "placeholder descp placeholder descp placeholder descp placeholder descp placeholder descp placeholder descp placeholder descp placeholder descp "
    } catch (err) {
        console.log(err)

    }


}

module.exports.update_1_permission = async (req, res) => {


    var userId = req.params.userId;
    var permissionType = req.params.permissionType;
    var permissionId = req.params.permissionId;
    update_1_permission(userId, permissionType, permissionId, "active");

    res.sendFile(path.resolve('./Service/emailResponse.html'));



}