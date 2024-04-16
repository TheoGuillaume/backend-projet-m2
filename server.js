require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routeAssignments  = require('./src/Assignment/Route/assignment.route');
const routeUser = require('./src/User/Route/user.route');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  
    next();
  });

app.use('/api', routeAssignments);  
app.use('/api', routeUser);  

  app.listen(process.env.PORT, () => {
    console.log(`Le serveur s'exécute sur le port ${process.env.PORT}`);
});