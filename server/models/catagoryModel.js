const mongoose = require('mongoose');

const catagorySchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }

},{
    timestamps:true
})

module.exports = mongoose.model("Catagory",catagorySchema);