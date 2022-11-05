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
import { GetStore } from '../../Function/store.func';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


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

  

    return (
    <>
    <div className="md:ml-[15rem] p-6 w-full h-full">
          <div className="bg-white p-20 h-[full] min-h-[95vh]">
            <h6 className="text-4xl text-center font-bold text-indigo-500 mt-4 mb-8">All Store Data</h6>

            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>StoreName</StyledTableCell>
                  <StyledTableCell align="center">Category</StyledTableCell>
                  <StyledTableCell align="center">Edit</StyledTableCell>
                  <StyledTableCell align="center">Upload Image</StyledTableCell>
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
                    {<StyledTableCell align="center" width="10%"><Button color='warning' fullWidth variant='contained' onClick={() => handleEdit(store._id)} >Edit</Button></StyledTableCell>}
                    <StyledTableCell align="center" width="10%"><Button color='secondary' fullWidth variant='contained' onClick={() => handleUpload(store._id)}  >Upload</Button></StyledTableCell>
                    <StyledTableCell align="center" width="10%"><Button color='error' fullWidth variant='contained'  >Remove</Button></StyledTableCell>
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