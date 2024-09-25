const mongoose = require("mongoose")
const uuidv4=require('uuid').v4;


const ImageSchema = new mongoose.Schema({

    
    image: String,
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Image = mongoose.model("Images",ImageSchema)

module.exports = Image