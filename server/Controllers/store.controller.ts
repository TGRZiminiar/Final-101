import {Request, Response} from "express";
import { CreateStoreInterface } from "../Interface/store.interface";
import StoreModel from "../Models/store.model";


export const CreateStore = async(req:Request, res:Response) => {
    try {
        
        const data:CreateStoreInterface = req.body;
        
        console.log(data)

        await new StoreModel({
            "storeName":data.storeName,
            "category":data.category,
            "location":data.location,
            "seatNumber":data.seatNumber,
            "timeOpen":data.timeOpen,
            "timeOpenDelivery":data.timeOpenDelivery            
        }).save();
        return res.status(200)
    } catch (error) {
        console.log(`Current Store Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}
