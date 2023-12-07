const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'styles')));

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;


// simple route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/app/views/login.html'));
});

app.get("/registro",(req,res) => {
  res.sendFile(path.join(__dirname, "/app/views/register.html"));
});


require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


/*db.sequelize.sync({force: true}).then(() => {
  console.log("drop and resync database with { force:true}");
  initial();
});*/