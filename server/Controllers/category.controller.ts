import CategoryModel from "../Models/category.model";
import { Request,Response } from "express";

export const CreateCategory = async(req:Request,res:Response) => {

    try{

        const {category} = req.body;
        const result = await new CategoryModel({name:category}).save();
        return res.status(201).json({"category":result});

    }catch(error){
        console.log("CREATE CATEGORY ERROR=>",error);
        return res.status(400).send("CREATE CATEGORY FAILED");
    }
    
}

export const UpdateCategory = async(req:Request, res:Response) => {
    try {
        
        const {categoryId, newCategory} = req.body;
        await CategoryModel.findByIdAndUpdate({_id:categoryId},{
            name:newCategory
        },{
            new:true,
        }).exec();
        
        return res.status(200).send("Update Category SuccessFul");

    } catch (error) {
        console.log("UPDATE CATEGORY ERROR=>",error);
        return res.status(400).send("UPDATE CATEGORY FAILED");
    }
}

export const ListAllCategory = async(req:Request, res:Response) => {
    try {
        
        const category = await CategoryModel.find({})
        .sort({"updatedAt":-1})
        .select("name _id")
        .lean();

        return res.status(200).json({"category":category});

    } catch (error) {
        console.log("LIST CATEGORY ERROR=>",error);
        return res.status(400).send("LIST CATEGORY FAILED");
        
    }
}

export const DeleteCategory = async(req:Request, res:Response) => {
    try {
        
        const { categoryid } = req.headers;
        console.log(categoryid)
        await CategoryModel.findByIdAndRemove({_id:categoryid}).exec();

        return res.status(200).send("Remove Category Successful");

    } catch (error) {
        console.log("DELETE CATEGORY ERROR=>",error);
        return res.status(400).send("DELETE CATEGORY FAILED");
    }
}