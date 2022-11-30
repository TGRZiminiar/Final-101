import mongoose from "mongoose";
import { SearchStore } from "../Interface/store.interface";
import StoreModel from "../Models/store.model"

export const handleOnlyName = async(name:string):Promise<SearchStore[]> => {

    const result:SearchStore[] = await StoreModel.find({
        "storeName":{$regex:`${String(name)}`, '$options' : 'i'}
    })
    .select("imageHeader storeName ratingSum ratingCount commentCount")
    .populate({
        path:"category",
        select:"name _id"
    })
    .lean();
    
    return result;
}

export const handleOnlyLocation = async(location:string):Promise<SearchStore[]> => {
    const result:SearchStore[] = await StoreModel.find({
        "location.textlocation":{$regex:`${String(location)}`, '$options' : 'i'}
    })
    .select("imageHeader storeName ratingSum ratingCount commentCount")
    .populate({
        path:"category",
        select:"name _id"
    })
    .lean();

    return result;
}

export const handleNameAndLocation = async(name:string, location:string):Promise<SearchStore[]> => {
    const result:SearchStore[] = await StoreModel.find({
        "storeName":{$regex:`${String(name)}`}, 
        "location.textlocation":{$regex:`${String(location)}`, '$options' : 'i'}
    })
    .select("imageHeader storeName ratingSum ratingCount commentCount")
    .populate({
        path:"category",
        select:"name _id"
    })
    .lean();

    return result;
}

export const handleCategory = async(categoryId:string):Promise<SearchStore[]> => {
    const result:SearchStore[] = await StoreModel.find({
        "category":{$eq:new mongoose.Types.ObjectId(`${categoryId}`)}
    })
    .select("imageHeader storeName ratingSum ratingCount commentCount")
    .populate({
        path:"category",
        select:"name _id"
    })
    .lean();

    return result;
}

type Popular = "rating" | "comment";

export const handlePopular = async(popular:Popular):Promise<SearchStore[]> => {
    let result:SearchStore[] = [];
    if(popular === "rating"){
        result = await StoreModel.find({})
        .sort({"ratingCount":-1})
        .select("imageHeader storeName ratingSum ratingCount commentCount")
        .populate({
            path:"category",
            select:"name _id"
        })
        .lean()
    }
    else if(popular === "comment"){
        result = await StoreModel.find({})
        .sort({"commentCount":-1})
        .select("imageHeader storeName ratingSum ratingCount commentCount")
        .populate({
            path:"category",
            select:"name _id"
        })
        .lean()
    }
    return result;
}

export const RemoveDuplication = (mergeData:SearchStore[]):SearchStore[] => {

    let size:number = mergeData.length;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if(i === j) continue;
            else if(String(mergeData[i]._id) === String(mergeData[j]._id)) {
                mergeData.splice(j,1);
                size--
            }   
        }
    }
    return mergeData;
}
