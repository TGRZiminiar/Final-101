
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

interface UserBookMark {
    bookMark:BookMark[];
}

type BookMark = {
    category:{
        name:string;
        _id:string;
    }[];
    
    commentCount:number;
    imageHeader:{
        urlImage:string
    }
    ratingCount:number;
    ratingSum:number;
    storeName:string;
    _id:string;

}   

export { CurrentUser, CurrentUserData, UserBookMark, BookMark };