var User = require('../Model/userModelSchema');

exports.getAllUsers = async function (query) {
    try {
        console.log("GetAllUsers > "+query);
        var users = await User.find(query)
        console.log(users);
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}

exports.getUser = async function (id) {
    try {
        //console.log("GetUsers > "+ id);
        var users = await User.find({userId: id});
        //console.log(users);
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
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
        throw Error('Error while Paginating Users')
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
        const doc = await User.find({}).sort({userId:-1}).limit(1);
        const newUser = new User(user);
        var id = doc[0].userId+1;
        newUser.userId = id;
        let saveUser = await newUser.save();
        return saveUser;
    } catch (e) {
        console.log('Error while saving user.')
        throw e;
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
        postalCode: user.postalCode
    };
    
    //  const doc = await User.findById(id);
    //console.log(doc.fullName);
    const filter = { userId: id };
    let doc2 = await User.findOneAndUpdate(filter, userObj, {
        new: true,
        upsert: true // Make this update into an upsert
    });
    return doc2;
 } catch (e) {
     console.log('Error while saving user.')
     throw e;
 }
};