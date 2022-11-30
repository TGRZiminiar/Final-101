import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { TimeOpen } from "../Pages/Admin/CreateStore";
import checkToken from "../utils/CheckAuthToken";
const authtoken = Cookies.get("access_token");

type LocationInterface = {
    textLocation:string;
    link:string;
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

export interface ChangeMenu extends MenuList {
    _id:string;
    urlImage:string;
}

export const PostCreateStore = async(
    storeName:string, category:string[], location:LocationInterface, seatNumber:number, timeOpen:TimeOpen[], timeOpenDelivery:TimeOpen[],
    rangePrice:string, checkBox:CheckBox[], otherDetail:string, contact:Contact[], menuList:MenuList[], branch:string[]
    ) => {
    
    return await axios.post(`http://localhost:5000/api/create-store`,{
        storeName, category, location, seatNumber, timeOpen, timeOpenDelivery, rangePrice, checkBox, otherDetail, contact, menuList, branch
    },{
        headers:{
            authorization:`Bearer ${authtoken}`
        }
    })
}

export const GetStore = async() => {
    return await axios.get(`http://localhost:5000/api/get-store`,{
        headers:{
            authorization:`Bearer ${authtoken}`
        }
    })
}

export const GetSingleStoreForUploadImage = async(storeId:string) => {
    
    return await axios.get(`http://localhost:5000/api/get-single-store-upload-image`,{
        headers:{
            authorization:`Bearer ${authtoken}`,
            storeid:storeId
        }
    })
}

export const UploadImageStoreFunc = async(storeId:string,images:File[]) => {
    ///upload-image-store
    const formData = new FormData();
    // console.log(images)
    await Promise.all((images.map((f) => (
        formData.append("images",f)
    ))))
    
    return await axios({
        method: "post",
        url: "http://localhost:5000/api/upload-image-store",
        data: formData,
        headers: { "Content-Type": "multipart/form-data",authorization:`Bearer ${authtoken}`,storeid:storeId },
      })
}

export const UploadImageMenuFunc = async(storeId:string, menuId:string, images:File[],currentUrl:string, price:string, menuName:string) => {
    console.log("THIS IS IMAGE =>",images)
    const formData = new FormData();

    formData.append("images",images[0]);

    return await axios({
        method:"post",
        url:"http://localhost:5000/api/upload-image-menu",
        data: formData,
        headers: {
            "Content-Type":"singlepart/form-data",
            authorization:`Bearer ${authtoken}`,
            storeid:storeId,
            menuid:menuId,
            currenturl:currentUrl,
            price:price,
            menuname:menuName,
        }
    })

}

export const PatchAddMenu = async(storeId:string, images:File[], price:number, menuName:string) => {

    const formData = new FormData();

    formData.append("images",images[0]);

    return await axios({
        method:"patch",
        url:"http://localhost:5000/api/add-menu",
        data: formData,
        headers: {
            "Content-Type":"singlepart/form-data",
            authorization:`Bearer ${authtoken}`,
            storeid:storeId,
            price:price,
            menuname:menuName,
        }
    })

}

export const DeleteImageStore = async(storeId:string, arrImgId:string[], arrImgFileName:string[]) => {
    
    return await axios.patch("http://localhost:5000/api/delete-image-store",{
        storeId, arrImgId, arrImgFileName
    },{
        headers:{
            authorization:`Bearer ${authtoken}`,
        }
    })
    
}

export const GetDataUpdate = async(storeId:string) => {
    if(!checkToken(authtoken as string)){
        toast.error("Please Login Again")
        return false;
    }
    else {
        return await axios.get("http://localhost:5000/api/get-single-update-store",{
            headers:{
                storeid:storeId,
                authorization:`Bearer ${authtoken}`,
            }
        })
    }
 
}

export const GetAllStore = async() => {
    return await axios.get("http://localhost:5000/api/get-all-store")
}

export const GetSingleStore = async(storeId:string) => {

    return await axios.get("http://localhost:5000/api/get-single-store",{
    headers:{
        storeid:storeId,
        authorization:`Bearer ${authtoken}`,
    }
    })
    
}

export const PatchUpdateStore = async(storeName:string, category:string[], location:LocationInterface, seatNumber:number, timeOpen:TimeOpen[], timeOpenDelivery:TimeOpen[],
    rangePrice:string, checkBox:CheckBox[], otherDetail:string, contact:Contact[], menuList:MenuList[], branch:string[], storeId:string) => {
        
        return await axios.patch(`http://localhost:5000/api/update-store`,{
            storeName, category, location, seatNumber, timeOpen, timeOpenDelivery, rangePrice, checkBox, otherDetail, contact, menuList, branch, storeId
        },{
            headers:{
                authorization:`Bearer ${authtoken}`,
                
            }
        })
        
    }
    
export const GetUploadImageMenu = async(storeId:string) => {
        return await axios.get(`http://localhost:5000/api/get-data-upload-image-menu`,{
            headers:{
                authorization:`Bearer ${authtoken}`,
                storeid:storeId
        }
    })
}

export const GetSingleMenu = async(storeId:string, menuId:string) => {
    return await axios.get(`http://localhost:5000/api/get-single-menu`,{
        headers:{
            authorization:`Bearer ${authtoken}`,
            storeid:storeId,
            menuid:menuId,
    }
    })
    
}

export const DeleteMenu = async(storeId:string, menuId:string, urlImage:string) => {
    return await axios.delete(`http://localhost:5000/api/remove-menu`,{
        headers:{
            storeid:storeId,
            menuid:menuId,
            authorization:`Bearer ${authtoken}`,
            urlimage:urlImage
        }
    })
}

export const DeleteStore = async(storeId:string) => {
    return await axios.delete(`http://localhost:5000/api/remove-store`,{
        headers:{
            storeid:storeId,
            authorization:`Bearer ${authtoken}`,
        }
    })
}

export const PatchChangeSequenceMenu = async(storeId:string, menuList:ChangeMenu[]) => {
    return await axios.patch(`http://localhost:5000/api/change-sequence-menu`,{
        storeId:storeId,
        menuList:menuList,
    },{
        headers:{
            authorization:`Bearer ${authtoken}`,
        }
    })
    
}


export const PatchUserBookMark = async(storeId:string) => {
    ///add-book-mark
    if(!authtoken){
        toast.error("You need to Login First");
        return false;
    }
    else {
        return await axios.patch("http://localhost:5000/api/add-book-mark",{},{
            headers:{
                authorization:`Bearer ${authtoken}`,
                storeid:storeId,
            }
        });
    }
    
}


export const GetDataImageHeader = async(storeId:string) => {
    if(!authtoken){
        toast.error("You need to Login First");
        return false;
    }
    else {
        return await axios.get("http://localhost:5000/api/get-single-store-image-header",{
            headers:{
                authorization:`Bearer ${authtoken}`,
                storeid:storeId,
            }
        });
    }
    
}

export const PatchUploadImageHeader = async(storeId:string,currentUrlImage:string, images:File[]) => {
    if(!authtoken){
        toast.error("You need to Login First");
        return false;
    }
    else {

        const formData = new FormData();

        formData.append("images",images[0]);
        formData.append("currentUrlImage",currentUrlImage);
        
        return await axios({
            method:"patch",
            url:"http://localhost:5000/api/upload-image-header",
            data: formData,
            headers: {
                "Content-Type":"singlepart/form-data",
                authorization:`Bearer ${authtoken}`,
                storeid:storeId,
            }
        })
    }
}


export const GetRandomRestaurant = async() => {
    return await axios.get("http://localhost:5000/api/get-random");
}

export const GetSuggestRestaurant = async(storeId:string, categoryId:string[]) => {
    return await axios.post(`http://localhost:5000/api/suggest-restaurant`,{
        categoryId:categoryId
    },{
        headers:{
            storeid:storeId,
        }
    })
}