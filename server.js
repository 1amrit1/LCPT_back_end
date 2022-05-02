const express = require('express');
const landingRouter = require('./Routes/landingRouter');
const cors = require('cors');
var bodyParser = require('body-parser')
const organisationRouter = require('./Routes/orgnizationRouter');
const courseRouter = require('./Routes/courseRouter');
const userRouter = require('./Routes/userRouter');
const auditReportRouter = require('./Routes/auditReportRouter');

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://hanishdb:Hanish8013@cluster0.381hf.mongodb.net/LCPT?retryWrites=true&w=majority');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Connect to MongoDb");
});

const app = express();

//json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));


//cross origin (cors)
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));


//routers
app.use("/", landingRouter);
app.use("/orgnization/", organisationRouter);
app.use("/course/", courseRouter)
app.use("/user/", userRouter)
app.use("/audit-report/", auditReportRouter)


//server
app.listen(5000, function () {
    console.log("lcpt_back_end server at : 5000");
});