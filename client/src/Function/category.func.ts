import axios from "axios";
import Cookies from "js-cookie";
const authtoken = Cookies.get("access_token");

export const PostCreateCategory = async(category:string, images:File[]) => {
    
    const formData = new FormData();
    // console.log(images)
    formData.append("images",images[0]);
    formData.append("name",category)

    // return await axios.post(`http://localhost:5000/api/create-category`,{data:formData},{
    //     headers:{
    //         authorization:`Bearer ${authtoken}`
    //     }
    // })
    return await axios({
        method: "post",
        url: "http://localhost:5000/api/create-category",
        data: formData,
        headers: { "Content-Type": "multipart/form-data",authorization:`Bearer ${authtoken}` },
      })
    }
    
export const UpdateCategory = async(categoryId:string, newCategory:string, images:File[],currentUrlImage:string) => {
        
    const formData = new FormData();
    formData.append("images",images[0]);
    formData.append("categoryId",categoryId);
    formData.append("newCategory",newCategory);
    formData.append("currentUrlImage",currentUrlImage);

    return await axios({
        method: "patch",
        url: "http://localhost:5000/api/update-category",
        data: formData,
        headers: { "Content-Type": "multipart/form-data",authorization:`Bearer ${authtoken}` },
        })
    
    // return await axios.patch(`http://localhost:5000/api/update-category`,{categoryId, newCategory},{
    //     headers:{
    //         authorization:`Bearer ${authtoken}`
    //     }
    // })
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