// main entry point to our server

const express = require("express");
const dotenv = require("dotenv");

//Load env vars from config file
dotenv.config({ path: "./config/config.env" });

const app = express();

app.get("/api/v1/bootcamps", (req, res) => {
  //console.log(res)
  // res.send('<h1>Hello World</h1>');
  //res.json({name:'Brad'});
  //send only status 200, 400, 300
  //res.sendStatus(400);
  //res.status(400).json({success:false});
  //successful response
  res
    .status(200)
    .json({ success: true, data: { id: 1, msg: "show all bootcamps" } });
});
app.get("/api/v1/bootcamps:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `show bootcamp ${req.params.id}` });
});
app.post("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, msg: `Create new bootcamp` });
});
app.put("/api/v1/bootcamps:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
});
app.delete("/api/v1/bootcamps:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
