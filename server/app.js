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
 .connect("mongodb+srv://ckurihara25:Abcd2155@cluster1.fqwupbi.mongodb.net/?retryWrites=true&w=majority", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 })
 .then(() => {
   console.log("Connected to MongoDB");
 })
 .catch((err) => console.log(err));

let food_array = module.exports = async function(){
  const food = await Food.find({});
 }

// listen on port 3000
app.listen(3000, () => {
 console.log("Server is listening on port 3000");
});

