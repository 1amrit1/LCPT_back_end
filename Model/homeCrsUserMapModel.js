// user_role_home_mapping
const MongoClient = require('mongodb').MongoClient;
const db_name = "LCPT";
const url = "mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);
client.connect();

module.exports.insert_1_uch_map = async function (courseObj) {
    //insert 1 user course home mapping
    var res = {};

    try {

        res = await client.db(db_name).collection("user_role_home_mapping").insertOne(courseObj);
    } catch (err) {
        console.log(err)
    }

    console.log(res);
    
    return res;

}