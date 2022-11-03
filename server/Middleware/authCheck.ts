import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserSignJWT } from "../Interface/user.interface";
import UserModel from "../Models/user.models"

export const authCheck = async(req:Request, res:Response, next:NextFunction)/*: Promise<NextFunction> */ => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(403).json("Access Denied.");
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as string,(err,user) => {
        
        if(err) {
            console.log('JWT ERROR =>',err)
            return res.status(403).send('TOKEN EXPIRES')
        }
        //@ts-ignore
        req.user = user as UserSignJWT;
        return next()
    })

    // if(!token)

}

export const AdminCheck = async(req:Request, res:Response, next:NextFunction) => {
    //@ts-ignore
    const {userId} = req.user;
    //@ts-ignore
    // console.log(req.user)
    if(!userId){
        return res.status(400).send("Something Went Wronge")
    }
    const checkAdmin = await UserModel.findById({"_id":userId})
    .select('role')
    .lean()
  
    if(!checkAdmin){
        
        return res.status(403).json({
            message:'Admin Resource. Access denied.'
        })

    }

    else if(checkAdmin.role ==='admin'){
    
        next();
    
    }
    
    else{
    
        return res.status(403).json({
            message:'Admin Resource. Access denied.'
        })
    
    }

}