import mongoose from "mongoose";



const imageSchema = new mongoose.Schema({
    filename : {
        type : String,
        unique : true,
        required: true
    },
    contentType : {
        type: String,
        required : true
    },
    imageBase64 : {
        type : String,
        required: true
    }

},{timestamps:true});

const ImageModel = mongoose.model("Image",imageSchema);

export default ImageModel;