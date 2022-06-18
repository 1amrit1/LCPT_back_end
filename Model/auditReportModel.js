const MongoClient = require('mongodb').MongoClient;
const db_name = "LCPT";
const url = "mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);


// if organization deletes the course then it will be deleted from the organization mapping db 
// if admin deletes the course then it will be deleted from course db as well as organization mapping db
// organization course will be actually home
// 
//COURSE => (COURSE_ID, TITLE, DESCRIPTION, TRAINING_DURATION, VALIDITY_DURATION,)

client.connect();

// module.exports.insert_1_course = async function (urhObj) {
//     var res = {};
//     // var courseObj = { "courseID": courseID, "title": title, "description": description, "training_duration": training_duration, "validity_duration": validity_duration };
//     try {

//         // await client.connect();
//         res = await client.db(db_name).collection("user_role_home_mapping").insertOne(urhObj);
//         // client.close();
//     } catch (err) {
//         console.log(err)
//     }

//     console.log(res);
//     return res;

// }

module.exports.getURHMapByHomeID = async function (homeID) {
    var res = [];
    // console.l
    try {

        // await client.connect();
        res = await client.db(db_name).collection("user_role_home_mapping").find({ "home_id": homeID }).toArray();
        console.log(res);
        // client.close();
    }
    catch (err) {
        console.log(err);
    }
    return res;

}

// get_1_course("1");


module.exports.getUserAllCoursesArr = async function (userID) {
    var res = [];
    // console.l
    try {

        // await client.connect();
        var tempRes = await client.db(db_name).collection("user_crs_mapping").find({ "user_id": userID }).toArray();
        for (let i = 0; i < tempRes.length; i++) {
            if (tempRes[i].status == true) {

                res.push(tempRes[i].course_id);
            }
        }

        console.log(res);
        // client.close();
    }
    catch (err) {
        console.log(err);
    }
    return res;

}
// getUserAllCoursesArr("2")

module.exports.getCoursesForRoleHome = async function (homeID, roleID) {
    var res = [];
    // console.l
    try {

        // await client.connect();
        var tempRes = await client.db(db_name).collection("home_crs_role").findOne({ "home_id": homeID }, { "role_id": roleID });
        var courseArr = tempRes.course_details;
        for (i = 0; i < courseArr.length; i++) {
            res.push(courseArr[i].id);
        }


        console.log(res);
        // client.close();
    }
    catch (err) {
        console.log(err);
    }
    return res;
}

// getCoursesForRoleHome("1", "4")
module.exports.getUserCourseByUser = async function (userID) {
    var res = [];
    // console.l
    try {

        // await client.connect();
        res = await client.db(db_name).collection("user_crs_mapping").find({ "user_id": userID }).toArray();

        console.log(res);
        // client.close();
    }
    catch (err) {
        console.log(err);
    }
    return res;

}