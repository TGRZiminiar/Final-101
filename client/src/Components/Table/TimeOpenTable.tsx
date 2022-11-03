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
import { TimeOpen } from '../../Pages/Admin/CreateStore';

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


interface TimeOpenTableInterface {
  timeOpen:TimeOpen[];
  handleRemove:(i:number) => void;
  title:string
}

export const TimeOpenTable: React.FC<TimeOpenTableInterface> = ({handleRemove,timeOpen,title}) => {
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{title}</StyledTableCell>
            <StyledTableCell align="right">Time Open</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
            {/* <StyledTableCell align="right">Delete</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeOpen.map((time,i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {time.date}
              </StyledTableCell>
              <StyledTableCell align="right">{time.time}</StyledTableCell>
              {/* <StyledTableCell align="right"><Button color='warning' fullWidth variant='contained' onClick={() => handleEdit(i)} >Edit</Button></StyledTableCell> */}
              <StyledTableCell align="right" width="10%"><Button color='error' fullWidth variant='contained' onClick={() => handleRemove(i)} >Remove</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
