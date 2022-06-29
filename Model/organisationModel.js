const mongoClient = require('mongodb').MongoClient;
//const db_url = "mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const db_url = require('../Url-config').MONGO_URL;
const db_name = "LCPT";
var EmailService = require('../Service/email');

module.exports = {

    getHomesList(id, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                //  console.log(id)
                myDatabase.collection('home').find({ 'org_id': id }).toArray(function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }
                    else {
                        console.log("----------------------->>>> orgg model");
                        console.log(result);
                        //      console.log("===Home list === ", result);
                        return retFunc({ "success": true, "result": result })
                    }
                })
            }
        })
    },
    getAllHomesCount(retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);

                myDatabase.collection('home').find().toArray(function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }
                    else {
                        //console.log("===Home list === ", result);
                        return retFunc({ "success": true, result: result.length })
                    }
                })
            }
        })
    },
    getRoleLength(retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);

                myDatabase.collection('home_crs_role').find().toArray(function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }
                    else {
                        return retFunc({ "success": true, result: result.length })
                    }
                })
            }
        })
    },
    getOrganizationsList(retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                //  console.log(id)
                myDatabase.collection('organisation').find().toArray(function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }
                    else {
                        //     console.log("===Home list === ", result);
                        return retFunc({ "success": true, result: result })
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
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        return retFunc({ "success": true, result: result })
                    }
                })
            }
        })
    }
    ,
    editTrainingStandards(trainingObj, retFunc) {
        //    console.log("from delete", trainingObj)
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
                myDatabase.collection('organisation').updateOne(query, update, function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        myDatabase.collection('home').find({ 'org_id': id }).toArray(function (homeErr, homeResult) {
                            if (err) {
                                return retFunc({ "success": false, result: homeErr })
                            }
                            else {
                                var homeTrainArray = []
                                for (var i = 0; i < homeResult.length; i++) {
                                    homeTrainObj = {
                                        "home_id": homeResult[i].home_id,
                                        "role_id": trainingObj.trainStandards.role_id,
                                        "role_details": trainingObj.trainStandards.role_details,
                                        "role_name": trainingObj.trainStandards.role_name,
                                        "course_details": [],
                                        "archived": "False",

                                    }
                                    homeTrainArray.push(homeTrainObj)
                                }
                                console.log("training array", homeTrainArray)
                                myDatabase.collection('home_crs_role').insertMany(homeTrainArray, function (newErr, newResult) {
                                    if (err) {
                                        return retFunc({ "success": false, result: newErr })
                                    }

                                    else {
                                        return retFunc({ "success": true, result: result })
                                    }
                                })

                            }
                        })



                        // return retFunc({"success":true,result:result})
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
                myDatabase.collection('organisation').updateOne(query, update, function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        return retFunc({ "success": true, result: result })
                    }
                })

            }
        })
    },
    editHomeDetails(homeDetailObj, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                // console.log(homeDetailObj.homeDetails)
                var myDatabase = dbServer.db(db_name);
                var query = {
                    "org_id": homeDetailObj.org_id,
                    "home_id": homeDetailObj.home_id
                },
                    update = {
                        "$set": {
                            "name": homeDetailObj.name,
                            "contact_firstName": homeDetailObj.contact_firstName,
                            "contact_lastName": homeDetailObj.contact_lastName,
                            "phone_no": homeDetailObj.phone_no,
                            "email_id": homeDetailObj.email_id
                        }
                    }
                myDatabase.collection('home').updateOne(query, update, function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        return retFunc({ "success": true, result: result })
                    }
                })

            }
        })
    },

    // addNewStandard(newStandardObj, retFunc) {
    //     mongoClient.connect(db_url, function (err, dbServer) {
    //         console.log("THis is new standardObj",newStandardObj)

    //         if (err) throw err;
    //         else {
    //             var myDatabase = dbServer.db(db_name);
    //             var query = {
    //                 "org_id": newStandardObj.id
    //             },
    //                 update = {
    //                     "$set": {
    //                         "train_standards": newStandardObj.trainStandards
    //                     }
    //                 }
    //             //console.log(trainingObj)
    //             myDatabase.collection('organisation').updateOne(query, update, function (err, result) {
    //                 if (err) {
    //                     return retFunc({"success":false,result:err})
    //                 }

    //                 else {
    //                     return retFunc({"success":true,result:result})
    //                 }
    //             })

    //         }
    //     })
    // },
    addNewStandard(trainingObj, retFunc) {
        //    console.log("from delete", trainingObj)
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
                myDatabase.collection('organisation').updateOne(query, update, function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        myDatabase.collection('home').find({ 'org_id': trainingObj.id }).toArray(function (homeErr, homeResult) {
                            if (homeErr) {
                                return retFunc({ "success": false, result: homeErr })
                            }
                            else {
                                console.log("Hi there")
                                var homeTrainArray = []
                                for (var i = 0; i < homeResult.length; i++) {
                                    //     for(var j=0;j<trainingObj.trainStandards.length;j++){
                                    homeTrainObj = {
                                        "home_id": homeResult[i].home_id,
                                        "role_id": trainingObj.newStandard.role_id,
                                        "role_details": trainingObj.newStandard.role_details,
                                        "role_name": trainingObj.newStandard.role_name,
                                        "course_details": [],
                                        "archived": "False",

                                    }
                                    homeTrainArray.push(homeTrainObj)
                                    // }

                                }
                                //console.log("training array",homeTrainArray)
                                myDatabase.collection('home_crs_role').insertMany(homeTrainArray, function (newErr, newResult) {
                                    if (err) {
                                        return retFunc({ "success": false, result: newErr })
                                    }

                                    else {
                                        return retFunc({ "success": true, result: result })
                                    }
                                })

                            }
                        })



                        // return retFunc({"success":true,result:result})
                    }
                })

            }
        })
    },
    getStaffList(id, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                myDatabase.collection('user_role_home_mapping').find({ home_id: id }).toArray(function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }
                    else {
                        return retFunc({ "success": true, result: result })
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
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        return retFunc({ "success": true, result: result })
                    }
                })
            }
        })
    },


    addNewStaff(addStaffObj, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {

            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                home_arr = [];
                role_arr = []
                role_arr.push({ "role_id": addStaffObj.role_id, "role_name": addStaffObj.role_name })
                var staffObj = {
                    "user_id": addStaffObj.user_id,
                    "dob": addStaffObj.dob,
                    "role_arr": role_arr,
                    "emp_status": 'Pending',//addStaffObj.emp_status,
                    "home_id": addStaffObj.home_id,
                    "user_name": addStaffObj.user_name,
                }
                EmailService.main(addStaffObj);
                console.log(staffObj)
                myDatabase.collection('user_role_home_mapping').insertOne(staffObj, function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        return retFunc({ "success": true, result: result })
                    }
                })

            }
        })
    },
    editStaffStatus(newStaffStatus, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            // console.log(newStaffStatus)

            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                var query = { "user_id": String(newStaffStatus.id) }
                update = {
                    "$set": {
                        "emp_status": newStaffStatus.emp_status
                    }
                }
                myDatabase.collection('user_role_home_mapping').updateOne(query, update, function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        return retFunc({ "success": true, result: result })
                    }
                })

            }
        })
    },
    showHomeCheckList(id, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);

                myDatabase.collection('home_crs_role').find({ home_id: id }).toArray(function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {

                        return retFunc({ "success": true, result: result })
                    }
                })
            }
        })
    },
    editRoleStatus(editRoleObj, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                var query = { "role_id": String(editRoleObj.role_id), "home_id": String(editRoleObj.home_id) }
                update = {
                    "$set": {
                        "archived": editRoleObj.archived
                    }
                }
                myDatabase.collection('home_crs_role').updateOne(query, update, function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        return retFunc({ "success": true, result: result })
                    }
                })

            }
        })
    },
    addNewRole(addRoleObj, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                var roleObj = {
                    "course_details": [],
                    "role_name": addRoleObj.role_name,
                    "role_id": addRoleObj.role_id,
                    "home_id": addRoleObj.home_id
                }
                myDatabase.collection('home_crs_role').insertOne(roleObj, function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        return retFunc({ "success": true, result: result })
                    }
                })

            }
        })
    },
    getRoleTemplateDetails(idDetails, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);

                myDatabase.collection('home_crs_role').find({ "home_id": idDetails.home_id, "role_id": idDetails.role_id }).toArray(function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        return retFunc({ "success": true, result: result })
                    }
                })
            }
        })
    },

    getCourseList(retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);

                myDatabase.collection('course').find().toArray(function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        return retFunc({ "success": true, result: result })
                    }
                })

            }
        })
    },
    addNewHome(addHomeObj, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                myDatabase.collection('home').insertOne(addHomeObj, function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        return retFunc({ "success": true, result: result })
                    }
                })

            }
        })
    },
    addCheckListRole(roleObj, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                myDatabase.collection('home_crs_role').insertOne(roleObj, function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        return retFunc({ "success": true, result: result })
                    }
                })

            }
        })
    },
    editCourseDetails(roleObj, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                //  console.log("role obj", roleObj)
                var query = { "role_id": String(roleObj.role_id), "home_id": String(roleObj.home_id) }
                update = {
                    "$set": {
                        "course_details": roleObj.course_details
                    }
                }
                myDatabase.collection('home_crs_role').updateOne(query, update, function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        return retFunc({ "success": true, result: result })
                    }
                })

            }
        })
    },
    addAssignRoleText(roleObj, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                var query = { "user_id": String(roleObj.user_id), "home_id": String(roleObj.home_id) }
                update = {
                    "$set": {
                        "role_arr": roleObj.role_arr
                    }
                }
                myDatabase.collection('user_role_home_mapping').updateOne(query, update, function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        return retFunc({ "success": true, result: result })
                    }
                })

            }
        })
    },
    getAllHomesList(id, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                myDatabase.collection('home').find({}).toArray(function (err, result) {
                    if (err) {
                        return retFunc(1);
                    }
                    else {
                        console.log("=== All Home list === ", result);
                        return retFunc(result);
                    }
                })
            }
        })
    },

    getHome_Crs_Role_Json(query, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                myDatabase.collection('home_crs_role').find(query).toArray(function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        return retFunc({ "success": true, result: result })
                    }
                })
            }
        })
    },
    addNewOrg(OrgObj, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                myDatabase.collection('organisation').insertOne(OrgObj, function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        return retFunc({ "success": true, result: result })
                    }
                })

            }
        })
    },

    verifyNewUserForHome(userId, homeId, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {

            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                var query = {
                    "home_id": String(homeId),
                    "user_id": String(userId)
                },
                    update = {
                        "$set": {
                            "emp_status": 'Active'
                        }
                    }
                myDatabase.collection('user_role_home_mapping').updateOne(query, update, function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        console.log('Updated employment status to Active for UserId : ', userId,
                            ' and HomeId :', homeId);
                        return retFunc({ "success": true, result: result })
                    }
                })

            }
        })
    }


}
