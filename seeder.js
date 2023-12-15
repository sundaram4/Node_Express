const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

//Load Env vars
dotenv.config({ path: "./config/config.env" });

//Load models
const Bootcamp = require("./models/Bootcamp");

//connect to DB
mongoose.connect(process.env.MONGO_URI);

//Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

//import into DB
const importData = async () => {
    try{
        await Bootcamp.create(bootcamps);
        console.log('Data Imported...'.green.inverse);
    }catch(err){
        console.log(err);
    }
};
const deleteData = async () => {
    try{
        await Bootcamp.deleteMany();
        console.log('Data Destroyed'.red.inverse);
    }catch(err){
        console.log(err);
    }
};

if(process.argv[2] === '-i'){
    importData();
}
else if(process.argv[2] === '-d'){
    deleteData();
}
