const express = require('express');
const loginRouter = require('./Routes/loginRouter');
const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));
const organisationRoutes = require('./Controller/organisationController');

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use("/", loginRouter);
app.use("/",organisationRoutes);

app.listen(5000, function () {
    console.log("lcpt_back_end server at : 5000");
});