const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const store = require(__dirname+"/functionality.js");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
})); // --> nessasary code to start parsing through the body of the post request.
app.use(express.static("public")); // public is the name of the folder which we will keep as a static folder

app.listen(process.env.PORT || 3000, function() { // --> app will work both on local system and heroku servers
  console.log("Server is running on port 3000");
});

var itemsStore = [
  ["test name", "test description", 32],
  ["test name", "test description", 52],
  ["test name", "test description", 302],
  ["test name", "test description", 78]
];

var items = [];

function getItem(name, description, mrp) {
  this.name = name;
  this.quantity = 0;
  this.description = description;
  this.mrp = mrp;
}

for(var i=0;i<itemsStore.length;i++){
  items.push(new getItem(itemsStore[i][0],itemsStore[i][1],itemsStore[i][2]));
}

app.get("/",function(req,res){
  res.render('index',{
    storeItems: items
  });
});
