const express = require('express');
const landingRouter = require('./Routes/landingRouter');
const cors = require('cors');
var bodyParser = require('body-parser')
const organisationRouter = require('./Routes/orgnizationRouter');
const courseRouter = require('./Routes/courseRouter');
const userRouter = require('./Routes/userRouter');
const auditReportRouter = require('./Routes/auditReportRouter');
const adminDataRouter = require('./Routes/adminDataRouter');
const loginRouter = require('./Routes/loginRouter')
const permissionRouter = require('./Routes/permissionRouter')
const clientUrl = require('./Url-config').CLIENT_URL;
const mongoUrl = require('./Url-config').MONGOOSE_MONGO_URL;


var mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
mongoose.connect(mongoUrl);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Connected to MongoDb");
});

const app = express();

//json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));


//cross origin (cors)
const corsOptions = {
    origin: clientUrl,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors());


//routers
app.use("/", landingRouter);
app.use("/login", loginRouter);
app.use("/orgnization/", organisationRouter);
app.use("/course/", courseRouter)
app.use("/user/", userRouter)
app.use("/audit-report/", auditReportRouter)
app.use("/admin-data/", adminDataRouter)
app.use("/permissions/", permissionRouter)


//server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});