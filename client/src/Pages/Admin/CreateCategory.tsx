import React, { useState,useEffect,useMemo } from 'react'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import { Button, Grid, Table, TableContainer, TableHead, TableRow, TextField, TableCell ,TableBody,Paper } from '@mui/material';
import { LocalSearch } from '../../Components/LocalSearch';
import utf8 from 'utf8';
import {DeleteCategory, ListAllCategory, PostCreateCategory, UpdateCategory} from "../../Function/category.func"
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import moment from "moment"
type Category = {
  createdAt:string;
  updatedAt:string
  name:string;
  __v:number;
  _id:string;
}

interface StateProps {
  search:string;
  categories:Category[] | [];
  category:string;
  update:string;
  id:string;
  onDisableUpdate:boolean;
}

export const CreateCategory: React.FC = () => {
    
    
    const [state,setState] = useState<StateProps>({
        search:'',
        categories:[],
        category:'',
        update:'',
        id:'',
        onDisableUpdate:true,
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

    const handleCreateCategory = () => {
        PostCreateCategory(state.category)
        .then((res) => {
          loadCategories();
          setState(prev=>({...prev,category:""}));
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
      <div className="md:ml-[15rem] p-6 w-full h-full">
          <div className="bg-white p-8 h-[100vh]">
          <Grid container spacing={2} >
            <Grid item xs={12}>
            <LocalSearch
            title={'Search Category'}
            value={state.search || ''}
            handleChange={handleSearch}
            label={'Search Category'}
            />
            </Grid>

            {/* CREATE CATEGORY */}
            <Grid item xs={9}>
                <TextField 
                fullWidth
                variant='filled'
                label='สร้าง Category'
                value={state.category || ''}
                onChange={(event) => setState({...state,category:event.target.value}) }
                />
            </Grid>

            <Grid item xs={3}>
            <Button 
            variant='contained' 
            color='primary' 
            fullWidth 
            sx={{marginTop:1.2}} 
            onClick={handleCreateCategory}
            disabled={state.category.length < 2}
            >
                
            คลิกเพื่อสร้าง Category
            </Button>
            </Grid>

              {/* START UPDATE CATEGORY */}
            <Grid item xs={9}>
                <TextField 
                fullWidth 
                label='อัพเดต Category'
                variant='filled'
                value={state.update || ''}
                onChange={(event) => setState({...state,update:event.target.value}) }
                disabled={state.onDisableUpdate}
                />
            </Grid>
  
            <Grid item xs={3}>
            <Button 
            variant='contained' 
            color='primary' 
            fullWidth 
            sx={{marginTop:1.2}} 
            onClick={handleSubmitUpdateCategory}
            disabled={state.onDisableUpdate}
            >
            คลิกเพื่อยันยันการอัพเดต
            </Button>
            </Grid>

        {/* END UPDATE CATEGORY */}


             {/* START TABLE CATEGORY */}
        <Grid item xs={12} marginTop={8}>
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
          <TableRow>
            <TableCell  >Categories</TableCell>
            <TableCell  align="right">UpdatedAt</TableCell>
            <TableCell  align="right">CreatedAt</TableCell>
            <TableCell  align="center">แก้ไข</TableCell>
            <TableCell  align="center">ลบ</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {state?.categories && state.categories.filter(searched(state.search)).map((category) => (
            <TableRow key={category.name}>
              <TableCell width='30%' component="th" scope="row">{category.name}</TableCell>
              <TableCell width='15%' align="right">{moment(category.createdAt).locale('eng').format('lll')}</TableCell>
              <TableCell width='15%' align="right">{moment(category.updatedAt).locale('eng').format('lll')}</TableCell>
              <TableCell width='10%' align="center"><Button color='warning' fullWidth variant='contained' onClick={() => handleUpdateCategory(category._id,category.name)} >Edit</Button></TableCell> 
              <TableCell width='10%' align="center"><Button color='error' fullWidth variant='contained' onClick={() => handleRemoveCategory(category._id,category.name)} >Delete</Button></TableCell> 
            </TableRow>
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