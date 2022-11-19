import e, {Request, Response} from "express";
import { CommentSection, CommentToSend, CreateStoreInterface, ImageUrl, ReplyToSend, UpdateStoreInterface } from "../Interface/store.interface";
import StoreModel, { StoreDocument } from "../Models/store.model";
import fs from "fs"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { UserSignJWT } from "../Interface/user.interface";
import UserModel from "../Models/user.models";


export const CreateStore = async(req:Request, res:Response) => {
    try {
    
        const data:CreateStoreInterface = req.body;
        
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

export const UpdateStore = async(req:Request, res:Response) => {
    try {
        
        const data:UpdateStoreInterface = req.body;

        await StoreModel.findOneAndUpdate({_id:new mongoose.Types.ObjectId(`${data.storeId}`)}, {
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
            "branch":data.branch,
        })

        return res.status(200).json({"message":"Update Store Success"});
        
    } catch (error) {
        console.log(`Update Store Error => ${error}`);
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

export const GetSingleStoreForUploadImage = async(req:Request, res:Response) => {
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
        if(!files){
            return res.status(400).json("Something Went Wronge");
        }

        const {storeid} = req.headers;

        //@ts-ignore
        let imgArray = files.map((file) => {
            let img = fs.readFileSync(file.path)

            return img.toString('base64')
        })
        let url = req.protocol + '://' + req.get('host');
        let tempImageArray:ImageData[] = [];
        await Promise.all( imgArray.map((src:string, index:number) => {

            // create object to store data in the collection
            let finalImg:ImageData = {
                //@ts-ignore
                urlImage : url + "/" +files[index].path,
                //@ts-ignore
                contentType : files[index].mimetype,
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

export const UploadMenuStore = async(req:Request, res:Response) => {
    try {

        //@ts-ignore
        const files = req.files;
        //@ts-ignore
        console.log("THIS IS REQ FILE",files)
        if(!files){
            return res.status(400).json("Something Went Wronge");
        }

        const {storeid, menuid, currenturl, price, menuname} = req.headers;

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
                let subString = String(currenturl).substring(30)
                fs.readdirSync("C:\\Users\\User\\Desktop\\final\\server\\uploads").map((r) => {
                    // console.log("THIS IS SUBSTRING =>",subString)
                    // console.log("THIS IS R =>",r)
                    if(r === subString){
                        fs.unlinkSync(`C:\\Users\\User\\Desktop\\final\\server\\uploads\\${r}`)
                    }
                })
        }

        await StoreModel.updateOne({
            _id:new mongoose.Types.ObjectId(`${storeid}`),
            menuList:{$elemMatch:{"_id":new mongoose.Types.ObjectId(`${menuid}`)}}
        },{
            $set:{
                "menuList.$.urlImage":tempImageArray[0].urlImage,
                "menuList.$.price":Number(price),
                "menuList.$.text":menuname,
            
            }
        })


        return res.status(200).json({"message":"Upload Image Success"});


    } catch (error) {
        console.log(`Upload Image Menu Error => ${error}`);
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
            const subString = String(arrImgFileName[i]).substring(30)
            fs.readdirSync("C:\\Users\\User\\Desktop\\final\\server\\uploads").map((r) => {
                if(r.includes(subString)){
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
        .select("storeName location seatNumber timeOpen timeOpenDelivery rangePrice checkBox otherDetail contact menuList branch")
        .populate({
            path:"category",
            select:"name _id"
        })
        .lean()
        
        return res.status(200).json({"store":data})

    } catch (error) {
        console.log(`Get Store Detail Update Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
        
    }
}

export const GetAllStore = async(req:Request, res:Response) => {
    try {
        
        const data = await StoreModel.find({})
        .sort({"createdAt":-1})
        // .limit(10)
        .select("storeName ratingSum ratingCount commentCount otherDetail seatNumber timeOpen imageHeader")
        .populate({
            path:"category",
            select:"name _id"
        })
        .lean()

        return res.status(200).json({"store":data})

    } catch (error) {
        console.log(`Get All Store Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}



export const GetDataUploadImageMenu = async(req:Request, res:Response) => {
    try {
        
        const {storeid} = req.headers;
        
        const data = await StoreModel.findById({_id:new mongoose.Types.ObjectId(`${storeid}`)})
        .select("storeName menuList")
        .lean();

        return res.status(200).json({"store":data});

    } catch (error) {
        console.log(`Get Data Upload Image Menu Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const GetSingleMenuData = async(req:Request, res:Response) => {
    try {
        
        const {storeid, menuid} = req.headers;

        const data = await StoreModel.aggregate([
            {$match:{"_id":new mongoose.Types.ObjectId(`${storeid}`)}},
            {$unwind:"$menuList"},
            {$match:{"menuList._id":new mongoose.Types.ObjectId(`${menuid}`)}},
            {$project:{
                _id:0,
                menuList:"$menuList"
            }}
        ])

        return res.status(200).json({"menu":data[0]})

    } catch (error) {
        console.log(`Get Single Menu Data Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}







export const GetSingleStore = async(req:Request, res:Response) => {
    try {
        
        const { storeid } = req.headers;
        let userId:string|null = null;
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        

          //@ts-ignore
        if(token){
            //@ts-ignore
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as string,(err,user) => {
                // console.log(user)
                if(user){
                    //@ts-ignore
                    userId = String(user.userId) as UserSignJWT;
                }
                else userId = null;
            })
        }

     
        const data:StoreDocument = await StoreModel.findById({_id:storeid})
        .select(
            "storeName location seatNumber timeOpen timeOpenDelivery rangePrice checkBox otherDetail contact userBookMark menuList branch ratingSum ratingCount commentCount imageData commentSection createdAt ratingSection"
        )
        .populate({
            path:"category",
            select:"name _id"
        })
        .populate({
            path:"commentSection.postedBy commentSection.commentReply.postedBy",
            select:"-_id userName userImage gender"
        })  
        .lean();
       

        let comments:any = null;

        if(userId){
            comments = await checkCommentAndCommentReply(data, userId);
        }

        else {
            comments = await checkCommentAndCommentReplyNoUserId(data)
        }

        
      
        let userAddBookOrNot:boolean = false;
        for (let i = 0; i < data.userBookMark.length; i++) {
            if(String(data.userBookMark[i]) === String(userId)){
                userAddBookOrNot = true;
            }
            else continue;
        }

        const temp = {...data} as Partial<StoreDocument>
        delete temp.commentSection;
        
        return res.status(200).json({"store":temp,"comments":comments,"userAddBookOrNot":userAddBookOrNot});

    } catch (error) {
        console.log(`Get All Store Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const AddSingleMenuToStore = async(req:Request, res:Response) => {
    try {
        
        //@ts-ignore
        const files = req.files;
        //@ts-ignore
        if(!files){
             return res.status(400).json("Something Went Wronge");
        }
 
        const {storeid,price,menuname} = req.headers;


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

        console.log("THIS IS MENU NAME =>",menuname,price);

        const data = await StoreModel.findOneAndUpdate({
                 _id:new mongoose.Types.ObjectId(`${storeid}`),
             },{
                 $push:{menuList:{price:Number(price),text:menuname,urlImage:tempImageArray[0].urlImage}}
        },{
            new:true,
        })



        if(!data){
            return res.status(400).json({"message":"StoreId Doesn't Match"});
        }
        else {
            return res.status(200).json({"Menu":data.menuList,"message":"Add Menu Success"});
        }


    } catch (error) {
        console.log(`Add Single Menu Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const ChangeSequenceMenu = async(req:Request, res:Response) => {
    try {
        
        const {menuList,storeId} = req.body;
        const data = await StoreModel.findByIdAndUpdate({
            _id:new mongoose.Types.ObjectId(`${storeId}`)
        },{
            $set:{"menuList":menuList}
        },{
            new:true
        })

        if(!data) {
            return res.status(400).json({"Message":"No Store Found"});
        }
        else {
            return res.status(200).json({"menu":data.menuList});
        }

    } catch (error) {
        console.log(`Change Sequence Menu Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}


export const RemoveMenuStore = async(req:Request, res:Response) => {
    try {
        
        const {storeid, menuid,urlimage} = req.headers;
        console.log("THIS IS STORE ID =>",storeid);
        console.log("THIS IS MENU ID =>",menuid);

        
        if(urlimage){
            const subString = String(urlimage).substring(30)
            fs.readdirSync("C:\\Users\\User\\Desktop\\final\\server\\uploads").map((r) => {
                if(r.includes(subString)){
                    fs.unlinkSync(`C:\\Users\\User\\Desktop\\final\\server\\uploads\\${r}`)
                }
            })
        }

        await StoreModel.updateOne({
            // _id:new mongoose.Types.ObjectId(`${storeid}`),
            menuList:{$elemMatch:{"_id":new mongoose.Types.ObjectId(`${menuid}`)}},
        },{
            $pull:{menuList:{"_id":new mongoose.Types .ObjectId(`${menuid}`)}},
        },{
            multi:true
        })
        
        return res.status(200).json({"message":"Remove Image Success"});

        // await StoreModel.updateOne({
        //     _id:new mongoose.Types.ObjectId(`${storeid}`),
        //     menuList:{$elemMatch:{"_id":new mongoose.Types.ObjectId(`${menuid}`)}}
        // },{
        //     $set:{
        //         "menuList.$.urlImage":tempImageArray[0].urlImage,
        //         "menuList.$.price":Number(price),
        //         "menuList.$.text":menuname,
            
        //     }
        // })

    } catch (error) {
        console.log(`Update Menu Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}


export const RemoveStore = async(req:Request, res:Response) => {
    try {
        
        const {storeid} = req.headers;
        const data:StoreDocument = await StoreModel.findById({_id:new mongoose.Types.ObjectId(`${storeid}`)})
        .select("imageData menuList")
        .lean();

        for (let i = 0; i < data.menuList.length; i++) {
            let substring = String(data.menuList[i].urlImage).substring(30);
            fs.readdirSync("C:\\Users\\User\\Desktop\\final\\server\\uploads").map((r) => {
                if(r.includes(substring)){
                    fs.unlinkSync(`C:\\Users\\User\\Desktop\\final\\server\\uploads\\${r}`)
                }
            })
        }

        for (let i = 0; i < data.imageData.length; i++) {
            let substring = String(data.imageData[i].urlImage).substring(30);
            fs.readdirSync("C:\\Users\\User\\Desktop\\final\\server\\uploads").map((r) => {
                if(r.includes(substring)){
                    fs.unlinkSync(`C:\\Users\\User\\Desktop\\final\\server\\uploads\\${r}`)
                }
            })
        }

        await StoreModel.deleteOne({_id:new mongoose.Types.ObjectId(`${storeid}`)}).lean();

        return res.status(200).json({"message":"Remove Store Success"});

    } catch (error) {
        console.log(`Remove Store Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}



export const UserAddBookMark = async(req:Request, res:Response) => {
    try {

        //@ts-ignore
        const {userId} = req.user;
        
        const {storeid} = req.headers;
        const data:{
            userBookMark:string[]
        } = await StoreModel.findById({_id:new mongoose.Types.ObjectId(`${storeid}`)})
        .select("userBookMark")
        .lean();

        let userAddBookOrNot:boolean = false;
        for (let i = 0; i < data.userBookMark.length; i++) {
            if(String(data.userBookMark[i]) === String(userId)){
                userAddBookOrNot = true;
            }
            else continue;
        }

        if(userAddBookOrNot){
            
            await StoreModel.updateOne({
                _id:new mongoose.Types.ObjectId(`${storeid}`),
            },{
                $pull:{"userBookMark":userId}
            },{
                new:true
            })

            await UserModel.updateOne({
                _id:new mongoose.Types.ObjectId(`${userId}`),
            },{
                $pull:{"bookMark":storeid}
            })

            return res.status(200).json({"message":"Remove User Book Mark Success"})
        }
        
        else {

            await StoreModel.updateOne({
                _id:new mongoose.Types.ObjectId(`${storeid}`),
            },{
                $addToSet:{"userBookMark":new mongoose.Types.ObjectId(`${userId}`)}
            },{
                new:true
            });

            await UserModel.updateOne({
                _id:new mongoose.Types.ObjectId(`${userId}`),
            },{
                $addToSet:{"bookMark":storeid}
            });

            return res.status(200).json({"message":"Add To User Book Mark Success"})
        }


    } catch (error) {
        console.log(`User Add BookMark Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const GetImageHeader = async(req:Request, res:Response) => {
    try {
        
        const {storeid} = req.headers;

        const data = await StoreModel.findById({_id:new mongoose.Types.ObjectId(`${storeid}`)})
        .select("storeName imageHeader")
        .lean();

        return res.status(200).json({"data":data});

    } catch (error) {
        console.log(`Get Image Header Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const UploadImageHeaderStore = async (req:Request, res:Response) => {
    let rurl:string = "";
    try {
        //@ts-ignore
        const files = req.files;
        if(!files){
            return res.status(400).json("Something Went Wronge");
        }
        const {currentUrlImage} = req.body;
        const {storeid} = req.headers;

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
                if(r === subString){
                    fs.unlinkSync(`C:\\Users\\User\\Desktop\\final\\server\\uploads\\${r}`)
                }
            })
        }

        await StoreModel.updateOne({
            _id:new mongoose.Types.ObjectId(`${storeid}`)
        },{
            $set:{"imageHeader.urlImage":rurl}
        });

        return res.status(200).json({"message":"Upload Sucess"});

    } catch (error) {
        fs.unlinkSync(`C:\\Users\\User\\Desktop\\final\\server\\uploads\\${rurl}`)

        console.log(`Upload Image Header Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const checkCommentAndCommentReply = async(data:StoreDocument, userId:string) => {
    
    let comments:CommentToSend[] = data.commentSection;
    let commentsToReturn:CommentToSend[] = [];
    


    for (let i = 0; i < comments.length; i++) {

        comments[i].userLikeOrNot = false;
        for (let j = 0; j < comments[i].likes!.length; j++) {
            if(String(comments[i].likes![j]) === userId){
                comments[i].userLikeOrNot = true; 
                break;
            }
        }        
        
        comments[i].userDislikeOrNot = false;
        for (let j = 0; j < comments[i].disLikes!.length; j++) {
            if(String(comments[i].disLikes![j]) === userId){
                comments[i].userDislikeOrNot = true; 
                break;
            }
        }        

        comments[i].countLike = comments[i].likes!.length as number;
        comments[i].countDislike = comments[i].disLikes!.length as number;
        // console.log(comments[i].likes!.length)
        // console.log(comments[i].disLikes!.length)
       
        
        delete comments[i].likes;
        delete comments[i].disLikes;
        let replyArr:ReplyToSend[] = [];

        for (let j = 0; j < comments[i].commentReply.length; j++) {
           
            comments[i].commentReply[j].userLikeOrNot = false;
            for (let k = 0; k < comments[i].commentReply[j].likes!.length; k++) {
                if(String(comments[i].commentReply[j].likes![k]) === userId){
                    comments[i].commentReply[j].userLikeOrNot = true;
                    break;
                }                
            }
            
            comments[i].commentReply[j].userDislikeOrNot = false;
            for (let k = 0; k < comments[i].commentReply[j].disLikes!.length; k++) {
                if(String(comments[i].commentReply[j].disLikes![k]) === userId){
                    comments[i].commentReply[j].userDislikeOrNot = true;
                    break;
                }                
            }

            comments[i].commentReply[j].countReplyLikes = comments[i].commentReply[j].likes!.length as number;
            comments[i].commentReply[j].countReplyDisLikes = comments[i].commentReply[j].disLikes!.length as number;
            // console.log(comments[i].commentReply[j].likes!.length)
            // console.log(comments[i].commentReply[j].disLikes!.length)
            delete comments[i].commentReply[j].likes;
            delete comments[i].commentReply[j].disLikes;
            replyArr.push(comments[i].commentReply[j]);
        }
        comments[i].commentReply = replyArr

        commentsToReturn.push(comments[i])

    }
    return commentsToReturn;

}



const checkCommentAndCommentReplyNoUserId = async(data:StoreDocument) => {
    
    let comments:CommentToSend[] = data.commentSection;

    for (let i = 0; i < comments.length; i++) {
        
        comments[i].userLikeOrNot = false;
        comments[i].userDislikeOrNot = false;

      
        comments[i].countLike = comments[i].likes!.length as number;
        comments[i].countDislike = comments[i].disLikes!.length as number;

        delete comments[i].likes;
        delete comments[i].disLikes;
        let replyArr:ReplyToSend[] = comments[i].commentReply;
        
        for (let j = 0; j < comments[i].commentReply.length; j++) {

            replyArr[j].userDislikeOrNot = false;
            replyArr[j].userLikeOrNot = false;

            replyArr[j].countReplyLikes = replyArr[j].likes!.length;
            replyArr[j].countReplyDisLikes = replyArr[j].disLikes!.length;

            delete replyArr[j].likes;
            delete replyArr[j].disLikes;
        }
        comments[i].commentReply = replyArr;
    }
    return comments;

}
