const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });
const Tour = require("../models/tourModel");


const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB connection successful!");
})

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/data/tours.json`, "utf-8")
);

// Import data into the database
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log("Data successfully loaded!");
        process.exit();
    } catch (err) {
        console.error(err);
    }
    process.exit();
};

// Delete all data from the database
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log("Data successfully deleted!");
        process.exit();
    } catch (err) {
        console.error(err);
    }
    process.exit();
};

if (process.argv[2] === "--import") {
    importData();
}else if (process.argv[2] === "--delete") {
    deleteData();
}