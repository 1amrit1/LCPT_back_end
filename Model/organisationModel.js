const mongoClient = require('mongodb').MongoClient;
const db_url = "mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const db_name = "LCPT";
module.exports = {

    getHomesList(id, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                myDatabase.collection('home').find({ 'org_id': id }).toArray(function (err, result) {
                    if (err) {
                        return retFunc(1)
                    }
                    else {
                        console.log("===Home list === ",result);
                        return retFunc(result)
                    }
                })
            }
        })
    },

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
    editTrainingStandards(trainingObj, retFunc) {
        console.log("from delete", trainingObj)
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
                myDatabase.collection('organisation').updateOne(query, update, function (err, result) {
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
    editOrgDetails(orgDetailObj, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                var query = {
                    "org_id": orgDetailObj.org_id
                },
                    update = {
                        "$set": {
                            "org_name": orgDetailObj.org_name,
                            "contact_firstName": orgDetailObj.contact_firstName,
                            "contact_lastName": orgDetailObj.contact_lastName,
                            "phone_no": orgDetailObj.phone_no,
                            "email_id": orgDetailObj.email_id
                        }
                    }
                //console.log(trainingObj)
                myDatabase.collection('organisation').updateOne(query, update, function (err, result) {
                    if (err) {
                        return retFunc(1)
                    }

                    else {                        
                       return retFunc(result)
                    }
                })

            }
        })
    },

    addNewStandard(newStandardObj, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {

            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                var query = {
                    "org_id": newStandardObj.id
                },
                    update = {
                        "$set": {
                            "train_standards": newStandardObj.trainStandards
                        }
                    }
                //console.log(trainingObj)
                myDatabase.collection('organisation').updateOne(query, update, function (err, result) {
                    if (err) {
                        return retFunc(1)
                    }

                    else {
                        return retFunc(result)
                    }
                })

            }
        })
    },
    // fix this function?
    getStaffList(id, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                myDatabase.collection('user').find({ 'home_id': id }).toArray(function (err, result) {
                    if (err) {
                        return retFunc(1)

                    }
                    else {
                        
                        myDatabase.collection('user').aggregate([{
                            $lookup: {
                                from: "role",
                                localField: "role_id",
                                foreignField: "role_id",
                                as: "role_detail"
                            }
                        }]).toArray(function (err, newResult) {
                            if (err) {
                                return retFunc(1)

                            }
                            else {

                                return retFunc(newResult)
                            }
                        })
                    }
                })
            }
        })
    },
    getHomeDetails(id, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                myDatabase.collection('home').find({ home_id: id }).toArray(function (err, result) {
                    if (err) {
                        return retFunc(1)
                    }

                    else {
                        //  console.log("home details",result)
                        return retFunc(result)
                    }
                })
            }
        })
    },
    // editOrgDetails(orgDetailObj, retFunc) {
    //     mongoClient.connect(db_url, function (err, dbServer) {
    //         if (err) throw err;
    //         else {
    //             var myDatabase = dbServer.db(db_name);
    //            // var homeDetailObj = homeDetail.homeDetails

    //             console.log("to see org details", orgDetailObj)
    //             var query = {
    //                 "org_id": orgDetailObj.org_id,
    //                 "home_id": orgDetailObj.home_id
    //             },
    //                 update = {
    //                     "$set": {
    //                         "name": orgDetailObj.name,
    //                         "contact_firstName": orgDetailObj.contact_firstName,
    //                         "contact_lastName": orgDetailObj.contact_lastName,
    //                         "phone_no": orgDetailObj.phone_no,
    //                         "email_id": orgDetailObj.email_id
    //                     }
    //                 }
    //             //console.log(trainingObj)
    //             myDatabase.collection('home').updateOne(query, update, function (err, result) {
    //                 if (err) {
    //                     return retFunc(1)
    //                 }

    //                 else {
    //                     console.log("Home details here", result)
    //                     return retFunc(result)
    //                 }
    //             })

    //         }
    //     })
    // },
    addNewStaff(newStaff, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {

            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                var staffObj = {
                    "user_id" : newStaff.user_id,
                    "user_name": newStaff.user_name,
                    "dob": newStaff.dob,
                    "user_email": newStaff.user_email,
                    "org_id": newStaff.org_id,
                    "role_id": newStaff.role_id,
                    "emp_status": newStaff.emp_status,
                    "home_id": newStaff.home_id
                }
                console.log(staffObj)
                myDatabase.collection('user').insertOne(staffObj, function (err, result) {
                    if (err) {
                        return retFunc(1)
                    }

                    else {
                        return retFunc(result)
                    }
                })

            }
        })
    },
    editStaffStatus(newStaffStatus, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            console.log(newStaffStatus)

            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                var query = {"user_id":String(newStaffStatus.id)}
                update = {
                    "$set": {
                        "emp_status":newStaffStatus.emp_status
                    }
                }
                myDatabase.collection('user').updateOne(query,update, function (err, result) {
                    if (err) {
                        return retFunc(1)
                    }

                    else {
                        console.log(result)
                        return retFunc(result)
                    }
                })

            }
        })
    }
}
