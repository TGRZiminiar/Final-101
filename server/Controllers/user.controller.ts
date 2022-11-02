import { Request,Response } from "express";
import UserModel, { UserDocument } from "../Models/user.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserSignJWT } from "../Interface/user.interface";
import { signJwt } from "../utils/jwt.utils";


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