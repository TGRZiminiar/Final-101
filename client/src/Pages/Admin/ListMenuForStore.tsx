import { Button, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Axios, AxiosError, AxiosResponse } from 'axios';
import React,{ useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { DeleteImageStore, DeleteMenu, GetUploadImageMenu, PatchAddMenu, UploadImageStoreFunc } from '../../Function/store.func';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useSelector } from 'react-redux';
import { StyledTableCell, StyledTableRow } from '../../Components/Table/table';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import { MenuList } from '../../Interface/store.interface';
import {useNavigate} from "react-router-dom"
import { Menu } from './CreateStore';

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
    storeName:string;
    menuList:MenuList[];
    
    text:string;
    price:number;
    menu:Menu[];

    images:File[];
    imageURLs:any;
}

export const ListMenuForStore: React.FC = () => {
    const navigate = useNavigate();
    const {storeId} = useParams();
    //@ts-ignore
    const openDrawer = useSelector(state => state.drawer);

    const [state,setState] = useState<StateProps>({
        storeName:"",
        menuList:[],

        text:"",
        price:0,
        menu:[],

        images:[],
        imageURLs:[],

    })

    const loadSingleStore = async() => {

        await GetUploadImageMenu(storeId as string)
        .then((res:AxiosResponse) => {
            const {storeName, menuList} = res.data.store;
            setState(prev => ({...prev,storeName:storeName as string, menuList:menuList}))
        }) 
        .catch((err:AxiosError) => {
            toast.error(err.response?.data as string)
          })
    }

 

    useEffect(() => {
        loadSingleStore()
    },[])

    console.log(state)

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // await UploadImageStoreFunc(storeId as string,state.images)
        // .then((res:AxiosResponse) => {
        //     //@ts-ignore
        //     console.log(res)
        //     //@ts-ignore
        //     toast.success("Upload Image Success")
        //     setState(prev => ({...prev,images:[],imageURLs:[],}))
        //     loadSingleStore()
        // })
        // .catch((err:AxiosError) => {
        //     toast.error(err.response?.data as string)
        // })
        
    }


    // const handleSubmitDeleteImage = async() => {
    //     const {imageIdArr,singleStore} = state;
    //     let fileName:string[] = [];

    //     if(!singleStore || !imageIdArr){
    //         return toast.error("Something Wronge Please Refresh Page")
    //     }

    //     for (let i = 0; i < singleStore.imageData.length; i++) {
    //         // console.log(singleStore.imageData[i])
    //         for (let j = 0; j < imageIdArr.length; j++) {
    //             if(imageIdArr[j] === singleStore.imageData[i]._id){
    //                 fileName.push(singleStore.imageData[i].filename)
    //             }                
    //         }            
    //     }

    //     await DeleteImageStore(storeId as string,imageIdArr,fileName)
    //     .then((res) => {
    //         toast.success(res.data.message)
    //         loadSingleStore()
    //     })
    //     .catch((err:AxiosError) => {
    //         toast.error(err.response?.data as string)
    //     })
    // }
    

  const handleSwapUp = (index:number) => {
        const tempMenu:MenuList[] = state.menuList;
        if(index-1 < 0){
            let temp = tempMenu[index];
            tempMenu[index] = tempMenu[tempMenu.length-1];
            tempMenu[tempMenu.length-1] = temp;
        }
        else {
            let temp = tempMenu[index];
            tempMenu[index] = tempMenu[index-1];
            tempMenu[index-1] = temp;
        }

        setState(prev => ({...prev,menuList:tempMenu}))
    }

  const handleSwapDown = (index:number) => {
        const tempMenu:MenuList[] = state.menuList;
        if(index+1 > tempMenu.length-1){
            let temp = tempMenu[index];
            tempMenu[index] = tempMenu[0];
            tempMenu[0] = temp;
        }
        else {
            let temp = tempMenu[index];
            tempMenu[index] = tempMenu[index+1];
            tempMenu[index+1] = temp;
        }

        setState(prev => ({...prev,menuList:tempMenu}))
    }

    
  const handleRemoveMenu = (index:number) => {
      const tempState = state.menu;
      tempState.splice(index,1);
      setState(prev => ({...prev,menu:tempState}));
    }

  const handleAddMenu = async() => {
      // const objToPush = state.menu;
      // const tempObject:Menu = {"text":state.text,"price":state.price};
      // objToPush.push(tempObject);
      
      await PatchAddMenu(storeId as string,state.images,state.price,state.text)
      .then((res) => {
        console.log(res.data)
        setState(prev => ({...prev, text:"", price:0,images:[],imageURLs:[]}));
        toast.success("Add Menu Success")
      })
      .catch((err) => {
        toast.error("Try Again Please")
      })

    }


  const handleRemove = async(menuId:string) => {
        await DeleteMenu(storeId as string, menuId, state?.menuList[0].urlImage || "")
        .then((res:AxiosResponse) => {
            toast.success("Remove Menu Success");
        })
        .catch((err:AxiosError) => {
            toast.error("Remove Menu Error Try Again");
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


    return (
    <>
      <div className={` ${openDrawer?.drawer && openDrawer.drawer ? "md:ml-[15rem]" : ""}  p-6 w-[100%] h-full transition-all`}>
          <div className="bg-white min-h-[90vh] h-[full] mx-auto w-[80%] mt-[3.5rem]">
            <div className="bg-[#857F7F] p-4 mb-12"> 
                <h6 className="text-4xl text-center font-bold text-white ">Edit Menu To {state?.storeName} </h6>
            </div>


            <div className="bg-[#857F7F] text-white p-3 self-center mb-8">
            <h6 className="text-2xl font-bold">Add Menu</h6>
         </div>
            
        <div className="px-20">
        <div className="grid grid-cols-2 gap-12">
                    <div>
                        <h6 className="text-xl font-semibold ">Menu Name</h6>
                        <TextField
                        fullWidth
                        variant="filled"
                        placeholder="Ex. Fried rice"
                        value={state.text}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev=> ({...prev, text:e.target.value}))}
                        
                        />
                    </div>
                    <div>
                        <h6 className="text-xl font-semibold ">Price</h6>
                        <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        placeholder="Ex. 08.00-12.00"
                        value={state.price}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev=> ({...prev, price:Number(e.target.value)}))}
                        sx={{mb:4}}
                        />
                    </div>
                  <div className="grid">
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
                  </div>
                </div>

                <div className="mb-6 text-center">
                <button type={"button"} onClick={handleAddMenu} className="hover:bg-[#6a7d5b] text-white bg-[#6E845D] rounded-md px-8 py-6 leading-6 shadow-md text-xl font-bold hover:shadow-xl"> 
                    Click To Add Menu To Store
                </button>
                
                </div>
          </div>

    <TableContainer  className="px-20 ">
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Image</StyledTableCell>
            <StyledTableCell align="center">Menu</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Swap Up</StyledTableCell>
            <StyledTableCell align="center">Swap Down</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state?.menuList.map((menu,i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                <div className="w-[6rem] h-[6rem]">
                <img
                className="w-full h-full object-cover"
                src={menu?.urlImage || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/ProhibitionSign2.svg/1200px-ProhibitionSign2.svg.png"}
                />
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                {menu.text}
              </StyledTableCell>
              <StyledTableCell align="center">{menu.price}</StyledTableCell>
              <StyledTableCell align="center" width="11%"><KeyboardDoubleArrowUpOutlinedIcon className="cursor-pointer" onClick={() => {}}/></StyledTableCell>
              <StyledTableCell align="center" width="11%"><KeyboardDoubleArrowDownOutlinedIcon className="cursor-pointer" onClick={() => {}} /></StyledTableCell>
              <StyledTableCell align="center" width="10%">
              <button type={"button"} onClick={() => navigate(`/admin/edit-menu/${storeId}/menu/${menu._id}`)} className="hover:bg-[#5e744d] text-white bg-[#6E845D] rounded-md px-4 py-2 leading-6 shadow-md text-sm font-normal hover:shadow-xl"> 
                    Edit
                </button>
              </StyledTableCell>
              <StyledTableCell align="center" width="10%">
              <button type={"button"} onClick={() => handleRemove(menu._id!)} className="hover:bg-[#b49e66] text-white bg-[#CCAF63] rounded-md px-4 py-2 leading-6 shadow-md text-sm font-normal hover:shadow-xl"> 
                    Remove
                </button>
              </StyledTableCell>
            </StyledTableRow>
          ))} 
        </TableBody>
      </Table>
    </TableContainer>
            
         

          </div>
        </div>
    </>
    )
}