const MongoClient = require('mongodb').MongoClient;
const db_name = "LCPT";
const url = "mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);

// if organization deletes the course then it will be deleted from the organization mapping db 
// if admin deletes the course then it will be deleted from course db as well as organization mapping db
// organization course will be actually home
// 
//COURSE => (COURSE_ID, TITLE, DESCRIPTION, TRAINING_DURATION, VALIDITY_DURATION,)



module.exports.insert_1_course = async function (courseObj) {
    var res;
    // var courseObj = { "courseID": courseID, "title": title, "description": description, "training_duration": training_duration, "validity_duration": validity_duration };

    await client.connect();
    res = await client.db(db_name).collection("course").insertOne(courseObj);
    client.close();

    console.log(res);
    return res;

}

module.exports.get_1_course = async function (courseID) {
    var res;
    await client.connect();
    res = await client.db(db_name).collection("course").find({ "courseID": courseID });
    console.log(res);
    client.close();
    return res;

}

module.exports.get_all_courses = async function () {
    var res;
    await client.connect();
    res = await client.db(db_name).collection("course").find({}).toArray();
    // console.log(res);
    client.close();
    return res;

}

module.exports.update_1_course = async function (courseID, updateObj) {
    var res;
    console.log("in get all users");
    await client.connect();
    res = await client.db(db_name).collection("course").update({ "courseID": courseID }, updateObj);
    console.log(res);
    client.close();
    return res;

}

// in delete course, it will be verified in some way that the course is being removed from course and all its mapping table
// module.exports.delete_1_course = async function (courseID) {
//     var res;
//     await client.connect();
//     res = await client.db(db_name).collection("course").remove({ "courseID": courseID });
//     console.log(res);
//     client.close();
//     return res;
//     ;
// }