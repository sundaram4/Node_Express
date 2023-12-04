// main entry point to our server

const express = require("express");
const dotenv = require("dotenv");
//const logger = require("./middleware/logger")

//using morgan
const morgan = require("morgan")

// Route files
const bootcamps = require('./routes/bootcamps');

//Load env vars from config file
dotenv.config({ path: "./config/config.env" });

const app = express();

//Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//app.use(logger);

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
