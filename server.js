const express = require('express');
const landingRouter = require('./Routes/landingRouter');
const cors = require('cors');
var bodyParser = require('body-parser')
const organisationRouter = require('./Routes/orgnizationRouter')


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



//server
app.listen(5000, function () {
    console.log("lcpt_back_end server at : 5000");
});