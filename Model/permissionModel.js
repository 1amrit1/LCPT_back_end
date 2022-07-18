const MongoClient = require('mongodb').MongoClient;
const db_name = "LCPT";
//const url = "mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const url = require('../Url-config').MONGO_URL;
const client = new MongoClient(url);





module.exports.add_1_permission = async (userId, permissionType, permissionOfId) => {
    var res;
    console.log("in add a permission");
    await client.connect();

    //first get the permissions array. add the value in that object and update the db

    res = await client.db(db_name).collection("login").findOne({ "user_id": userId });

    console.log(res);
    var typeArrNew = res.typeArr;
    // hardcoded the pending-------------------------------------------
    var newObj = { "permission_type": permissionType, "permission_of_id": permissionOfId, "status": "pending" };

    typeArrNew.push(newObj);

    var updObj = {
        $set: { "typeArr": typeArrNew }
    }

    res = await client.db(db_name).collection("login").updateOne({ "user_id": userId }, updObj);
    console.log(res);
    client.close();
    return res;
}


module.exports.update_1_permission = async (userId, permissionType, permissionOfId, status) => {
    var res;
    console.log("in add a permission");
    await client.connect();

    //first get the permissions array. add the value in that object and update the db

    res = await client.db(db_name).collection("login").findOne({ "user_id": userId });

    console.log(res);
    var typeArrNew = res.typeArr;
    // hardcoded the pending-------------------------------------------
    var UpdatedObj = { "permission_type": permissionType, "permission_of_id": permissionOfId, "status": status };

    for (let i = 0; i < typeArrNew.length; i++) {
        if (typeArrNew[i].permission_type == permissionType && typeArrNew[i].permission_of_id == permissionOfId) {
            typeArrNew[i].status = status;
        }
    }


    var updObj = {
        $set: { "typeArr": typeArrNew }
    }

    res = await client.db(db_name).collection("login").updateOne({ "user_id": userId }, updObj);
    console.log(res);
    client.close();
    return res;
}
