const mongoClient = require('mongodb').MongoClient;
const db_url = "mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const db_name = "LCPT";
module.exports = {

    getAllRolesByHomeId(id, retFunc) {
        mongoClient.connect(db_url, function (err, dbServer) {
            if (err) throw err;
            else {
                var myDatabase = dbServer.db(db_name);
                myDatabase.collection('role').find({ 'home_id': id }).toArray(function (err, result) {
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
}