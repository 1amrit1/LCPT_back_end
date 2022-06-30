"use strict";
const nodemailer = require("nodemailer");
const serverUrl = require('../Url-config').SERVER_URL;

// async..await is not allowed in global scope, must use a wrapper
module.exports = {
  main: function(addStaffObj) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = nodemailer.createTestAccount();

  const output = `
    <p>You have a been assigned to new role</p>
    <h3>Employment Details</h3>
    <ul>  
      <li>Name: ${addStaffObj.user_name}</li>
      <li>ID: ${addStaffObj.user_id}</li>
      <li>Home ID: ${addStaffObj.home_id}</li>
      <li>Roles: ${addStaffObj.role_name}</li>
    </ul>
    <h3>Please confirm your details by clicking on below URL</h3>
    <p><a href= "${serverUrl}orgnization/emailVerification/${addStaffObj.user_id}/${addStaffObj.home_id}">Confirm</a></p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    //service:'gmail',
    auth: {
      user: 'sergevasco10@gmail.com', // generated ethereal user
      pass: 'hxqwghfjttjjxexg', //  generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: 'sergevasco10@gmail.com', // sender address
    to: "sandy.vascotto@lambtoncollege.ca, sergevasco10@gmail.com", // list of receivers
    subject: "LCPT Webportal | Confirm Details ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  });
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  

  //main().catch(console.error);

}

// verify connection configuration

};