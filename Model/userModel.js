const mongoClient = require('mongodb').MongoClient;
const db_name = "LCPT";
const url = "mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new mongoClient(url);


module.exports.insert_1_user = async function (userID, name, dob, address, email, org_id, role_id, share_emp_status) {
    var res;
    console.log("in insert user");


    var userObj = { "userID": userID, "name": name, "dob": dob, "address": address, "email": email, "org_id": org_id, "role_id": role_id, "share_emp_status": share_emp_status };

    await client.connect();
    res = await client.db(db_name).collection("user").insertOne(userObj);
    console.log("-----------------in insert user -> db insert call")
    console.log(res);
    client.close();
    return res;
    ;
}

module.exports.get_1_user = async function (userID) {
    var res;
    console.log("in get user");



    await client.connect();
    res = await client.db(db_name).collection("user").find({ "userID": userID });
    console.log("-----------------in get user -> db get call")
    console.log(res);
    client.close();
    return res;
    ;
}

module.exports.get_all_users = async function () {
    var res;
    console.log("in get all users");



    await client.connect();
    res = await client.db(db_name).collection("user").find({});
    console.log("-----------------in get all user -> db get all call")
    console.log(res);
    client.close();
    return res;
    ;
}
module.exports.delete_1_users = async function (userId) {
    var res;
    console.log("in get all users");



    await client.connect();
    res = await client.db(db_name).collection("user").remove({ "userID": userID });
    console.log("-----------------in get all user -> db get all call")
    console.log(res);
    client.close();
    return res;
    ;
}
module.exports.update_1_user = async function (userId, updateObj) {
    var res;
    console.log("in get all users");

    await client.connect();
    res = await client.db(db_name).collection("user").update({ "userID": userId }, updateObj);
    console.log("-----------------in get all user -> db get all call")
    console.log(res);
    client.close();
    return res;
    ;
}
