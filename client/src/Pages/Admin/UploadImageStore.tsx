import { Button, Grid } from '@mui/material';
import { Axios, AxiosError, AxiosResponse } from 'axios';
import React,{ useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { DeleteImageStore, GetSingleStoreForUploadImage, UploadImageStoreFunc } from '../../Function/store.func';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface SingleStore {
    storeName:string;
    imageData:ImageData[] | never[]
}

type ImageData = {
    filename:string;
    contentType:string;
    imageBase64:string;
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
        await UploadImageStoreFunc(storeId as string,state.images)
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

        if(!singleStore || !imageIdArr){
            return toast.error("Something Wronge Please Refresh Page")
        }

        for (let i = 0; i < singleStore.imageData.length; i++) {
            // console.log(singleStore.imageData[i])
            for (let j = 0; j < imageIdArr.length; j++) {
                if(imageIdArr[j] === singleStore.imageData[i]._id){
                    fileName.push(singleStore.imageData[i].filename)
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
      <div className="md:ml-[15rem] p-6 w-full h-full">
          <div className="bg-white p-20 h-[full] min-h-[95vh]">
            <h6 className="text-4xl text-center font-bold text-indigo-500">Upload Image To {state.singleStore?.storeName} Store</h6>
            <div>
                <Grid>
                <Grid item xs={12} mt={8}>
                    <form onSubmit={handleSubmit}>
                    <h6 className="text-2xl font-semibold mb-2">Upload Image For Store</h6>
                    <div className="text-gray-400 bg-slate-700 w-full p-4">
                        <input type={"file"} multiple={true} className="bg-slate-800 w-full" onChange={handleImageChange} />
                    </div>
                    <div className="flex gap-8 ">
                    {state.imageURLs?.map((imageSrc:string, idx:number) => (
                        <div key={idx} className="relative max-w-[10rem] max-h-[20rem] mt-4">
                        <img src={imageSrc} className="w-full h-full rounded-lg " />
                        <div className="absolute top-0 right-0 z-50 text-red-500 cursor-pointer" onClick={() => handleRemoveImage(idx)}>
                            <CloseOutlinedIcon/>
                        </div>
                        </div>
                    ))}
                    </div>
                    <Button type="submit" variant="contained" color="success" sx={{mt:4}}>
                        Submit
                    </Button>
                    </form>
                </Grid>
                </Grid>
                <hr className="my-8 border-slate-600"/>
                <Grid item xs={12} >
                    <h6 className="text-2xl font-semibold mb-2">Delete Image That Is Exist In Database</h6>
                    <div className="flex gap-4 mt-8 flex-1">
                    {state.singleStore?.imageData.map((img,i) => (
                        <div key={i} className="max-w-[10rem] max-h-[20rem] relative object-cover">
                             <img src={`data:${img.contentType};base64,${img.imageBase64 as string}`} 
                             className={`w-full h-full  ${checkId(img._id) && "border-2 border-indigo-500"}`} 
                             
                             key={i}/>
                             <div className="absolute top-0 right-0 z-50 text-red-500 cursor-pointer" onClick={() => handleRemoveImageFromDb(img._id)}>
                             <CloseOutlinedIcon/>
                         </div>
                        </div>
                    ))}
                    </div>
                    <div className="mt-4">
                        <Button variant="contained" color="success" onClick={handleSubmitDeleteImage}>
                            Delete All Image Selected
                        </Button>
                    </div>
                </Grid>

            </div>

            

          </div>
        </div>
    </>
    )
}