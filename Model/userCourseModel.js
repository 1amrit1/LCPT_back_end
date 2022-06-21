const MongoClient = require('mongodb').MongoClient;
const db_name = "LCPT";
//const url = "mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const url = require('../Url-config').MONGO_URL;
const client = new MongoClient(url);
client.connect();
module.exports.getAdmUsrCrsData = async function () {
    var res = [];
    // console.l
    try {

        // await client.connect();
        res = await client.db(db_name).collection("user_crs_mapping").find().toArray();
        for (let i = 0; i < res.length; i++) {
            // d.toLocaleDateString();
            res[i].validity_date = res[i].validity_date.toLocaleDateString();
        }
        console.log(res);
        // client.close();
    }
    catch (err) {
        console.log(err);
    }
    return res;

}