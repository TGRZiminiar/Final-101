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

interface UpdateStoreInterface extends CreateStoreInterface {
    storeId:string;
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
    urlImage:string;
    contentType:string;
    _id:string
  
}

type ImageData = {
    urlImage:string;
    contentType:string;
}

type CommentSection = {
    textComment:string;
    likes?:string[];
    disLikes?:string[];
    postedBy:string;
    postedAt:Date;
    replyCount:number;
    commentReply:ReplyToSend[] 
}

type CommentReply = {
    textCommentReply:string;
    postedBy:string;
    postedAt:Date;
    likes?:string[];
    disLikes?:string[];
}

type RatingSection = {
    rating:number;
    ratingBy:string;
    ratingAt:Date;
    _id:string;
}

interface CommentToSend extends CommentSection { 
    userLikeOrNot?:boolean;
    userDislikeOrNot?:boolean;
    countLike?:number;
    countDislike?:number;
}

interface ImageHeader {
    urlImage:string;
}
    
interface ReplyToSend extends CommentReply {
    userLikeOrNot?:boolean;
    userDislikeOrNot?:boolean;
    countReplyLikes?:number;
    countReplyDisLikes?:number;
}


type ImageUrl = {
    urlImage:string;
    contentType:string;
}

interface SearchStore {
    _id:string;
    storeName:string;
    ratingSum:number;
    ratingCount:number;
    commentCount:number;
    imageData:ImageUrl;
}



export {CreateStoreInterface, SearchStore, LocationInterface, TimeOpen, TimeOpenDelivery, CheckBox, CommentSection,ImageData , Contact, CommentReply, RatingSection, MenuList, CommentToSend, ReplyToSend, UpdateStoreInterface, ImageUrl, ImageHeader};