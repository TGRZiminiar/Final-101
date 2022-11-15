interface SingleStoreInterface {
    storeName:string;//
    branch:string[];
    category:Category[];//
    checkBox:CheckBoxInterface[];
    commentCount:number;
    contact:ContactInterface[];
    imageData:ImageData[];
    location:LocationInterface; 
    menuList:MenuList[];
    otherDetail:string;
    rangePrice:string;
    ratingCount:number;
    ratingSum:number;
    seatNumber:number;
    timeOpen:TimeOpen[];
    timeOpenDelivery:TimeOpenDelivery[];
}

interface UpdateStoreInterface {
    storeName:string;//
    category:Category[];//
    location:LocationInterface; //
    seatNumber:number;
    timeOpen:TimeOpen[];
    timeOpenDelivery:TimeOpenDelivery[];
    rangePrice:string;
    checkBox:CheckBox[];
    otherDetail:string;
    contact:Contact[];
    menuList:MenuList[];
    branch:string[];
}


type CheckBox = {
    text:string;
    check:boolean;
}

type Contact = {
    platform:string;
    link:string;
}



// commentSection:CommentSection[];

type Category = {
    name:string;
    _id:string
}

type LocationInterface = {
    textLocation:string;
    link:string;
}

type TimeOpen = {
    date:string;
    time:string;
}

type TimeOpenDelivery = {
    date:string;
    time:string;
}

type CheckBoxInterface = {
    text:string;
    check:boolean;
}

type ContactInterface = {
    platform:string;
    link:string;
}

type MenuList = {
    text:string;
    price:number;
    urlImage?:string;
    contentType?:string;
    _id?:string;
}

type ImageData = {
    urlImage:string;
    contentType:string;
}

type CommentSection = {
    textComment:string;
    postedBy:PostedBy;
    postedAt:Date;
    replyCount:number;
    commentReply:CommentReplyInterface[];
    userLikeOrNot:boolean;
    userDislikeOrNot:boolean;
    countLike:number;
    countDislike:number;
    _id:string;
}

type CommentReplyInterface = {
    textCommentReply:string;
    postedBy:PostedBy;
    postedAt:Date;
    likes:string[];
    disLikes:string[];
    _id:string
    userLikeOrNot:boolean;
    userDislikeOrNot:boolean;
    countReplyLikes:number;
    countReplyDisLikes:number;

}

type PostedBy = {
    gender:string;
    userImage:string;
    userName:string;
}


export {SingleStoreInterface, LocationInterface, TimeOpen, TimeOpenDelivery, CheckBoxInterface, CommentSection,ImageData , ContactInterface, CommentReplyInterface, MenuList,Category,UpdateStoreInterface};