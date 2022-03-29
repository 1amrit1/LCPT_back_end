// const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const saltRounds = 10;
const url = "mongodb://127.0.0.1:27017/";
const db_name = "lcpt_db";
const client = new MongoClient(url);
const mongoose = require('mongoose');

// main().catch(err => console.log(err));

// async function main() {
//     await mongoose.connect('mongodb://localhost:27017/test');
// }

// const loginSchema = new Schema({
//     username: String, // String is shorthand for {type: String}
//     password: String,
//     role: String,

// });

//create
module.exports.insert_1_user = async function (userName, password, role) {
    var res;
    console.log("in insert user");

    // var passwordHash;
    // bcrypt.hash(password, saltRounds, async function (err, hash) {
    // passwordHash = hash;
    var userObj = { "userName": userName, "password": password, "role": role };

    await client.connect();
    res = await client.db(db_name).collection("login_table").insertOne(userObj);
    console.log(res + "-----------------in insert user")
    console.log(res);
    client.close();
    return true;
    // });
}
insert_1_user("admin2", "12345", "admin")