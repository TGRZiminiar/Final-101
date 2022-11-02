
type CurrentUserData = {
    userImage:string;
    gender:string;
    role:string;
    userName:string;
    email:string;
    _id:string;
}

interface CurrentUser {
    data:CurrentUserData
}

export { CurrentUser,CurrentUserData };