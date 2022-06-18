var User = require('../Model/userModelSchema');

exports.getAllUsers = async function (query) {
    try {
        console.log("GetAllUsers > "+query);
        var users = await User.find(query)
        console.log(users);
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while fetching All Users')
    }
}

exports.getUser = async function (id) {
    try {
        //console.log("GetUsers > "+ id);
        var users = await User.find({user_id: id});
        //console.log(users);
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while fetching User')
    }
};


exports.getUserValidated = async function (query) {
    try {
       // console.log("getUserValidated > "+query);
        var users = await User.find(query);
       // console.log(users);
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while Validating Users')
    }
};

exports.saveUser = async function (user) {
       /** var usersProjection = { 
            __v: false,
            _id: false,
        };       
        var userFromDb = await User.find({},"userId",usersProjection).sort({userId:-1}).limit(1);
        */
    try {
        const doc = await User.find({}).sort({user_id:-1}).limit(1);
        const newUser = new User(user);
        console.log(doc)
        if (doc.length == 0 || doc[0].user_id === undefined){
            newUser.user_id = 1000;
            console.log('Generating fresh user ID');
        }else{
            var id = parseInt(doc[0].user_id)+1;
            newUser.user_id = id;
            console.log('Generating new user ID in sequence');
        }
        newUser.type = 'employee';
        let saveUser = await newUser.save();
        return saveUser;
    } catch (e) {
        console.log('Error while saving user.')
    }
};


exports.updateUser = async function (id, user) {
 try {
    const userObj = {
        fullName: user.fullName,
        password: user.password,
        dob: user.dob,
        email: user.email,
        number: user.number,
        address: user.address,
        city: user.city,
        state: user.state,
        postalCode: user.postalCode,
        country: user.country,
        type: (user.type === undefined) ? 'employee' : user.type
    };
    
    //  const doc = await User.findById(id);
    //console.log(doc.fullName);
    const filter = { user_id: id };
    let doc2 = await User.findOneAndUpdate(filter, userObj, {
        new: true,
        upsert: true // Make this update into an upsert
    });
    return doc2;
 } catch (e) {
     console.log('Error while updating user.')
     throw e;
 }
};