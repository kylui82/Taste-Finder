// this is a javascript file
const express = require("express");
const app = express();
// this is a javascript file
const mongoose = require("mongoose");
const Food = require("./modules/food");
const cors = require("cors");

// implement dot env to read env variables
require("dotenv").config();

app.use(cors());
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

 app.use("/", async function (req, res) {
  let foods = await Food.find({});
    if (!foods) {
      res.send("No food found")
    } else {
      res.send(foods);
}});


// listen on port 8000
app.listen(8000, () => {
 console.log("Server is listening on port 8000");
});

