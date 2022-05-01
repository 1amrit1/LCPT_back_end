const MongoClient = require('mongodb').MongoClient;
const db_name = "LCPT";
const url = "mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);


client.connect();

module.exports.insert_1_role = async function (roleObj) {
    var res = {};
    try {

        res = await client.db(db_name).collection("role").insertOne(roleObj);
    } catch (err) {
        console.log(err)
    }

    console.log(res);
    return res;

}

module.exports.get_1_role = async function (courseID) {
    var res = {};
    try {

        // await client.connect();
        res = await client.db(db_name).collection("role").find({ "courseID": courseID });
        console.log(res);
        // client.close();
    }
    catch (err) {
        console.log(err);
    }
    return res;

}
