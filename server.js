const express = require('express');
const loginRouter = require('./Routes/loginRouter');
const app = express();


app.use("/", loginRouter);

app.listen(5000, function () {
    console.log("lcpt_back_end server at : 5000");
});