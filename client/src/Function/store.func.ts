import axios from "axios";
import Cookies from "js-cookie";
import { TimeOpen } from "../Pages/Admin/CreateStore";
const authtoken = Cookies.get("access_token");

type LocationInterface = {
    textLocation:string;
    link:string;
}

export const PostCreateStore = async(
    storeName:string, category:string[], location:LocationInterface, seatNumber:number, timeOpen:TimeOpen[], timeOpenDelivery:TimeOpen[]) => {
    
    return await axios.post(`http://localhost:5000/api/create-store`,{
        storeName, category, location, seatNumber, timeOpen, timeOpenDelivery
    },{
        headers:{
            authorization:`Bearer ${authtoken}`
        }
    })
}