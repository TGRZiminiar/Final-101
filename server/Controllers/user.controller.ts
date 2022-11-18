import { Request,Response } from "express";
import UserModel, { UserDocument } from "../Models/user.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserSignJWT } from "../Interface/user.interface";
import { signJwt } from "../utils/jwt.utils";
import multer from "multer"
import ImageModel from "../Models/Image.model";
import fs, { rmSync } from "fs"
import { ImageUrl } from "../Interface/store.interface";
import StoreModel from "../Models/store.model";
import mongoose from "mongoose";

export const RegisterUser = async(req:Request, res:Response) => {
    try {
        
        const { userName, email, password } = req.body;

        const checkUserExist = await UserModel.findOne({email:email})
        .select("email")
        .lean();

        if(!checkUserExist){
            const passwordHash:string = bcrypt.hashSync(password,10);

            const user:UserDocument = await new UserModel({
                userName:userName,
                email:email,
                password:passwordHash,
            }).save();

            const userObj:UserSignJWT = {userName:user.userName, userId:user._id};
            const accessToken:string = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET as string,{expiresIn:"3d"});

            return res.status(200).json({"message":"Register Succesful","token":accessToken});

        } else return res.status(403).json("UserName Or Email Is Already Exist");


    } catch (error) {
        console.log(`Register User Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}


export const LoginUser = async(req:Request, res:Response) => {
    try {

        const { email, password } = req.body;
        const checkUserExist:UserDocument = await UserModel.findOne({email:email})
        .select("email userName password")
        .lean();

        if(checkUserExist){
            const checkPassword:Boolean = bcrypt.compareSync(password,checkUserExist.password);

            if(checkPassword){
                const userObj:UserSignJWT = {userName:checkUserExist.userName, userId:checkUserExist._id};

                const accessToken:string = signJwt(userObj,{expiresIn:"3d"});
                
                
                //req.get("user-agent")
                // const accessToken:string = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET as string,{expiresIn:"3d"});
                return res.status(200).json({"message":"Login Succesful","token":accessToken});
            }
        
            else {
                return res.status(400).json("Try Again Please");
            }
        }
        else {
            return res.status(400).json("User With This Email Is Not Exist");
        }


    } catch (error) {
        console.log(`Login User Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}


export const CurrentUser = async(req:Request, res:Response) => {
    try {
        //@ts-ignore
        const { userId } = req.user!;
        
        const getUser = await UserModel.findById({_id:userId})
        .select('userImage gender role userName email')
        .lean();

        return res.status(200).json({"user":getUser});

    } catch (error) {
        console.log(`Current User Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const UpLoadImageCon = async(req:Request, res:Response) => {
    try {

        const files = req.files;
        console.log(req.files)
        if(!files){
            return res.status(400).json("Something Went Wronge");
        }
        // convert images into base64 encoding
        //@ts-ignore
        let imgArray = files.map((file) => {
            let img = fs.readFileSync(file.path)

            return img.toString('base64')
        })

        await Promise.all( imgArray.map((src:string, index:number) => {

            // create object to store data in the collection
            let finalImg = {
                //@ts-ignore
                filename : files[index].originalname,
                //@ts-ignore
                contentType : files[index].mimetype,
                imageBase64 : src
            }
            let newUpload = new ImageModel(finalImg).save()
        }))

        return res.status(200).json("SUCCESS")

    } catch (error) {
        console.log(`Current User Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const ListAllImage = async(req:Request, res:Response) => {
    try {
        
        const img = await ImageModel.find({}).lean();

        return res.status(200).json({"img":img})

    } catch (error) {
        console.log(`Current User Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const UpdateUser = async(req:Request, res:Response) => {
    try {
        
        //@ts-ignore
        const files = req.files;
        //@ts-ignore
        if(!files){
             return res.status(400).json("Something Went Wronge");
        }

        //@ts-ignore
        const {userId} = req.user;

        const {username, email, gender, currenturl} = req.headers;
        
        if(gender === "male" || gender === "female" || gender === "lgbtq+" || gender === "unknow") {
            //@ts-ignore
            let imgArray = files.map((file) => {
                let img = fs.readFileSync(file.path)

                return img.toString('base64')
            })
    
            let url = req.protocol + '://' + req.get('host');
            let tempImageArray:ImageUrl[] = [];
            
            await Promise.all( imgArray.map((src:string, index:number) => {
    
                // create object to store data in the collection
                let finalImg:ImageUrl = {
                    //@ts-ignore
                    urlImage : url + "/" +files[index].path,
                    //@ts-ignore
                    contentType : files[index].mimetype,
                }
                tempImageArray.push(finalImg)
            }))

            if(currenturl !== tempImageArray[0].urlImage){
                const subString = String(currenturl).substring(30)
                fs.readdirSync("C:\\Users\\User\\Desktop\\final\\server\\uploads").map((r) => {
                    if(r === (subString)){
                        fs.unlinkSync(`C:\\Users\\User\\Desktop\\final\\server\\uploads\\${r}`)
                    }
                })
            }

            const updted = await UserModel.updateOne({
                _id:new mongoose.Types.ObjectId(`${userId}`)
            },{
                $set:{
                    "userName":username, 
                    "email":email, 
                    "gender":gender, 
                    "userImage":tempImageArray[0].urlImage
                }
            })
    
            return res.status(200).json({"message":"Update User Success"});

        }
        else {
            return res.status(400).json({"message":"Your Gender Is Not Correct"});
        }

       

    } catch (error) {
        console.log(`Update User Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}


export const UpdatePassword = async(req:Request, res:Response) => {
    try {
        const {oldPassword,newPassword,confirmPassword} = req.body;
        //@ts-ignore
        const {_id} = req.user;

        const checkUserOldPassword = await UserModel.findById({_id:new mongoose.Types.ObjectId(`${_id}`)}).select('password').lean();
        
        const checkPassword = bcrypt.compareSync(oldPassword,checkUserOldPassword!.password)
        
        if(String(newPassword) === String(confirmPassword)) {
        
            if(checkPassword === true) {
        
                const passwordHash = bcrypt.hashSync(newPassword,10)
                const updateUserPassword = await UserModel.findByIdAndUpdate({_id:_id},{password:passwordHash})
                return res.status(200).json('Update Password Success')
        
            }
        
            else{
        
                return res.status(403).json('Your Password Is Not Correct')
        
            }
        }
        else{
     
            return res.status(402).json('Your Password And Confirm Password Is Not Correct')
     
        }

    } catch (error) {
        res.status(400).json('UPDATE USER PASSWORD ERROR')
        return console.log('UPDATE USER PASSWORD ERROR=>',error)
    }
}


export const UserGetBookMark = async(req:Request, res:Response) => {
    try {

        //@ts-ignore
        const {userId} = req.user;

        const user:UserDocument = await UserModel.findById({"_id":new mongoose.Types.ObjectId(`${userId}`)})
        .select("bookMark")
        .populate({
            path:"bookMark",
            select:"imageData storeName ratingSum ratingCount commentCount",
            populate:{
                path:"category",
                select:"name"
            }
        })
        .lean();

        

        return res.status(200).json({"user":user});
        

    } catch (error) {
        console.log("User Get Book Mark Error =>",error)
        return res.status(400).json({"message":"Something Went Wronge"})
    }
}

export const PullUserBookMark = async(req:Request, res:Response) => {
    try {
        
        const {storeid} = req.headers;
        //@ts-ignore
        const {userId} = req.user;

        await UserModel.updateOne({
            _id:new mongoose.Types.ObjectId(`${userId}`)
        }, {
            $pull:{"bookMark":storeid}
        })
        .exec();

        return res.status(200).json({"message":"Remove BookMark Success"});


    } catch (error) {
        console.log("Pull User Book Mark Error =>",error)
        return res.status(400).json({"message":"Something Went Wronge"})
    }
}

export const SearchFunction = async(req:Request, res:Response) => {
    try {
        
        const { name,location } = req.body;

        const data = await StoreModel.find({$text:{$search:name}}).lean();

        return res.status(200).json({"data":data});



    } catch (error) {
        console.log("Search Fucntion Error =>",error)
        return res.status(400).json({"message":"Something Went Wronge"})
    }
}