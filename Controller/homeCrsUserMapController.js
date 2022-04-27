

module.exports.add_uch_map = function (req, res) {
    console.log("---------------====================== addCourseFn");
    console.log(req.body.courseFormDetails);

    // check if it has correct USER_ID, ROLE_ID & HOME_ID
    // if all are correct only then insert.
    // var USER_ID = get id 
    // var ROLE_ID = get id 
    // var HOME_ID = get id 

    insert_1_course(req.body.courseFormDetails)
    res.send({ msg: "success" })


}