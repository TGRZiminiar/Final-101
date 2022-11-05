import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { CheckBox, TimeOpen } from '../../Pages/Admin/CreateStore';

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


interface CheckBoxTableInterface {
  datas:CheckBox[];
  handleRemove:(i:number) => void;
  title:string;
  subtitle:string;
}

export const CheckBoxTable: React.FC<CheckBoxTableInterface> = ({handleRemove,datas,title,subtitle}) => {
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{title}</StyledTableCell>
            <StyledTableCell align="center">{subtitle}</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
            {/* <StyledTableCell align="right">Delete</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.map((data,i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {data.text}
              </StyledTableCell>
              <StyledTableCell align="center">{String(data.check)}</StyledTableCell>
              {/* <StyledTableCell align="right"><Button color='warning' fullWidth variant='contained' onClick={() => handleEdit(i)} >Edit</Button></StyledTableCell> */}
              <StyledTableCell align="center" width="10%"><Button color='error' fullWidth variant='contained' onClick={() => handleRemove(i)} >Remove</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
