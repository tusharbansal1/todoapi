import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


export default function Data() {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch("http://localhost:8000/todos").then((res) => {
            return res.json()
        }).then((resp) => {
            setData(resp)
        }).catch((err) => {
            console.log(err.message)
        })
    },[]) 
    return (
        <div>
            <Typography
                variant='h2' component='h1' color="primary" gutterBottom align='center'>
                DATA
            </Typography>
            <div>
                <Link to="todos/create" className="add">Add new (+)</Link>
                </div>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 900 }} aria-label="customised table" align="center">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>UserId</StyledTableCell>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data && data.map(item => (
                                <TableRow key={item.id}>
                                    <StyledTableCell>{item.userId}</StyledTableCell>
                                    <StyledTableCell>{item.id}</StyledTableCell>
                                    <StyledTableCell>{item.title}</StyledTableCell>
                                    <StyledTableCell>
                                        <a><Button variant="contained" color="inherit">Edit</Button></a>  
                                        <a><Button variant="contained" color="secondary">Remove</Button></a>
                                    </StyledTableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
