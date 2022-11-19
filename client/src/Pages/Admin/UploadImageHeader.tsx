import React,{ useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetDataImageHeader, PatchUploadImageHeader } from '../../Function/store.func';
import { useParams } from "react-router-dom";
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from "react-router-dom";



interface StateProps {
    storeName:string;
    currentUrl:string;
    images:File[];
    imageURLs:any;
    backdropOpen:boolean;
}


export const UploadImageHeader: React.FC = () => {
    //@ts-ignore
    const openDrawer = useSelector(state => state.drawer);
    const navigate = useNavigate();
    const {storeId} = useParams();
    
    
    const [state,setState] = useState<StateProps>({
        storeName:"",
        images:[],
        imageURLs:[],
        currentUrl:"",
        backdropOpen:false,
    })

    const loadData = async() => {
        await GetDataImageHeader(storeId as string)
        .then((res:AxiosResponse | boolean) => {
            if(typeof(res) !== "boolean"){
                // console.log(res.data)
                setState(prev => ({...prev,storeName:res.data.data.storeName, currentUrl:res.data.data.imageHeader.urlImage || ""}))
            }
        })
        .catch((err:AxiosError) => {
            toast.error("Something Went Wronge Try Again");
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
    
        loadData();
        
    }, []);
    
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {images,currentUrl} = state;
        await PatchUploadImageHeader(storeId as string, currentUrl, images)
        .then(async(res:AxiosResponse | boolean) => {
            if(typeof(res) !== "boolean"){
                toast.success("Upload Image Success")
                await loadData();
                setState(prev => ({...prev,backdropOpen:true,images:[],imageURLs:[]}))
            }
        })
        .catch((err:AxiosError) => {
            toast.error("Something Went Wronge Try Again");
        })
    }

    return (
    <>
    
    <div className={` ${openDrawer?.drawer && openDrawer.drawer ? "md:ml-[15rem]" : ""}  py-6 w-[100%] h-full transition-all`}>
          <div className="bg-white min-h-[90vh] h-[full] mx-auto w-full md:w-[80%] mt-[3.5rem]">
                <div className="bg-[#857F7F] p-4 mb-12"> 
                    <h6 className="text-4xl text-center font-bold text-white ">Upload Image Header</h6>
                </div>

            <div className="px-20">
                <h6 className="text-2xl font-semibold mb-6">Current Image Header</h6>
                    {state.currentUrl ? 
                <div className=" max-w-[13rem] max-h-[20rem] object-fill">
                    <img
                    className=" mx-auto w-full h-full border-[1px]"
                    src={state.currentUrl}
                    />
                </div>
                    :
                    <h6 className="text-center text-xl text-semibold text-gray-500 mt-2">You Haven't Upload Image Header Yet</h6>
                }
            </div>

            <hr className="my-8 border-slate-600"/>
            
            <form className="px-20" onSubmit={handleSubmit}>
            <h6 className="text-2xl font-semibold mb-6">Upload Store Image Header</h6>
            <div className="text-white w-full p-4">
                <input 
                    onChange={handleImageChange}
                    multiple={false}
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
                <div className="mt-4 text-center">
                        <button type={"submit"}  className="hover:bg-[#758867] text-white bg-[#6E845D] rounded-md px-4 py-2 leading-6 shadow-md text-lg font-normal hover:shadow-xl"> 
                        Upload Image Header
                        </button>
                    </div>
            </form>

        </div>
    </div>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state.backdropOpen!}
        onClick={() => setState(prev => ({...prev,backdropOpen:!prev.backdropOpen}))}
      >
       <div className="bg-white w-[30vh] h-[50vh] grid gap-1">
            <button 
            onClick={() => navigate("/admin/get-store")}
            type={"button"} 
            className="w-full hover:bg-[#6a7d5b] text-white bg-[#6E845D] px-8 py-6 leading-6 shadow-md text-xl font-bold hover:shadow-xl"> 
                See All Store
            </button>
            <button 
            onClick={() => navigate("/")}
            type={"button"} 
            className="w-full hover:bg-[#6a7d5b] text-white bg-[#6E845D] px-8 py-6 leading-6 shadow-md text-xl font-bold hover:shadow-xl"> 
                Back To Home Page
            </button>
            <button 
            onClick={() => {
                
            }}
            type={"button"} 
            className="w-full hover:bg-[#6a7d5b] text-white bg-[#6E845D] px-8 py-6 leading-6 shadow-md text-xl font-bold hover:shadow-xl"> 
                Stay On This Page
            </button>
        
       </div>
      </Backdrop>
    </>
    )
}