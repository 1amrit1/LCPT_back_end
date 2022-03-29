module.exports.loginFn = function (req, res) {
    console.log("sending data")
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ "user": { "role": "dummy user", "name": "test" } });
}
module.exports.createUserFn = function (req, res) {

}