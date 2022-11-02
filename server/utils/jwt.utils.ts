import jwt from "jsonwebtoken";


export function signJwt(object:Object, options?:jwt.SignOptions | undefined):string {
    const token = jwt.sign(object, process.env.ACCESS_TOKEN_SECRET as string, {
        ...(options && options),
    }); 
    return token;

}