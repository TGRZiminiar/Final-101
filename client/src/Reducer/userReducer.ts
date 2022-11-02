interface LogInLogOutUser {
    email:string
    userName:string;
    userId:string;
    userImage:string;
    gender:string;
    role:string;
}

//@ts-ignore
export function userReducer(state=null,action){
    switch (action.type) {
        case "LOGIN_USER":
            const data:LogInLogOutUser = action.payload;
            return data;
        
        case "LOGOUT":
            return action.payload
        
        default:
            return state
    }
}
