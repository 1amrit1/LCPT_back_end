const MongoClient = require('mongodb').MongoClient;
const db_name = "LCPT";
//const url = "mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const url = require('../Url-config').MONGO_URL;
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

module.exports.get_1_login = async function (login_id, password) {
    var res = {};
    try {

        // await client.connect();
        //console.log(login_id,password)
        res = await client.db(db_name).collection("login").find({ "login_id": login_id, "password": password }).toArray();
        
        if(!res  || res.length==0){
            return 'No User Found!'
        }
        else {
            newRes = await client.db(db_name).collection("users").find({ "user_id": parseInt(res[0].user_id) }).toArray();
           // console.log("newres",newRes)
            if(!newRes  || newRes.length==0){
                return 'No User Found!'
            }
        }
        // client.close();
    }
    catch (err) {
        console.log(err);
    }
    return {res,newRes};

}
