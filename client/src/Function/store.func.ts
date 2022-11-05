import axios from "axios";
import Cookies from "js-cookie";
import { TimeOpen } from "../Pages/Admin/CreateStore";
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

export const GetSingleStore = async(storeId:string) => {
    
    return await axios.get(`http://localhost:5000/api/get-single-store`,{
        headers:{
            authorization:`Bearer ${authtoken}`,
            storeid:storeId
        }
    })
}

export const UploadImageStoreFunc = async(storeId:string,images:File[]) => {
    ///upload-image-store
    const formData = new FormData();
    console.log(images)
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

export const DeleteImageStore = async(storeId:string, arrImgId:string[], arrImgFileName:string[]) => {
    
    return await axios.patch("http://localhost:5000/api/delete-image-store",{
        storeId, arrImgId, arrImgFileName
    },{
        headers:{
            authorization:`Bearer ${authtoken}`,
        }
    })
    
}

export const GetDataUpdate = async() => {
    return await axios.get("http://localhost:5000/api/get-single-update-store",{
        headers:{
            authorization:`Bearer ${authtoken}`,
        }
    })
}