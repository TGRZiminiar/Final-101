import {Request, Response} from "express";
import { CreateStoreInterface } from "../Interface/store.interface";
import StoreModel from "../Models/store.model";
import fs from "fs"
import mongoose from "mongoose";

export const CreateStore = async(req:Request, res:Response) => {
    try {
        //@ts-ignore
        // const files = req.files;
        // if(!files){
        //     return res.status(400).json("Something Went Wronge");
        // }
        // console.log("THIS IS REQ FILE",req.files)
        // console.log(req.body)
        //   //@ts-ignore
        // let imgArray = files.map((file) => {
        //     let img = fs.readFileSync(file.path)

        //     return img.toString('base64')
        // })

        // let tempImageArray:ImageData[] = [];
        // await Promise.all( imgArray.map((src:string, index:number) => {

        //     // create object to store data in the collection
        //     let finalImg:ImageData = {
        //         //@ts-ignore
        //         filename : files[index].originalname,
        //         //@ts-ignore
        //         contentType : files[index].mimetype,
        //         imageBase64 : src
        //     }
        //     tempImageArray.push(finalImg);
        // }))

        const data:CreateStoreInterface = req.body;
        
        // console.log(data)

        await new StoreModel({
            "storeName":data.storeName,
            "category":data.category,
            "location":data.location,
            "seatNumber":data.seatNumber,
            "timeOpen":data.timeOpen,
            "timeOpenDelivery":data.timeOpenDelivery,
            "rangePrice":data.rangePrice,
            "checkBox":data.checkBox,
            "otherDetail":data.otherDetail,
            "contact":data.contact,
            "menuList":data.menuList,
            "branch":data.branch,
        }).save();
        return res.status(200).json({"message":"Create Store Success"});
    } catch (error) {
        console.log(`Current Store Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const GetStore = async(req:Request, res:Response) => {
    try {
      
        const data = await StoreModel.find({})
        .select("storeName category")
        .populate({
            path:"category",
            select:"name"
        })
        .sort({"createdAt":-1})
        .lean();

        return res.status(200).json({"store":data});

    } catch (error) {
        console.log(`Get Store Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const GetSingleStore = async(req:Request, res:Response) => {
    try {
        
        const {storeid} = req.headers;

        const singleStore = await StoreModel.findById({_id:storeid})
        .select("storeName imageData")
        .lean()

        return res.status(200).json({"store":singleStore});

    } catch (error) {
        console.log(`Get Store Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const UploadImageStore = async(req:Request, res:Response) => {
    try {
        
        //@ts-ignore
        const files = req.files;
        //@ts-ignore
        console.log("THIS IS REQ FILE",req.files)
        if(!files){
            return res.status(400).json("Something Went Wronge");
        }

        const {storeid} = req.headers;

        //@ts-ignore
        let imgArray = files.map((file) => {
            let img = fs.readFileSync(file.path)

            return img.toString('base64')
        })

        let tempImageArray:ImageData[] = [];
        await Promise.all( imgArray.map((src:string, index:number) => {

            // create object to store data in the collection
            let finalImg:ImageData = {
                //@ts-ignore
                filename : files[index].originalname,
                //@ts-ignore
                contentType : files[index].mimetype,
                imageBase64 : src
            }
            tempImageArray.push(finalImg)
        }))
        
        await StoreModel.updateOne(

            {_id:new mongoose.Types.ObjectId(`${storeid}`)},
            {$push:{"imageData":{$each:tempImageArray}}},
            
            )

        return res.status(200).json({"messaage":"success"})

    } catch (error) {
        console.log(`Upload Image Store Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const DeleteImageStore = async(req:Request, res:Response) => {
    try {
        const {storeId,arrImgId, arrImgFileName} = req.body;        

        await StoreModel.updateOne(
            {
                _id:new mongoose.Types.ObjectId(`${storeId}`),
                // $elemMatch:{"imageData":{$each:{"_id":arrImgId}}}
            },{
                $pull:{"imageData":{"_id":{"$in":arrImgId}}}
            }
        )
        
        // for (let i = 0; i < arrImgFileName.length; i++) {
            
        //     fs.unlinkSync(`../uploads/${arrImgFileName[i]}`)
        // }

        for (let i = 0; i < arrImgFileName.length; i++) {
            fs.readdirSync("C:\\Users\\User\\Desktop\\final\\server\\uploads").map((r) => {
                if(r.includes(arrImgFileName[i])){
                    fs.unlinkSync(`C:\\Users\\User\\Desktop\\final\\server\\uploads\\${r}`)
                }
            })

        }

        // fs.readdirSync('./routes').map((r)=>app.use(("/api"),require(`./routes/${r}`)))
        return res.status(200).json({"message":"Remove Image Success"})
    } catch (error) {
        console.log(`Delete Upload Image Store Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
    
}

export const DeleteStore = async(req:Request, res:Response) => {
    try {
        
        const {storeid} = req.headers;
        await StoreModel.findByIdAndDelete({
            _id:new mongoose.Types.ObjectId(`${storeid}`)
        })
        .exec();

        return res.status(200).json({"messaage":"Delete Store Success"});


    } catch (error) {
        console.log(`Delete Store Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const GetStoreDetailUpdate = async(req:Request, res:Response) => {
    try {
        
        const {storeid} = req.headers;
        const data = await StoreModel.findById({_id:new mongoose.Types.ObjectId(`${storeid}`)})
        .select("storeName location seatNumber timeOpen timeOpenDelivery rangePrice checkBox otherDetail contact menuList branch category")
        .lean()
        
        return res.status(200).json({"store":data})

    } catch (error) {
        console.log(`Get Store Detail Update Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
        
    }
}