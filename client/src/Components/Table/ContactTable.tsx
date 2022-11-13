import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { Contact } from '../../Pages/Admin/CreateStore';
import { StyledTableCell, StyledTableRow } from './table';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';

interface ContactTableInterface {
  datas:Contact[];
  handleRemove:(i:number) => void;
  title:string;
  subtitle:string;
  handleSwapUp:(i:number) => void;
  handleSwapDown:(i:number) => void;
}

export const ContactTable: React.FC<ContactTableInterface> = ({handleRemove, datas, title, subtitle, handleSwapDown, handleSwapUp}) => {
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{title}</StyledTableCell>
            <StyledTableCell align="center">{subtitle}</StyledTableCell>
            <StyledTableCell align="center">Swap Up</StyledTableCell>
            <StyledTableCell align="center">Swap Down</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.map((data,i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {data.platform}
              </StyledTableCell>
              <StyledTableCell align="center">{data.link}</StyledTableCell>
              <StyledTableCell align="center" width="11%"><KeyboardDoubleArrowUpOutlinedIcon className="cursor-pointer" onClick={() => handleSwapUp(i)}/></StyledTableCell>
              <StyledTableCell align="center" width="11%"><KeyboardDoubleArrowDownOutlinedIcon className="cursor-pointer" onClick={() => handleSwapDown(i)} /></StyledTableCell>
              <StyledTableCell align="center" width="10%">
              <button type={"button"} onClick={() => handleRemove(i)} className="hover:bg-[#b49e66] text-white bg-[#CCAF63] rounded-md px-4 py-2 leading-6 shadow-md text-sm font-normal hover:shadow-xl"> 
                    Remove
                </button>
                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
