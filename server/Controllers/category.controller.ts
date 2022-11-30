import CategoryModel from "../Models/category.model";
import { Request,Response } from "express";
import fs from "fs";

export const CreateCategory = async(req:Request,res:Response) => {
    let rurl:string = "";
    try{
        //@ts-ignore
        const files = req.files;
        if(!files){
            return res.status(400).json("Something Went Wronge");
        }

        const {name} = req.body

        //@ts-ignore
        let imgArray = files.map((file) => {
            let img = fs.readFileSync(file.path)

            return img.toString('base64')
        })
        let url = req.protocol + '://' + req.get('host');
        let tempImageArray:{urlImage:string}[] = [];

        await Promise.all( imgArray.map((src:string, index:number) => {
            // create object to store data in the collection
            let finalImg:{urlImage:string} = {
                //@ts-ignore
                urlImage : url + "/" +files[index].path,
                //@ts-ignore
                // contentType : files[index].mimetype,
            }
            tempImageArray.push(finalImg)
        }))
        rurl = tempImageArray[0].urlImage;

        const result = await new CategoryModel({name:name,categoryImage:tempImageArray[0].urlImage}).save();
        return res.status(201).json({"category":result});

    }catch(error){

        fs.unlinkSync(`C:\\Users\\User\\Desktop\\final\\server\\uploads\\${rurl}`)

        console.log("CREATE CATEGORY ERROR=>",error);
        return res.status(400).send("CREATE CATEGORY FAILED");
    }
    
}

export const UpdateCategory = async(req:Request, res:Response) => {
    let rurl:string = "";
    try {
         //@ts-ignore
         const files = req.files;
         if(!files){
             return res.status(400).json("Something Went Wronge");
         }
 
        const {categoryId, newCategory, currentUrlImage} = req.body;


          //@ts-ignore
        let imgArray = files.map((file) => {
            let img = fs.readFileSync(file.path)

            return img.toString('base64')
        })
        let url = req.protocol + '://' + req.get('host');
        let tempImageArray:{urlImage:string}[] = [];

        await Promise.all( imgArray.map((src:string, index:number) => {
            // create object to store data in the collection
            let finalImg:{urlImage:string} = {
                //@ts-ignore
                urlImage : url + "/" +files[index].path,
                //@ts-ignore
                // contentType : files[index].mimetype,
            }
            tempImageArray.push(finalImg)
        }))
        rurl = tempImageArray[0].urlImage;
        if(currentUrlImage !== tempImageArray[0].urlImage){
            let subString = String(currentUrlImage).substring(30)
            fs.readdirSync("C:\\Users\\User\\Desktop\\final\\server\\uploads").map((r) => {
                // console.log("THIS IS SUBSTRING =>",subString)
                // console.log("THIS IS R =>",r)
                if(r === subString){
                    fs.unlinkSync(`C:\\Users\\User\\Desktop\\final\\server\\uploads\\${r}`)
                }
            })
        }


        await CategoryModel.findByIdAndUpdate({_id:categoryId},{
            name:newCategory,
            categoryImage:tempImageArray[0].urlImage
        },{
            new:true,
        }).exec();
        
        return res.status(200).send("Update Category SuccessFul");

    } catch (error) {
        fs.unlinkSync(`C:\\Users\\User\\Desktop\\final\\server\\uploads\\${rurl}`)
        console.log("UPDATE CATEGORY ERROR=>",error);
        return res.status(400).send("UPDATE CATEGORY FAILED");
    }
}

export const ListAllCategory = async(req:Request, res:Response) => {
    try {
        
        const category = await CategoryModel.find({})
        .sort({"updatedAt":-1})
        .select("name _id categoryImage")
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

export const ListAllCatogories = async(req:Request, res:Response) => {
    try {
        
        const data = await CategoryModel.find({})
        .select("name _id categoryImage")
        .lean();

        return res.status(200).json({"categories":data});

    } catch (error) {
        console.log("LIST ALL CATEGORIES ERROR=>",error);
        return res.status(400).send("DELETE CATEGORY FAILED");
    }
}

