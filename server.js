const express = require('express');
const app = express();

app.get("/", (req, res) => {
    console.log("sending data")
    res.json({ "user": { "role": "dummy user", "name": "test" } });
});

app.listen(5000, function () {
    console.log("lcpt_back_end server at : 5000");
});