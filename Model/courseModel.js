const MongoClient = require('mongodb').MongoClient;
const db_name = "LCPT";
//const url = "mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const url = require('../Url-config').MONGO_URL;
const client = new MongoClient(url);


// if organization deletes the course then it will be deleted from the organization mapping db 
// if admin deletes the course then it will be deleted from course db as well as organization mapping db
// organization course will be actually home
// 
//COURSE => (COURSE_ID, TITLE, DESCRIPTION, TRAINING_DURATION, VALIDITY_DURATION,)

client.connect();

module.exports.insert_1_course = async function (courseObj) {
    var res = {};
    // var courseObj = { "courseID": courseID, "title": title, "description": description, "training_duration": training_duration, "validity_duration": validity_duration };
    try {

        // await client.connect();
        res = await client.db(db_name).collection("course").insertOne(courseObj);
        // client.close();
    } catch (err) {
        console.log(err)
    }

    console.log(res);
    return res;

}

module.exports.get_1_course = async function (courseID) {
    var res = {};
    try {

        // await client.connect();
        res = await client.db(db_name).collection("course").find({ "courseID": courseID });
        console.log(res);
        // client.close();
    }
    catch (err) {
        console.log(err);
    }
    return res;

}

module.exports.get_all_courses = async function () {
    var res = [];
    try {

        // await client.connect();
        res = await client.db(db_name).collection("course").find({}).toArray();
        // console.log(res);
        // client.close();
    } catch (err) {
        console.log(err);
    }
    return res;

}

module.exports.update_1_course = async function (courseID, updateObj) {
    var res;
    console.log("in get all users");
    await client.connect();

    var updObj = {
        $set: { title: updateObj.title, description: updateObj.description, validity_duration: updateObj.validity_duration, training_duration: updateObj.training_duration }
    }

    res = await client.db(db_name).collection("course").updateOne({ "courseID": courseID }, updObj);
    console.log(res);
    client.close();
    return res;

}

module.exports.getUserCourseDetails = async function (homeId, roleId, userId, retFunc) {
    // var response = [];
    MongoClient.connect(url, function (err, dbServer) {
        if (err) throw err;
        else {
            var myDatabase = dbServer.db(db_name);
            myDatabase.collection('home_crs_role').find({ home_id: String(homeId), role_id: String(roleId) }).toArray(function (err, result) {
                if (err) {
                    return retFunc(1);
                } else {
                    console.log("======= Got result from getUserCourseDetails ======= ", result);
                    retFunc(result);
                }
            })
        }
    })
    // console.log("=======> Response == ", response);
    return retFunc;
}

module.exports.getUserCompletedCourses = async function (homeId, roleId, userId, retFunc) {
    MongoClient.connect(url, function (err, dbServer) {
        if (err) throw err;
        else {
            var myDatabase = dbServer.db(db_name);
            console.log(userId, " ", roleId, " ", homeId);
            myDatabase.collection('user_crs_mapping').find({ 'user_id': String(userId) }).toArray(function (err, inner) {
                if (err) {
                    retFunc(1);
                } else {
                    console.log("======= Got result from getUserCompletedCourses ======= ", inner);
                    retFunc(inner);
                }
            })
        }
    });
     return retFunc;
}


module.exports.getAllCourses = async function (retFunc) {
    MongoClient.connect(url, function (err, dbServer) {
        if (err) throw err;
        else {
            var myDatabase = dbServer.db(db_name);
            myDatabase.collection('course').find({}).toArray(function (err, inner) {
                if (err) {
                    retFunc(1);
                } else {
                    console.log("======= Got result from getAllCourses ======= ", inner.length);
                    retFunc(inner);
                }
            })
        }
    });
    return retFunc;
}

//in delete course, it will be verified in some way that the course is being removed from course and all its mapping table
module.exports.delete_1_course = async function (courseID) {
    var res;
    await client.connect();
    res = await client.db(db_name).collection("course").remove({ "courseID": courseID });
    console.log(res);
    client.close();
    return res;
    ;
}