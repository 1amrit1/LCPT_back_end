const mongoClient = require('mongodb').MongoClient;
//const db_url = "mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const db_url = require('../Url-config').MONGO_URL;
const db_name = "LCPT";
var EmailService = require('../Service/email');
const client = new mongoClient(db_url);
const server = require('./../server')
//import {db} from './../server'
var mydb = global.db

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
            //mongoClient.close()
        })
        //mongoClient.close()
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
            //mongoClient.close()
        })
    },
    getOrgCount(retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
               
                myDatabase.collection('organisation').find().toArray(function (err, result) {
                    if (err) {
                        return retFunc({"success":false,result:err})
                    }
                    else {
                        //console.log("===Home list === ", result);
                        return retFunc({"success":true,result:result.length})
                    }
                })
            }
            //mongoClient.close()
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
            //mongoClient.close()
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
            //mongoClient.close()
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
            //mongoClient.close()
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

                    }
                })

            }
            //mongoClient.close()
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
            //mongoClient.close()
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
            //mongoClient.close()
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
                                    return retFunc({"success":false,result:homeErr})
                                }
                                else {  
                                    var homeTrainArray = []
                                    for(var i = 0;i<homeResult.length;i++){
                                    //     for(var j=0;j<trainingObj.trainStandards.length;j++){
                                        homeTrainObj = {
                                            "home_id":homeResult[i].home_id,
                                            "role_id":trainingObj.newStandard.role_id,
                                            "role_details":trainingObj.newStandard.role_details,
                                            "role_name":trainingObj.newStandard.role_name,
                                            "course_details":[],
                                            "archived":"False",
                                            "org_id":String(trainingObj.id)
    
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
            //mongoClient.close()
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
            //mongoClient.close()
        })
    },


    addNewStaff(addStaffObj, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {

            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                home_arr = [];
                role_arr = []
                role_arr.push({ "role_id": addStaffObj.role_id, "role_name": addStaffObj.role_name , "emp_status": 'Hold'})
                var staffObj = {
                    "user_id": addStaffObj.user_id,
                    "dob": addStaffObj.dob,
                    "role_arr": role_arr,
                   //addStaffObj.emp_status,
                    "home_id": addStaffObj.home_id,
                    "user_name": addStaffObj.user_name,
                }
                EmailService.sendMail(addStaffObj);
                //console.log(staffObj)
                var query = { "user_id": String(addStaffObj.user_id), "dob": addStaffObj.dob, "user_name": addStaffObj.user_name, "home_id": String(addStaffObj.home_id) }
                update = {
                    "$push": {
                        "role_arr": { "role_id": addStaffObj.role_id, "role_name": addStaffObj.role_name , "emp_status": 'Hold'}
                    }
                }
                const options = { upsert: true };
                myDatabase.collection('user_role_home_mapping').updateOne(query, update, options, function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }else {
                       // console.log("success", result);
                        return retFunc({ "success": true, result: result })
                    }
                })
            }
            //mongoClient.close()
        })
    },
    editStaffStatus(newStaffStatus, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            // console.log(newStaffStatus)

            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                var query = { "user_id": String(newStaffStatus.user_id), "home_id":String(newStaffStatus.home_id) }
                update = {
                    "$set": {
                        "role_arr": newStaffStatus.role_arr
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
            //mongoClient.close()
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
            //mongoClient.close()
        })
    },
    editRoleStatus(editRoleObj, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                if(editRoleObj.org_id)
                var query = { "role_id": String(editRoleObj.role_id), "org_id": String(editRoleObj.org_id) }
                else
                var query = { "role_id": String(editRoleObj.role_id), "home_id": String(editRoleObj.home_id) }
                update = {
                    "$set": {
                        "archived": editRoleObj.archived
                    }
                }
                myDatabase.collection('home_crs_role').updateMany(query, update, function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        return retFunc({ "success": true, result: result })
                    }
                })

            }
            //mongoClient.close()
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
            //mongoClient.close()
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
            //mongoClient.close()
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
            //mongoClient.close()
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

                        myDatabase.collection('home_crs_role').find({ 'org_id': addHomeObj.org_id}).toArray(function (homeErr, homeResult) {
                            if (homeErr) {
                                return retFunc({"success":false,result:homeErr})
                            }
                            else {  
                                var homeTrainArray = []
                                var map = new Map()
                                for(var i = 0;i<homeResult.length;i++){
                                //     for(var j=0;j<trainingObj.trainStandards.length;j++){
                                    homeTrainObj = {
                                        "home_id":addHomeObj.home_id,
                                        "role_id":homeResult[i].role_id,
                                        "role_details":homeResult[i].role_details,
                                        "role_name":homeResult[i].role_name,
                                        "course_details":homeResult[i].course_details,
                                        "archived":"False",
                                        "org_id":String(addHomeObj.org_id)

                                    }
                                    if(map.get(homeResult[i].role_id)==undefined){
                                        homeTrainArray.push(homeTrainObj)
                                        map.set(homeResult[i].role_id,homeResult[i].role_name)

                                    }
                                // }
                                
                            }
                                //console.log("training array",homeTrainArray)
                                myDatabase.collection('home_crs_role').insertMany(homeTrainArray, function (newErr, newResult) {
                                    if (err) {
                                        return  retFunc({"success":false,result:newErr})
                                    }
                
                                    else {
                                        return retFunc({"success":true,result:result})
                                    }
                                })

                            }
                        })
                    

                      
                       // return retFunc({"success":true,result:result})
                   


                    }
                })

            }
            //mongoClient.close()
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
            //mongoClient.close()
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
            //mongoClient.close()
        })
    },
    editOrgCourseDetails(roleObj, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
              //  console.log("role obj", roleObj)
                var query = { "role_id": String(roleObj.role_id), "org_id": String(roleObj.org_id) }
                update = {
                    "$set": {
                        "course_details": roleObj.course_details
                    }
                }
                myDatabase.collection('home_crs_role').updateMany(query, update, function (err, result) {
                    if (err) {
                        return retFunc({"success":false,result:err})
                    }

                    else {
                        return retFunc({"success":true,result:result})
                    }
                })

            }
            //mongoClient.close()
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
            //mongoClient.close()
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
            //mongoClient.close()
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
            //mongoClient.close()
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
            //mongoClient.close()
        })
    },
    getOrgRoleList(id,retFunc){
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                myDatabase.collection('home_crs_role').find({ "org_id": String(id)}).toArray(function (err, result) {
                    if (err) {
                        return retFunc({"success":false,result:err})
                    }

                    else {
                        var map = new Map();
                        var tempArr = [];
                        for(var i=0;i<result.length;i++){
                            if(map.get(result[i].role_id)==undefined){
                                map.set((result[i].role_id),(result[i]).role_details)
                                tempArr.push(result[i]);
                            }
                        }
                        return retFunc({"success":true,result:tempArr})
                    }
                })

            }
            //mongoClient.close()
        })
    },

    verifyNewUserForHome(userId, homeId, roleId, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {

            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                var query = {
                    "home_id": String(homeId),
                    "user_id": String(userId),
                    "role_arr.role_id": String(roleId),
                },
                update = {
                    "$set":{
                        'role_arr.$.emp_status': 'Active'
                    }
                }
                myDatabase.collection('user_role_home_mapping').updateOne(query, update, function (err, result) {
                    if (err) {
                        return retFunc({ "success": false, result: err })
                    }

                    else {
                        console.log('Updated employment status to Active for UserId : ', userId,
                            ' and HomeId :', homeId, ' and RoleId : ',roleId);
                        return retFunc({ "success": true, result: result })
                    }
                })

            }
            //mongoClient.close()
        })
    },

    getStaffCourseRoleCheckList(userId,homeId,retFunc){
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                myDatabase.collection('user_role_home_mapping').find({ "user_id": String(userId),"home_id":String(homeId)}).toArray(function (err, result) {
                    if (err) {
                        return retFunc({"success":false,result:err})
                    }

                    else {
                        var roleArray = []
                        var len;
                        if(result[0] && result[0].role_arr)
                        len = result[0].role_arr.length
                        else
                        len = 0
                        for(var i=0;i<len;i++){
                            roleArray.push(result[0].role_arr[i].role_id)
                        }
                       // console.log("roleArray",len)
                        myDatabase.collection('home_crs_role').find({ "role_id": { $in: roleArray}, "home_id":homeId }).toArray(function (err, newresult) {
                            if (err) {
                                return retFunc({"success":false,result:err})
                            }
        
                            else {
                                myDatabase.collection('user_crs_mapping').find({ "user_id": String(userId)}).toArray(function (err, _result) {
                                    if (err) {
                                        return retFunc({"success":false,result:err})
                                    }
                    
                                    else {
                                       var map = new Map()
                                       for(var i=0;i<_result.length;i++){
                                        map.set(_result[i].course_id,"course")
                                       }
                                       for(var i=0;i<newresult.length;i++){
                                           var flag = 0
                                           for(var j=0;j<newresult[i].course_details.length;j++){
                                               if(map.get(newresult[i].course_details[j].id)!=undefined){
                                                newresult[i].course_details[j]['isComp'] = true
                                               }
                                               else{
                                                newresult[i].course_details[j]['isComp'] = false    
                                                flag=1
                                               }
                                           }
                                           if(flag==0)
                                           newresult[i]['course_status'] = "Completed";
                                           else
                                           newresult[i]['course_status'] = "Pending";
                                       }
                                       return retFunc({"success":true,result:newresult})
                                       
                                    }
                                })
                            }
                        })
                    }
                })

            }
            //mongoClient.close()
        })
    },
    userCompletedCourses(userId,retFunc){

    mongoClient.connect(db_url, function (err, dbServer) {
        if (err) throw err;
        else {
            var myDatabase = dbServer.db(db_name);
            myDatabase.collection('user_crs_mapping').find({ "user_id": String(userId)}).toArray(function (err, result) {
                if (err) {
                    return retFunc({"success":false,result:err})
                }

                else {
                    return retFunc({"success":true,result:result})
                }
            })

        }
        //mongoClient.close()
    })
},
setArchiveStatus(statusObj,retFunc){
    mongoClient.connect(db_url, function (err, dbServer) {
        if (err) throw err;
        else {
            var myDatabase = dbServer.db(db_name);
            myDatabase.collection('user_role_home_mapping').find({ "user_id": String(statusObj.user_id), "home_id": String(statusObj.home_id) }).toArray(function (err, result) {
                if (err) {
                    return retFunc({"success":false,result:err})
                }

                else {
                    var newRoleArray = result[0].role_arr
                    console.log(newRoleArray)
                    newRoleArray[statusObj.id].emp_status = "Archived"
                    var query = { "user_id": String(statusObj.user_id), "home_id": String(statusObj.home_id) }
                    update = {
                        "$set": {
                            "role_arr": newRoleArray
                        }
                    }
                    //console.log("hidjndj")
                    myDatabase.collection('user_role_home_mapping').updateOne(query, update, function (err, newresult) {
                        if (err) {
                            return retFunc({ "success": false, result: err })
                        }
            
                        else {
                            console.log(newresult)
                            return retFunc({ "success": true, result: newresult })
                        }
                    })                }
            })
            
    
        }
        //mongoClient.close()
    })
    }
}



