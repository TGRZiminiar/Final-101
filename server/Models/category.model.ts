import mongoose from "mongoose";

export interface CategoryDucument extends mongoose.Document{
    name:string;
}

const categorySchema = new mongoose.Schema({
    
    name:{
        type:String,
        trim:true,
        required:true,
        min:3,
        unique:true,
        index:true,
    },

},{timestamps:true});

const CategoryModel = mongoose.model<CategoryDucument>("Category",categorySchema);

export default CategoryModel;