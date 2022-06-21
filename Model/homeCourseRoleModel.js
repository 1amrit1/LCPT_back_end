const MongoClient = require('mongodb').MongoClient;
const db_name = "LCPT";
//const url = "mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const url = require('../Url-config').MONGO_URL;
const client = new MongoClient(url);
client.connect();
module.exports.getHomeCourseRoleData = async function () {
    var res = [];
    // console.l
    try {

        // await client.connect();
        res = await client.db(db_name).collection("home_crs_role").find().toArray();
        for (let i = 0; i < res.length; i++) {
            var crsIdArr = "[ ";
            var crsDetArr = res[i].course_details;
            for (let j = 0; j < crsDetArr.length; j++) {
                crsIdArr += ((crsDetArr[j].id) + " , ");
            }
            crsIdArr += "]"
            res[i].course_id_arr = crsIdArr;
        }
        console.log(res);
        // client.close();
    }
    catch (err) {
        console.log(err);
    }
    return res;

}