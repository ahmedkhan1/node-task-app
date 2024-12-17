// Imports
require('dotenv').config(); // Load environment variables from .env file
const express = require("express"); // Express framework for Node.js
const bodyParser = require("body-parser"); // Body parsing middleware
const db = require("./src/models"); // Sequelize ORM for accessing databases
const fs = require("fs"); // File system module
const cors = require("cors"); // Cross Origin Resource Sharing middleware
const routes = require('./src/routes/v1'); // Route directory
const app = express(); // Create an instance of the Express module
const swaggerUi = require('swagger-ui-express');
const swaggerUser = require("./swaggerUser");
const swaggerAdmin = require("./swaggerAdmin");


// CORS options 
var corsOptions = {
  origin: "*", // Only allow requests from this origin
};

app.use(cors(corsOptions)); // Use CORS middleware
app.use(bodyParser.json({limit: '50mb'})); // Add body-parsing middleware
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); // Add body-parsing middleware
app.use((req, res, next) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next(); // Pass control to the next middleware
});

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.path}`); //Log request details
  next(); // Pass control to the next middleware
});

// v1 api routes
app.use('/', routes); // Use the routes directory
app.use('/api/docs/admin', swaggerUi.serve, swaggerUi.setup(swaggerAdmin));
app.use('/api/docs/user', swaggerUi.serve, swaggerUi.setup(swaggerUser));


// error handler
app.use(function(err, req, res, next){
  res.status(400).json(err); // Send error response code
});

const PORT = 8080; // Server port number
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`); //Log successful server start
});