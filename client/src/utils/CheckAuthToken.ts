import {toast} from "react-toastify"

const checkToken = (authtoken:string):boolean => {
    if(!authtoken){
        toast.error("Your Login Time Is Out Please Login Again");
        return false;
    }
    else {
        return true;
    }
}

export default checkToken;