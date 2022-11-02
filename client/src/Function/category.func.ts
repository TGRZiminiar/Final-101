import axios from "axios";
import Cookies from "js-cookie";
const authtoken = Cookies.get("access_token");

export const PostCreateCategory = async(category:string) => {
    return await axios.post(`http://localhost:5000/api/create-category`,{category},{
        headers:{
            authorization:`Bearer ${authtoken}`
        }
    })
}

export const UpdateCategory = async(categoryId:string, newCategory:string) => {
    return await axios.patch(`http://localhost:5000/api/update-category`,{categoryId, newCategory},{
        headers:{
            authorization:`Bearer ${authtoken}`
        }
    })
}

export const DeleteCategory = async(categoryId:string) => {
    return await axios.delete(`http://localhost:5000/api/delete-category`,{
        headers:{
            authorization:`Bearer ${authtoken}`,
            categoryId:categoryId
        }
    })
}

export const ListAllCategory  = async() => {
    return await axios.get(`http://localhost:5000/api/get-all-category`,{
        headers:{
            authorization:`Bearer ${authtoken}`,
        }
    })
}