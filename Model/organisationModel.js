const mongoClient = require('mongodb').MongoClient;
const db_url = "mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const db_name = "LCPT";
module.exports = {

    getHomesList(id, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                console.log(id)
                myDatabase.collection('home').find({ 'org_id': id }).toArray(function (err, result) {
                    if (err) {
                        return retFunc(1)
                    }
                    else {
                        console.log("===Home list === ", result);
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
    getStaffList(id, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
           //     console.log("getting hit: ",id)
                myDatabase.collection('user_role_home_mapping').find({home_id:id}).toArray(function (err, result) {
                    if (err) {
                        return retFunc(1)

                    }
                    else {
<<<<<<< HEAD

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
=======
                        return retFunc(result)
                       
>>>>>>> 43ef4be30c5bc558697553bf35de5510eeefff34
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
    addNewStaff(addStaffObj, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {

            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                home_arr = [];
                role_arr = []
               // home_arr.push({"home_id":addStaffObj.home_id})
                role_arr.push({"role_id":addStaffObj.role_id,"role_name":addStaffObj.role_name})
                var staffObj = {
<<<<<<< HEAD
                    "user_id": newStaff.user_id,
                    "user_name": newStaff.user_name,
                    "dob": newStaff.dob,
                    "user_email": newStaff.user_email,
                    "org_id": newStaff.org_id,
                    "role_id": newStaff.role_id,
                    "emp_status": newStaff.emp_status,
                    "home_id": newStaff.home_id
=======
                    "user_id" : addStaffObj.user_id,                   
                    "dob": addStaffObj.dob,                   
                    "role_arr": role_arr,
                    "emp_status": addStaffObj.emp_status,
                    "home_id": addStaffObj.home_id,
                    "user_name": addStaffObj.user_name
>>>>>>> 43ef4be30c5bc558697553bf35de5510eeefff34
                }
                console.log(staffObj)
                myDatabase.collection('user_role_home_mapping').insertOne(staffObj, function (err, result) {
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
                var query = { "user_id": String(newStaffStatus.id) }
                update = {
                    "$set": {
                        "emp_status": newStaffStatus.emp_status
                    }
                }
<<<<<<< HEAD
                myDatabase.collection('user').updateOne(query, update, function (err, result) {
=======
                myDatabase.collection('user_role_home_mapping').updateOne(query,update, function (err, result) {
>>>>>>> 43ef4be30c5bc558697553bf35de5510eeefff34
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
    },
    showHomeCheckList(id, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);

                myDatabase.collection('home_crs_role').find({ home_id: id }).toArray(function (err, result) {
                    if (err) {
                        return retFunc(1)
                    }
    
                    else {
                         //  console.log("Here details",result," id:",String(id))
                        //  myDatabase.collection('course').find().toArray(function (err, courseResult) {
                        //     if (err) {
                        //         return retFunc(1)
                        //     }
            
                        //     else {
                        //            console.log("Here course details and roleDetails",result,courseResult)
                        //         return retFunc(courseResult)
                        //     }
                        // })
                        return retFunc(result)
                    }
                })
            }
        })
    },
    editRoleStatus(editRoleObj,retFunc){
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                var query = {"role_id":String(editRoleObj.role_id),"home_id":String(editRoleObj.home_id)}
                update = {
                    "$set": {
                        "archived":editRoleObj.archived
                    }
                }
                myDatabase.collection('home_crs_role').updateOne(query,update, function (err, result) {
                    if (err) {
                        return retFunc(1)
                    }

                    else {
                    //    console.log(result)
                        return retFunc(result)
                    }
                })

            }
        })
    },
    addNewRole(addRoleObj,retFunc){
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
               // console.log("role OBJ ",roleObj)
                myDatabase.collection('home_crs_role').insertOne(roleObj, function (err, result) {
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
    getRoleTemplateDetails(idDetails, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);

                myDatabase.collection('home_crs_role').find({ "home_id": idDetails.home_id,"role_id": idDetails.role_id}).toArray(function (err, result) {
                    if (err) {
                        return retFunc(1)
                    }
    
                    else {
                        
                        //   console.log("Here template details",idDetails)
                        return retFunc(result)
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
                        return retFunc(1)
                    }
    
                    else {
                        //   console.log("Here course details",result)
                        return retFunc(result)
                    }
                })
            }
        })
    },
    addNewHome(addHomeObj,retFunc){
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                // var roleObj = {
                  
                //     "course_details": addHomeObj.course_details,
                //     "role_name": addHomeObj.role_name,
                //     "org_id": addHomeObj.org_id,
                //     "role_id": addHomeObj.role_id,
                //     "home_id": addHomeObj.home_id
                // }
                // console.log("role OBJ ",roleObj)
                myDatabase.collection('home').insertOne(addHomeObj, function (err, result) {
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
    addCheckListRole(roleObj,retFunc){
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
               // console.log("role obj",roleObj)
                myDatabase.collection('home_crs_role').insertOne(roleObj, function (err, result) {
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
    editCourseDetails(roleObj,retFunc){
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                console.log("role obj",roleObj)
                var query = {"role_id":String(roleObj.role_id),"home_id":String(roleObj.home_id)}
                update = {
                    "$set": {
                        "course_details":roleObj.course_details
                    }
                }
                myDatabase.collection('home_crs_role').updateOne(query,update, function (err, result) {
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
    addAssignRoleText(roleObj,retFunc){
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                console.log("role obj",roleObj)
                var query = {"user_id":String(roleObj.user_id),"home_id":String(roleObj.home_id)}
                update = {
                    "$set": {
                        "role_arr":roleObj.role_arr
                    }
                }
                myDatabase.collection('user_role_home_mapping').updateOne(query,update, function (err, result) {
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
<<<<<<< HEAD
                myDatabase.collection('home_crs_role').find({ 'home_id': String(id) }).toArray(function (err, result) {
=======
                myDatabase.collection('home_crs_role').find(query).toArray(function (err, result) {
>>>>>>> 43ef4be30c5bc558697553bf35de5510eeefff34
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
    }
}
