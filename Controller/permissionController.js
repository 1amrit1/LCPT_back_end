var { add_1_permission } = require("../Model/permissionModel");

module.exports.addPermissionFn = function (req, res) {
    try {

        console.log("---------------====================== add Permission FUnction");
        console.log(req.body.userId, req.body.permissionType, req.body.permissionOfId);


        add_1_permission(req.body.userId, req.body.permissionType, req.body.permissionOfId);
        res.send({ msg: "success" })
        // var testDescription = "placeholder descp placeholder descp placeholder descp placeholder descp placeholder descp placeholder descp placeholder descp placeholder descp "
    } catch (err) {

    }


}