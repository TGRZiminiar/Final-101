import React, { useState,useEffect,useMemo } from 'react'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button, Grid, Table, TableContainer, TableHead, TableRow, TextField,TableBody,Paper } from '@mui/material';
import { LocalSearch } from '../../Components/LocalSearch';
import utf8 from 'utf8';
import {DeleteCategory, ListAllCategory, PostCreateCategory, UpdateCategory} from "../../Function/category.func"
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import moment from "moment"
import { useSelector } from 'react-redux';
import { StyledTableCell, StyledTableRow } from '../../Components/Table/table';


type Category = {
  createdAt:string;
  updatedAt:string
  name:string;
  __v:number;
  _id:string;
  categoryImage:string;
}

interface StateProps {
  search:string;
  categories:Category[] | [];
  category:string;
  update:string;
  id:string;
  onDisableUpdate:boolean;
  images:File[];
  imageURLs:any;
}

export const CreateCategory: React.FC = () => {
    //@ts-ignore
    const openDrawer = useSelector(state => state.drawer)
    
    const [state,setState] = useState<StateProps>({
        search:'',
        categories:[],
        category:'',
        update:'',
        id:'',
        onDisableUpdate:true,
        images:[],
        imageURLs:[],
    })

    const loadCategories = async() => {
      await ListAllCategory()
      .then(res => setState((prev) => ({...prev,categories:res.data.category!})))
      .catch((err:AxiosError) => {
        toast.error(err.response?.data as string)
      })
    }

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({...prev,search:e.target.value}));
    }

    const handleCreateCategory = async() => {
        await PostCreateCategory(state.category,state.images)
        .then((res) => {
          loadCategories();
          setState(prev=>({...prev,category:"",images:[], imageURLs:[]}));
        })

    }

    const handleSubmitUpdateCategory = () => {
      if(window.confirm(`Update ${state.update} Right?`)){
        // e.preventDefault()
        /*  Function to update Category  */
        UpdateCategory(state.id,state.update)
        .then(res=>{
          toast.success(`You have been updated ${state.update} success`);
          loadCategories();
          setState(prev=>({...prev,update:'', onDisableUpdate:!prev.onDisableUpdate}))
        })
        .catch((err:AxiosError) => {
          toast.error(err.response?.data as string)
        })
      }
    }

    const handleUpdateCategory = (id:string,categoryName:string) => {
      setState(prev => ({...prev,update:categoryName,id:id, onDisableUpdate:!prev.onDisableUpdate}));
    }

    const handleRemoveCategory = (id:string,name:string) => {
      if(window.confirm(`Delete Category : ${(name)} ?`)){
        // remove category function
        DeleteCategory(id)
        .then(res=>{
            toast.success(`Deleted ${name} Success`);
            loadCategories();
          })
        .catch((err:AxiosError) => {
          toast.error(err.response?.data as string)
        })
        }
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
      setState(prev => ({...prev,images:[], imageURLs:[]}));
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
      loadCategories()
    }, [])

    useEffect(() => {
      if(state.update === ''){
        if(state.onDisableUpdate === false){
          setState(prev=>({...prev,onDisableUpdate:!prev.onDisableUpdate}))
        }
      }
    }, [state.update])
    
    

    const searched = useMemo(() => (search:string) => (category:Category) => category.name.includes(search), [state.search])


    return (
    <>
      <div className={` ${openDrawer?.drawer && openDrawer.drawer ? "md:ml-[15rem]" : ""}  p-6 w-[100%] h-full transition-all`}>
          <div className="bg-white min-h-[90vh] h-[full] mx-auto w-[80%] mt-[3.5rem]">
          <Grid container spacing={6}>
            <Grid item xs={12}>
            <div className="bg-[#857F7F] p-4 mb-12"> 
            <h6 className="text-4xl text-center font-bold text-white ">Create Category</h6>
            </div>
           
            </Grid>

            {/* CREATE CATEGORY */}
            <Grid item xs={9} >
              <div className="pl-16">
                <TextField 
                fullWidth
                variant='filled'
                label='Create Category'
                value={state.category || ''}
                onChange={(event) => setState({...state,category:event.target.value}) }
                />
              </div>
            </Grid>

            <Grid item xs={3}>
            <div className="pr-16">
            <Button 
            variant='contained' 
            color='primary' 
            fullWidth 
            sx={{marginTop:1.2}} 
            onClick={handleCreateCategory}
            disabled={state.category.length < 2}
            >
                
            Create Category
            </Button>
            </div>
            </Grid>

            <Grid item xs={12}>
            <div className={`pl-16 max-h-[25rem]`}>
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
                {state.imageURLs?.map((imageSrc:string, idx:number) => (
                        <div key={idx} className="relative max-w-[13rem] h-[20rem] mt-4">
                        <img src={imageSrc} className="w-full h-full rounded-lg " />
                        <div className="absolute top-0 right-0 z-50 text-red-500 cursor-pointer" onClick={() => handleRemoveImage(idx)}>
                            <CloseOutlinedIcon/>
                        </div>
                        </div>
                    ))}
            </div>
            </Grid>

              {/* START UPDATE CATEGORY */}
            <Grid item xs={12}>
              <div className="bg-[#857F7F] p-4 mb-12"> 
                <h6 className="text-4xl text-center font-bold text-white ">Update Category</h6>
              </div>
            </Grid>
            <Grid item xs={9}>
              <div className="pl-16">
              <TextField 
                fullWidth 
                label='Update Category'
                variant='filled'
                value={state.update || ''}
                onChange={(event) => setState({...state,update:event.target.value}) }
                disabled={state.onDisableUpdate}
                />
              </div>
            </Grid>
  
            <Grid item xs={3}>
            <div className="pr-16">
            {/* <button 
            type={"button"} 
            onClick={handleSubmitUpdateCategory} 
            className="hover:bg-[#6a7d5b] cursor-pointer disabled:bg-black disabled:opacity-10 text-gray-300 bg-[#6E845D] self-center rounded-md px-4 py-2 leading-6 shadow-md text-md font-semibold hover:shadow-xl"
            disabled={state.onDisableUpdate}
            > 
                  <p>Submit Updated Category</p>
            </button> */}
            
              <Button 
              variant='contained' 
              color='primary' 
              fullWidth 
              sx={{marginTop:1.2}} 
              onClick={handleSubmitUpdateCategory}
              disabled={state.onDisableUpdate}
              >
              Submit Updated
              </Button>
            </div>
            </Grid>

        {/* END UPDATE CATEGORY */}

             {/* START TABLE CATEGORY */}
        <Grid item xs={12} marginTop={8} mx={4}>
            <Grid item xs={12} mb={4}>
            <div className="px-16">
            <LocalSearch
            title={''}
            value={state.search || ''}
            handleChange={handleSearch}
            label={'Search Category'}
            />
            </div>
            </Grid>
        <TableContainer component={Paper}>
          <Table>
          <TableHead className="bg-[#857F7F]">
          <TableRow>
            <StyledTableCell  >Categories</StyledTableCell>
            <StyledTableCell  align="right">UpdatedAt</StyledTableCell>
            <StyledTableCell  align="right">CreatedAt</StyledTableCell>
            <StyledTableCell  align="center">แก้ไข</StyledTableCell>
            <StyledTableCell  align="center">ลบ</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody >
          {state?.categories && state.categories.filter(searched(state.search)).map((category) => (
            <StyledTableRow key={category.name}>
              <StyledTableCell width='30%' component="th" scope="row">{category.name}</StyledTableCell>
              <StyledTableCell width='15%' align="right">{moment(category.createdAt).locale('eng').format('lll')}</StyledTableCell>
              <StyledTableCell width='15%' align="right">{moment(category.updatedAt).locale('eng').format('lll')}</StyledTableCell>
              <StyledTableCell width='10%' align="center">
                <button type={"button"} onClick={() => handleUpdateCategory(category._id,category.name)} className="hover:bg-[#6b7c5f] text-white bg-[#6E845D] rounded-md px-4 py-2 leading-6 shadow-md text-sm font-normal hover:shadow-xl"> 
                    Edit
                </button>
                </StyledTableCell> 
              <StyledTableCell width='10%' align="center">
              <button type={"button"} onClick={() => handleRemoveCategory(category._id,category.name)} className="hover:bg-[#b49e66] text-white bg-[#CCAF63] rounded-md px-4 py-2 leading-6 shadow-md text-sm font-normal hover:shadow-xl"> 
                    Delete
                </button>
                </StyledTableCell> 
            </StyledTableRow>
          ))}
        </TableBody>
            </Table>
        </TableContainer>
        </Grid>



        {/* END TABLE CATEGORY */}


        </Grid>

          </div>
        </div>
    </>
    )
}