import { Grid, TextField } from '@mui/material';
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { MenuList } from '../../Interface/store.interface';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { GetSingleMenu, UploadImageMenuFunc } from '../../Function/store.func';


interface StateProps {
    storeName:string;
    menuName:string;
    price:number,
    menuList:MenuList[];
    images:File[];
    imageURLs:any;
    imageIdArr:string[] | null;
    currentUrl:string;
}

interface FetchData {
    menuList:{
        price:number;
        text:string;
        _id:string;
        contentType?:string;
        urlImage?:string;
    }
}

export const EditMenu: React.FC = () => {
   
    //@ts-ignore
    const openDrawer = useSelector(state => state.drawer);
    const {storeId,menuId} = useParams();

    const [state,setState] = useState<StateProps>({
        storeName:"",
        menuName:"",
        price:0,
        menuList:[],
        images:[],
        imageURLs:[],
        imageIdArr:null,
        currentUrl:"",

    })

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

    const loadSingleMenu = async() => {
        await GetSingleMenu(storeId as string, menuId as string)
        .then((res:AxiosResponse) => {
            const data = res.data.menu as FetchData;
            setState(prev => ({...prev, menuName:data.menuList.text, price:data.menuList.price,currentUrl:data.menuList.urlImage as string}))
        })
        .catch((err:AxiosResponse) => {
            toast.error("Something Went Wronge")
        })
    }

    const handleChangeMenuImage = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await UploadImageMenuFunc(storeId as string, menuId as string, state.images, state.currentUrl, String(state.price), state.menuName)
        .then((res) => {
            toast.success("Upload Image Success");
            loadSingleMenu();
        })        
        .catch((err) => {
            toast.error("Upload Error Try Again");
        })
        
    }

    const handleRemoveImageFromDb = () => {

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
        loadSingleMenu();

    },[])

    console.log(state)


    return (
    <>
    <div className={` ${openDrawer?.drawer && openDrawer.drawer ? "md:ml-[15rem]" : ""}  p-6 w-[100%] h-full transition-all`}>
          <div className="bg-white   h-[full] mx-auto w-[80%] mt-[3.5rem] min-h-[100vh]">
            <div className="bg-[#857F7F] p-4 mb-16"> 
                <h6 className="text-4xl text-center font-bold text-white ">Update Store Data</h6>
            </div>

            <Grid container spacing={8} className="px-20" >
                <Grid item xs={6} >
                   <div>
                   <h6 className="text-xl font-semibold">Menu Name</h6>
                    <TextField
                        fullWidth
                        variant="filled"
                        placeholder="Ex. Fried rice"
                        value={state.menuName}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev=> ({...prev, menuName:e.target.value}))}
                        
                        />
                   </div>
                </Grid>
                <Grid item xs={6} >
                   <div>
                   <h6 className="text-xl font-semibold">Price</h6>
                    <TextField
                        fullWidth
                        variant="filled"
                        placeholder="Ex. 50"
                        type={"number"}
                        value={state.price}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev=> ({...prev, price:Number(e.target.value)}))}
                        
                        />
                   </div>
                </Grid>
                <Grid item xs={12}>
                <h6 className="text-lg font-semibold mb-2 text-gray-400">If you want to change menu image please upload in change menu image</h6>
                <h6 className="text-2xl font-semibold mb-8">Current Menu Image</h6>
                  {state?.currentUrl ?
                <div className=" w-[10rem] h-[20rem]">
                    <img
                    className="w-full h-full object-fill"
                    src={`${state?.currentUrl}`}
                    />     
                </div>
                    :
                    <h6 className="text-xl text-red-400 mb-8">You didn't have Upload Image For This Menu Yet</h6>
                }        

                <form id="changeMenu" onSubmit={handleChangeMenuImage}>
                <hr className="border-1 mt-8 border-gray-500" />
                <h6 className="text-2xl mt-8 font-semibold mb-2">Change Menu Image / Upload Menu Image</h6>
                <h6 className="text-lg font-semibold mb-8 text-gray-400">Only 1 Image Is Allow</h6> 
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
                    <div className="text-center py-8">
                   <button type={"submit"} form="changeMenu" className="w-full hover:bg-[#758867] text-white mt-4 bg-[#6E845D] rounded-md px-4 py-2 leading-6 shadow-md text-lg font-normal hover:shadow-xl"> 
                        Submit
                    </button>
                   </div>
                </form>
                </Grid>

                

            </Grid>

        </div>
    </div>
    </>
    )
}