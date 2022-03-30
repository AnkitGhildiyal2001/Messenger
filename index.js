const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));// --> nessasary code to start parsing through the body of the post request.
app.use(express.static("public"));  // public is the name of the folder which we will keep as a static folder
