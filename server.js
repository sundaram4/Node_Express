// main entry point to our server

const express = require('express');
const dotenv = require('dotenv');

//Load env vars from config file
dotenv.config({path:'./config/config.env'});

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

