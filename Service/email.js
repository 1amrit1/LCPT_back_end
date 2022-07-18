"use strict";
const nodemailer = require("nodemailer");
const serverUrl = require('../Url-config').SERVER_URL;

// async..await is not allowed in global scope, must use a wrapper
//
exports.sendMail = function (addStaffObj) {

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = nodemailer.createTestAccount();
  console.log(addStaffObj);
  const output = `
    <p>You have a been assigned to new role</p>
    <h3>Employment Details</h3>
    <ul>  
      <li>Name: ${addStaffObj.user_name}</li>
      <li>ID: ${addStaffObj.user_id}</li>
      <li>Home ID: ${addStaffObj.home_id}</li>
      <li>Role: ${addStaffObj.role_name}</li>
      <li>Role ID: ${addStaffObj.role_id}</li>
    </ul>
    <h3>Please confirm your details by clicking on below URL</h3>
    <p><a href= "${serverUrl}orgnization/emailVerification/${addStaffObj.user_id}/${addStaffObj.home_id}/${addStaffObj.role_id}">Confirm</a></p>
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
    tls: {
      rejectUnauthorized: false
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

exports.sendAuditReport = function (addStaffObj, attachment) {
  console.log("Inside user audit email method ");
  const output = `
    <p>Hi, Please find attached User audit report generated from LCPT Webportal</p>
    <h3>Employment Details</h3>
    <ul>  
      <li>User ID: ${addStaffObj.user_id}</li>
    </ul>
    <h3>Please find attached document.</h3>
    <br>
    <h4>Regards,</h4>
    <h4>The LCPT Team</h4>
    `;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'sergevasco10@gmail.com', // generated ethereal user
      pass: 'hxqwghfjttjjxexg', //  generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: 'sergevasco10@gmail.com', // sender address
    to: addStaffObj.emailId, // list of receivers
    subject: "LCPT Webportal | User Audit Report ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
    attachments: [{
      filename: "UserAuditReport_" + addStaffObj.user_id + ".pdf",
      contentType: attachment.mimetype, // <- You also can specify type of the document
      content: attachment.buffer // <- Here comes the buffer of generated pdf file
    }]
  });
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

};




exports.sendMailForNewAdmin = function (addPermissionObj) {

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = nodemailer.createTestAccount();
  var idForPermission = "";
  if (addPermissionObj.permission_type == "organization") {
    idForPermission = "Id of Organization: " + addPermissionObj.permission_of_id;

  } else if (addPermissionObj.permission_type == "home") {
    idForPermission = "Id of Home: " + addPermissionObj.permission_of_id;

  }


  console.log(addPermissionObj);
  const output = `
    <p>You have a been assigned to new admin view permission.</p>
    <h3>Permission Details</h3>
    <ul>  
      <li>Name: ${addPermissionObj.user_name}</li>
      <li>ID: ${addPermissionObj.user_id}</li>
      <li>Permission type : ${addPermissionObj.permission_type}</li>
      <li> ${idForPermission} <li>


    </ul>
    <h3>Please Accept the permission by clicking on below URL</h3>
    <p><a href= "${serverUrl}permissions/verifyNewAdmin/${addPermissionObj.user_id}/${addPermissionObj.permission_type}/${addPermissionObj.permission_of_id}">Confirm</a></p>
  `;

  ///verifyNewAdmin/:userId/:permissionType/:permissionId

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
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: 'sergevasco10@gmail.com', // sender address
    to: addPermissionObj.email, // list of receivers
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