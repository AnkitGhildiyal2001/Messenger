const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const store = require(__dirname + "/functionality.js");
const app = express();
const axios = require('axios');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
})); // --> nessasary code to start parsing through the body of the post request.
app.use(express.static("public")); // public is the name of the folder which we will keep as a static folder

app.listen(process.env.PORT || 3000, function() { // --> app will work both on local system and heroku servers
  console.log("Server is running on port 3000");
});

var itemsStore = [];

// var itemsStore = [
//   ["test name", "test description", 32.72],
//   ["test name", "test description", 52.03],
//   ["test name", "test description", 302.56],
//   ["test name", "test description", 78.00]
// ];

// request

var items = [];
var address = {};

function getpdate() {
  axios
    .post('https://anonympy.service-now.com/api/snc/alexis_pharmacy/update', {

    })
    .then(res => {
      console.log(`statusCode: ${res.status}`);
      itemsStore = res.data.results;
      //console.log(itemsStore);
      for (var i = 0; i < itemsStore.length; i++) {
        items.push(new getItem(itemsStore[i].name, itemsStore[i].description, Number(itemsStore[i].mrp)));
      }
      //console.log(items);
    })
    .catch(error => {
      console.error(error);
    });
}





var total = 0;

function getItem(name, description, mrp) {
  this.name = name;
  this.quantity = 0;
  this.description = description;
  this.mrp = mrp;
}


getpdate();


app.get("/", function(req, res) {

  res.render('index', {
    storeItems: items,
    total: (Math.round(total * 100)) / 100
  });
});

app.post("/", function(req, res) {
  var body = req.body;

  console.log(body);

  if ('inc' in body) {
    inc(Number(body.inc));
  }

  if ('dec' in body) {
    dec(Number(body.dec));
  }

  if ('address' in body) {
    res.redirect("/address");
  }

  res.redirect("/");
});




app.get("/address", function(req, res) {

  res.render("address", {
    items: items,
    total: (Math.round(total * 100)) / 100,
    num: getN()
  });

});


app.post("/address", function(req, res) {
  var body = req.body;

  console.log(body);

  res.redirect("/");
});



function inc(i) {
  if (items[i].quantity < 5 && items[i].quantity < itemsStore[i].quantity) {
    items[i].quantity++;
    total += items[i].mrp;
  }
}

function dec(i) {
  if (items[i].quantity > 0) {
    items[i].quantity--;
    total -= items[i].mrp;
  }
}

function getN() {
  var n = 0;
  for (var i = 0; i < items.length; i++) {
    if (items[i].quantity > 0) {
      n++;
    }
  }
  return n;
}
