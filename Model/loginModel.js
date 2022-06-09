const MongoClient = require('mongodb').MongoClient;
const db_name = "LCPT";
const url = "mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);


client.connect();

module.exports.insert_1_login = async function (loginObj) {
    var res = {};
    try {

        res = await client.db(db_name).collection("login").insertOne(loginObj);
    } catch (err) {
        console.log(err)
    }

    console.log(res);
    return res;

}

module.exports.get_1_login = async function (loginId, password) {
    var res = {};
    try {

        // await client.connect();
        res = await client.db(db_name).collection("login").findOne({ "login_id": loginId, "password": password });
        console.log(res);
        // client.close();
    }
    catch (err) {
        console.log(err);
    }
    return res;

}
