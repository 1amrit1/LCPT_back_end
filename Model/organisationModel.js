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
                    //   console.log("homes list",result)
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
                    //    console.log("org details",result)
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
           // console.log(trainingObj)
            myDatabase.collection('organisation').update(query, update, function(err, result) {
                if (err) {
                    return retFunc(1)
                }

                else {
                 //   console.log("org details",result)
                    return retFunc(result)
                }
            })
            
            }
        })
    },
    editOrgDetails(orgDetailObj, retFunc){
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);

                console.log("to see details",orgDetailObj.homeDetails)
                var query = { 
                "org_id": orgDetailObj.homeDetails.org_id
            },
            update = { 
                "$set": {
                    "org_name": orgDetailObj.homeDetails.org_name,
                    "contact_firstName":orgDetailObj.homeDetails.contact_firstName,
                    "contact_lastName":orgDetailObj.homeDetails.contact_lastName,
                    "phone_no":orgDetailObj.homeDetails.phone_no,
                    "email_id":orgDetailObj.homeDetails.email_id
                }
            }
            //console.log(trainingObj)
            myDatabase.collection('organisation').update(query, update, function(err, result) {
                if (err) {
                    return retFunc(1)
                }

                else {
                    console.log("org details here",result)
                    return retFunc(result)
                }
            })
            
            }
        })
    }
   // editHomeDetails

    
}


