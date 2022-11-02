interface ResultRegister{
    message:string;
    token:string
}

interface ResultCurrentUser {
    userImage:string; 
    gender:string; 
    role:string; 
    userName:string; 
    email:string;
    _id:string;
}

interface LoginResult extends ResultRegister{
    
}

export { ResultRegister, LoginResult,ResultCurrentUser }