const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));// --> nessasary code to start parsing through the body of the post request.
app.use(express.static("public"));  // public is the name of the folder which we will keep as a static folder

app.listen(process.env.PORT || 3000,function(){  // --> app will work both on local system and heroku servers
  console.log("Server is running on port 3000");
});

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
