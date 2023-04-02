// this is a javascript file
const express = require("express");
const app = express();
// this is a javascript file
const mongoose = require("mongoose");
const Food = require("./modules/food");

// implement dot env to read env variables
require("dotenv").config();

// connect mongodb with mongoose
mongoose
 .connect("mongodb://127.0.0.1/tastefinder", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 })
 .then(() => {
   console.log("Connected to MongoDB");
 })
 .catch((err) => console.log(err));


// listen on port 3000
app.listen(3000, () => {
 console.log("Server is listening on port 3000");
});