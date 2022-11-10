
import {Request, Response} from "express"

export const CreateReplyComment = async(req:Request, res:Response) => {
    try {
        
        const { commentId, textReply } = req.body;
        //@ts-ignore
        const { userId } = req.user;


        

    } catch (error) {
        console.log(`Create Reply Comment Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}
