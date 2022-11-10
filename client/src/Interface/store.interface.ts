interface SingleStoreInterface {
    storeName:string;//
    branch:string[];
    category:Category[];//
    checkBox:CheckBox[];
    commentCount:number;
    contact:Contact[];
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

type CheckBox = {
    text:string;
    check:boolean;
}

type Contact = {
    platform:string;
    link:string;
}

type MenuList = {
    text:string;
    price:number;
}

type ImageData = {
    fileName:string;
    contentType:string;
    imageBase64:string;
}

type CommentSection = {
    textComment:string;
    postedBy:PostedBy;
    postedAt:Date;
    replyCount:number;
    commentReply:CommentReply[];
    userLikeOrNot:boolean;
    userDislikeOrNot:boolean;
    countLike:number;
    countDislike:number;
    _id:string;
}

type CommentReply = {
    textCommentReply:string;
    postedBy:PostedBy;
    postedAt:Date;
    likes:string[];
    disLikes:string[];
}

type PostedBy = {
    gender:string;
    userImage:string;
    userName:string;
}

export {SingleStoreInterface, LocationInterface, TimeOpen, TimeOpenDelivery, CheckBox, CommentSection,ImageData , Contact, CommentReply, MenuList,Category};