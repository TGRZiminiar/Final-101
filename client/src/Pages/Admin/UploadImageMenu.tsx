import { Button, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { Axios, AxiosError, AxiosResponse } from 'axios';
import React,{ useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { DeleteImageStore, GetUploadImageMenu, UploadImageStoreFunc } from '../../Function/store.func';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useSelector } from 'react-redux';
import { StyledTableCell, StyledTableRow } from '../../Components/Table/table';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import { MenuList } from '../../Interface/store.interface';

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
    images:File[];
    imageURLs:any;
    imageIdArr:string[] | null;
}

export const UploadImageMenu: React.FC = () => {
    
    const {storeId} = useParams();
    //@ts-ignore
    const openDrawer = useSelector(state => state.drawer);

    const [state,setState] = useState<StateProps>({
        storeName:"",
        menuList:[],
        images:[],
        imageURLs:[],
        imageIdArr:null,
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
    
    return (
    <>
      <div className={` ${openDrawer?.drawer && openDrawer.drawer ? "md:ml-[15rem]" : ""}  p-6 w-[100%] h-full transition-all`}>
          <div className="bg-white min-h-[90vh] h-[full] mx-auto w-[80%] mt-[3.5rem] p-20">
            <h6 className="text-4xl text-center font-bold text-black mb-8">Upload Image To {state?.storeName}</h6>
           
    <TableContainer component={Paper}>
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
          {/* {datas.map((data,i) => ( */}
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                <div className="w-[6rem] h-[6rem]">

                <img
                className="w-full h-full object-cover"
                src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"
                />
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                Menu
              </StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center" width="11%"><KeyboardDoubleArrowUpOutlinedIcon className="cursor-pointer" onClick={() => {}}/></StyledTableCell>
              <StyledTableCell align="center" width="11%"><KeyboardDoubleArrowDownOutlinedIcon className="cursor-pointer" onClick={() => {}} /></StyledTableCell>
              <StyledTableCell align="center" width="10%">
              <button type={"button"} onClick={() => {}} className="hover:bg-[#5e744d] text-white bg-[#6E845D] rounded-md px-4 py-2 leading-6 shadow-md text-sm font-normal hover:shadow-xl"> 
                    Edit
                </button>
              </StyledTableCell>
              <StyledTableCell align="center" width="10%">
              <button type={"button"} onClick={() => {}} className="hover:bg-[#b49e66] text-white bg-[#CCAF63] rounded-md px-4 py-2 leading-6 shadow-md text-sm font-normal hover:shadow-xl"> 
                    Remove
                </button>
              </StyledTableCell>
            </StyledTableRow>
          {/*))}  */}
        </TableBody>
      </Table>
    </TableContainer>
            
         

          </div>
        </div>
    </>
    )
}