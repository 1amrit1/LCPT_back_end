const mongoClient = require('mongodb').MongoClient;
const db_url = "mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//const url = "mongodb+srv://admin:qwerty123@cluster0.h7iox.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const db_name = "LCPT";

const { ObjectId } = require("mongodb");
module.exports = {

    // To get the login details of user
     getHomesList(id, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                myDatabase.collection('home').find({'org_id':id}).toArray(function (err, result) {
                    if (err) {
                        return retFunc(1)

                    }
                    else {
                       console.log("homes list",result)
                        return retFunc(result)

                    }
                })
            }
        })
    },

    // to retrieve data for appointment details
     getOrganisationDetails(id, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                myDatabase.collection('organisation').find({ org_id: id }).toArray(function (err, result) {
                    if (err) {
                        return retFunc(1)
                    }

                    else {
                        console.log("org details",result)
                        return retFunc(result)
                    }
                })
            }
        })
    }
    ,
    editTrainingStandards(trainingObj, retFunc){
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);

                var query = { 
                "org_id": trainingObj.id
            },
            update = { 
                "$set": {
                    "train_standards": trainingObj.trainStandards
                }
            }
            console.log(trainingObj)
            myDatabase.collection('organisation').update(query, update, function(err, result) {
                if (err) {
                    return retFunc(1)
                }

                else {
                    console.log("org details",result)
                    return retFunc(result)
                }
            })
            
            }
        })
    }

    // //inserting appointment details
    // async addAppointmentIntoCollection(colName, theObject, retFunc) {

    //     mongoClient.connect(db_url, function (err, dbServer) {
    //         if (err) throw err;
    //         else {
    //             var myDatabase = dbServer.db(db_name);
    //             myDatabase.collection(colName).insertOne(theObject, function (err, result) {
    //                 if (err) {
    //                     return retFunc(1)

    //                 }
    //                 else {
    //                     return retFunc(result)
    //                 }
    //             })
    //         }
    //     })
    // },

    // // update appointment of user
    // async updateAppointmentIntoCollection(colName, updateQuery, updateClause, retFunc) {

    //     mongoClient.connect(db_url, function (err, dbServer) {
    //         if (err)
    //             throw err;
    //         else {
    //             var myDatabase = dbServer.db(db_name);
    //             myDatabase.collection(colName).updateOne(updateQuery, updateClause, function (er, result) {
    //                 if (err)
    //                     retFunc(1);
    //                 else {
    //                     return retFunc(result)
    //                 }
    //             })
    //         }
    //     })
    // },

    // // cancel an appointment 
    // async deleteAppointmentFromCollection(colName, delQuery, retFunc) {

    //     mongoClient.connect(db_url, function (err, dbServer) {
    //         if (err)
    //             throw err;
    //         else {

    //             var myDatabase = dbServer.db(db_name);
    //             myDatabase.collection(colName).deleteOne({ email: delQuery }, function (err, result) {
    //                 if (err)
    //                     return retFunc(1);
    //                 else {
    //                     return retFunc(result);
    //                 }
    //             });
    //         }
    //     })
    // },

    // // check if doctor is available at particular time
    // async checkDoctorAvailability(colName, theObject, retFunc) {

    //     mongoClient.connect(db_url, function (err, dbServer) {
    //         if (err)
    //             throw err;
    //         else {
    //             console.log(theObject)

    //             var myDatabase = dbServer.db(db_name);
    //             myDatabase.collection(colName).find({ doctorName: theObject.doctorName }, function (err, result) {
    //                 if (err)
    //                     return retFunc(1);
    //                 else {
    //                     return retFunc(result);
    //                 }
    //             });
    //         }
    //     })


    // }

}


