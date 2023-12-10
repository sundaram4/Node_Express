// main entry point to our server

const express = require("express");
const dotenv = require("dotenv");
//const logger = require("./middleware/logger")
const connectDB = require('./config/db')
const colors = require('colors')
const errorHandler = require('./middleware/error')

//using morgan
const morgan = require("morgan")

// Route files
const bootcamps = require('./routes/bootcamps');

//Load env vars from config file
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();

//Body Parser
app.use(express.json())

//Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//app.use(logger);

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);

//can use only after mounting routers
// errorhandler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

//handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server and exit process
  server.close(() => process.exit(1));
});
