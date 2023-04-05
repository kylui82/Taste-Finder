//The reason of having Schema is to validates and feetch data

let mongoose = require("mongoose");

let foodSchema = mongoose.Schema({
    food_name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    reviews: [{
        restaurant_name:{
            type: String,
            required: true
        },
        restaurant_address:{
            type: String,
            required: true
        },
        rating:{
            type: Number,
            required: true
        },
        description:{
            type: String,
            required: true
        }
    }]
});


let Food = module.exports = mongoose.model("Food", foodSchema);