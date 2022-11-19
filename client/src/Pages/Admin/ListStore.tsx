import React,{useEffect,useState} from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { GetStore,DeleteStore } from '../../Function/store.func';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { StyledTableCell, StyledTableRow } from '../../Components/Table/table';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "./CreateStore.css"
interface Store {
  _id:string;
  storeName:string
  category:Category[]
}

type Category = {
  _id:string;
  name:string;
}

interface StateProps {
  stores:Store[] | never[]
}

export const ListStore: React.FC = () => {
  //@ts-ignore
  const openDrawer = useSelector(state => state.drawer)
  const navigate = useNavigate();
  const [state,setState] = useState<StateProps>({
    stores:[],
  })

  const loadStore = async() => {
    await GetStore()
    .then((res:AxiosResponse) => {
        setState(prev => ({...prev, stores:res.data.store as Store[]}))
    })
  }

  useEffect(() => {
    loadStore();
  }, [])
  
  // console.log(typeof state.stores) antwanashcraft@gmail.com Ahsan@5588

  const handleUpload = (storeId:string) => {
    navigate(`/admin/upload-image/${storeId}`);
  }

  const handleEdit = (storeId:string) => {
    navigate(`/admin/edit/${storeId}`);
  }

  const handleRemoveStore = async(storeId:string, storeName:string) => {
    if(window.confirm(`You want to delete ${storeName}`)){
      await DeleteStore(storeId)
      .then((res:AxiosResponse) => {
        loadStore();
        toast.success(`Remove ${storeName} success`);
      })
      .catch((err:AxiosError) => {
        toast.error(`Something Went Wronge Try Again Later`);
      })
    }
  } 

  const handleImageHeader = (storeId:string) => {
    navigate(`/admin/upload-image-header/${storeId}`);

  }

    return (
    <>
     <div className={` ${openDrawer?.drawer && openDrawer.drawer ? "md:ml-[15rem]" : ""}  py-6 w-[100%] h-full transition-all`}>
          <div className="bg-white min-h-[90vh] h-[full] mx-auto w-full md:w-[80%] mt-[3.5rem] ">
          <div className="bg-[#857F7F] p-4 mb-12"> 
            <h6 className="text-4xl text-center font-bold text-white ">All Store Data</h6>
            </div>

          <div className="md:px-16">

            <TableContainer component={Paper} className="bar overflow-auto">
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>StoreName</StyledTableCell>
                  <StyledTableCell align="center">Category</StyledTableCell>
                  <StyledTableCell align="center">Edit</StyledTableCell>
                  <StyledTableCell align="center">Image Header</StyledTableCell>
                  <StyledTableCell align="center">Image Store</StyledTableCell>
                  <StyledTableCell align="center">Edit Menu</StyledTableCell>
                  <StyledTableCell align="center">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.stores && state.stores.map((store,i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row">
                      {store.storeName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                    {store.category.map((cate,i) => (
                      <h6 key={i}>
                      {cate.name} {i % 2 === 1 && ","}
                    </h6>
                        ))}
                      </StyledTableCell>
                    {<StyledTableCell align="center" width="10%">
                      <button type={"button"} onClick={() => handleEdit(store._id)} className="hover:bg-[#5a7049] text-white bg-[#6E845D] rounded-md px-4 py-2 leading-6 shadow-md text-sm font-normal hover:shadow-xl"> 
                        Edit
                    </button>
                      </StyledTableCell>}

                    <StyledTableCell align="center" width="13%">
                      <button type={"button"} onClick={() => handleImageHeader(store._id)} className="hover:bg-amber-800 text-white bg-amber-700 rounded-md px-4 py-2 leading-6 shadow-md text-sm font-normal hover:shadow-xl"> 
                      Header
                    </button>
                      </StyledTableCell>

                    <StyledTableCell align="center" width="13%">
                      <button type={"button"} onClick={() => handleUpload(store._id)} className="hover:bg-[#9b6a4e] text-white bg-[#B57B5A] rounded-md px-4 py-2 leading-6 shadow-md text-sm font-normal hover:shadow-xl"> 
                      Store
                    </button>
                      
                      </StyledTableCell>
                   
                    <StyledTableCell align="center" width="15%">
                      <button type={"button"} onClick={() => navigate(`/admin/upload-image-menu/${store._id}`)} className="hover:bg-[#a29191] text-white bg-[#857F7F] rounded-md px-4 py-2 leading-6 shadow-md text-sm font-normal hover:shadow-xl"> 
                      Menu
                    </button>
                      
                      </StyledTableCell>

                    <StyledTableCell align="center" width="10%"> 
                    <button type={"button"} onClick={() => handleRemoveStore(store._id, store.storeName)} className="hover:bg-[#b49e66] text-white bg-[#CCAF63] rounded-md px-4 py-2 leading-6 shadow-md text-sm font-normal hover:shadow-xl"> 
                        Delete
                    </button>
                    </StyledTableCell>
                  </StyledTableRow>
               ))}
              </TableBody>
            </Table>
          </TableContainer>
          </div>

          </div>
        </div>
    </>
    )
}