var { get_1_login } = require('../Model/loginModel')
module.exports.sendLoginDetails = async (req, res) => {
    // var data = [];
    console.log(req.body)
    var data = await get_1_login(req.body.loginId, req.body.password);

    res.send(data);
}