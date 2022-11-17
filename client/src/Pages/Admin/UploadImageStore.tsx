import { Button, Grid } from '@mui/material';
import { Axios, AxiosError, AxiosResponse } from 'axios';
import React,{ useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { DeleteImageStore, GetSingleStoreForUploadImage, UploadImageStoreFunc } from '../../Function/store.func';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useSelector } from 'react-redux';


interface SingleStore {
    storeName:string;
    imageData:ImageData[] | never[]
}

type ImageData = {
    urlImage:string;
    contentType:string;
    _id:string
}

interface StateProps {
    singleStore: SingleStore | null;
    images:File[];
    imageURLs:any;
    imageIdArr:string[] | null;
}

export const UploadImageStore: React.FC = () => {
    
    const {storeId} = useParams();
    //@ts-ignore
    const openDrawer = useSelector(state => state.drawer);

    const [state,setState] = useState<StateProps>({
        singleStore:null,
        images:[],
        imageURLs:[],
        imageIdArr:null,
    })

    const loadSingleStore = async() => {

        await GetSingleStoreForUploadImage(storeId as string)
        .then((res:AxiosResponse) => {
            setState(prev => ({...prev,singleStore:res.data.store as SingleStore}))
        }) 
        .catch((err:AxiosError) => {
            toast.error(err.response?.data as string)
          })
    }

    const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore  
      setState(prev=>({...prev,images:[...e.target.files]}))
    }
    
    const handleRemoveImage = (index:number) => {
        const temp1 = state.images;
        const temp2 = state.imageURLs;
        temp1.splice(index,1);
        temp2.splice(index,1);
        setState(prev => ({...prev,images:temp1, imageURLs:temp2}));
    }
    useEffect(() => {
        if (state.images.length < 1) return;
        //@ts-ignore
        const newImageUrls = [];
        //@ts-ignore
        state.images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        //@ts-ignore
        setState(prev=>({...prev,imageURLs:newImageUrls}))
    }, [state.images]);

    useEffect(() => {
        loadSingleStore()
    },[])

    console.log(state)

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(state.images.length === 0 || state.imageURLs.length === 0){
            return toast.error("You need to upload files first");
        }

        else {
            await UploadImageStoreFunc(storeId as string, state.images)
            .then((res:AxiosResponse) => {
                //@ts-ignore
                console.log(res)
                //@ts-ignore
                toast.success("Upload Image Success")
                setState(prev => ({...prev,images:[],imageURLs:[],}))
                loadSingleStore()
            })
            .catch((err:AxiosError) => {
                toast.error(err.response?.data as string)
            })
        }
        
    }

    const handleRemoveImageFromDb = (imgId:string) => {
        let tempArr:string[] | null = state.imageIdArr;
        if(!tempArr){
            tempArr = [];
        }
        const existOrNot = tempArr.some((elem) => elem === imgId);
        if(existOrNot){
            let index = tempArr.indexOf(imgId);
            if(index !== -1){
                tempArr.splice(index,1);
            }
        }
        else {
            tempArr?.push(imgId);
        }
        let unique = [...new Set(tempArr)]
        setState(prev => ({...prev, imageIdArr:unique}))
    }

    const checkId = (imgId:string) => {
        
        if(state.imageIdArr){
            for (let i = 0; i < state.imageIdArr.length; i++) {
                if(imgId === state.imageIdArr[i]){
                    return true;
                }                
            }
        }
    }

    const handleSubmitDeleteImage = async() => {
        const {imageIdArr,singleStore} = state;
        let fileName:string[] = [];

        if(!singleStore?.imageData || !imageIdArr){
            return 
        }

        for (let i = 0; i < singleStore.imageData.length; i++) {
            // console.log(singleStore.imageData[i])
            for (let j = 0; j < imageIdArr.length; j++) {
                if(imageIdArr[j] === singleStore.imageData[i]._id){
                    fileName.push(singleStore.imageData[i].urlImage)
                }                
            }            
        }

        await DeleteImageStore(storeId as string,imageIdArr,fileName)
        .then((res) => {
            toast.success(res.data.message)
            loadSingleStore()
        })
        .catch((err:AxiosError) => {
            toast.error(err.response?.data as string)
        })
    }
    
    

    return (
    <>
      <div className={` ${openDrawer?.drawer && openDrawer.drawer ? "md:ml-[15rem]" : ""}  p-6 w-[100%] h-full transition-all`}>
          <div className="bg-white min-h-[90vh] h-[full] mx-auto w-[80%] mt-[3.5rem] p-20">
            <h6 className="text-4xl text-center font-bold text-black">Upload Image To {state.singleStore?.storeName} Store</h6>
            <div>
                <Grid>
                <Grid item xs={12} mt={8}>
                    <form onSubmit={handleSubmit}>
                    <h6 className="text-2xl font-semibold mb-2">Upload Image For Store</h6>
                    <div className="text-white  w-full p-4">
                        {/* <input type={"file"} multiple={true} className="bg-[#978351] w-full" onChange={handleImageChange} /> */}
                        <input 
                            onChange={handleImageChange}
                            multiple={true}
                            type="file" 
                            className="block w-full text-lg text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-lg file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100
                            "/>
                        </div>
                    <div className="flex gap-8 flex-wrap flex-1 ">
                    {state.imageURLs?.map((imageSrc:string, idx:number) => (
                        <div key={idx} className="relative max-w-[13rem] max-h-[20rem] mt-4">
                        <img src={imageSrc} className="w-full h-full rounded-lg " />
                        <div className="absolute top-0 right-0 z-50 text-red-500 cursor-pointer" onClick={() => handleRemoveImage(idx)}>
                            <CloseOutlinedIcon/>
                        </div>
                        </div>
                    ))}
                    </div>
       
                   <div className="text-center">
                   <button type={"submit"} onClick={handleSubmitDeleteImage} className="hover:bg-[#758867] text-white mt-4 bg-[#6E845D] rounded-md px-4 py-2 leading-6 shadow-md text-lg font-normal hover:shadow-xl"> 
                        Submit
                    </button>
                   </div>
                    </form>
                </Grid>
                </Grid>
                <hr className="my-8 border-slate-600"/>
                <Grid item xs={12} >
                    <h6 className="text-2xl font-semibold mb-2">Delete Image That Is Exist In Database</h6>
                    <div className="flex gap-4 mt-8 flex-1 flex-wrap">
                    {state.singleStore?.imageData.map((img,i) => (
                        <div key={i} className="max-w-[13rem] max-h-[20rem] relative object-cover">
                             <img src={`${img.urlImage}`} 
                             className={`w-full h-full  ${checkId(img._id) && "border-2 border-indigo-500"}`} 
                             
                             key={i}/>
                             <div className="absolute top-0 right-0 z-50 text-red-500 cursor-pointer" onClick={() => handleRemoveImageFromDb(img._id)}>
                             <CloseOutlinedIcon/>
                         </div>
                        </div>
                    ))}
                    </div>
                    <div className="mt-4 text-center">
                        <button type={"button"} onClick={handleSubmitDeleteImage} className="hover:bg-[#758867] text-white bg-[#6E845D] rounded-md px-4 py-2 leading-6 shadow-md text-lg font-normal hover:shadow-xl"> 
                        Delete All Image Selected
                        </button>
                    </div>
                </Grid>


                {/* <img
                src="http://localhost:5000/uploads\\2022-11-13T08-48-19.827ZSummary&sweet alert.jpg"
                /> */}
            </div>

            

          </div>
        </div>
    </>
    )
}