//The reason of having Schema is to validates and feetch data

let mongoose = require("mongoose");

let foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    reviews: {
        type: [String]
    }
});


let Food = module.exports = mongoose.model("Food", foodSchema);