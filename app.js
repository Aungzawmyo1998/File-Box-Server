const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const userRoute = require("./route/user");
const fileRoute = require("./route/file");
const authorization = require("./middleware/auth")

//For User
app.use('/user', userRoute);

//For File
app.use('/file', authorization, fileRoute );

app.listen(8282, ()=> {
    console.log("FileBox server is running on 8282");
})