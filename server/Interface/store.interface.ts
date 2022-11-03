interface CreateStoreInterface {
    storeName:string;//
    category:string;//
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
    likes:string[];
    disLikes:string[];
    postedBy:string;
    postedAt:Date;
    replyCount:number;
    commentReply:CommentReply[]
}

type CommentReply = {
    textCommentReply:string;
    postedBy:string;
    postedAt:Date;
    likes:string[];
    disLikes:string[];
}

type RatingSection = {
    rating:number;
    ratingBy:string;
    ratingAt:Date;
}

export {CreateStoreInterface, LocationInterface, TimeOpen, TimeOpenDelivery, CheckBox, CommentSection,ImageData , Contact, CommentReply, RatingSection, MenuList};