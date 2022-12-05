import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from "react-paginate"
import TextField from '@mui/material/TextField';

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
    const[userId,setUserId]=useState("")
    const[id,setId]=useState("")
    const[title,setTitle]=useState("")
    // const[active,setActive]=useState(true)
    const[validation,setValidation]=useState(false)

    // const navigate=useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log({userId,id,title})
        const data={userId,id,title}
    
        fetch("http://localhost:8000/todos",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(data)
        }).then((res)=>{
                // alert("saved successfully")
            // navigate("/")
            handleClose()
        }).catch((err)=>{
            console.log(err.message)
        })

    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [data, setData] = useState(null)
    const [pagecount, setpageCount] = useState(0)
    const navigate = useNavigate()

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const LoadDetail = (id) => {
        navigate("/todos/detail/" + id)
    }
    const LoadEdit = (id) => {
        navigate("/todos/edit/" + id)
    }

    let limit = 5

    const Removefuntion = (id) => {
        if (window.confirm("Do you want to delete?")) {
            fetch("http://localhost:8000/todos/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert("deleted successfully")
                window.location.reload()
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    // useEffect(() => {
    //     fetch("http://localhost:8000/todos?_page=1&_limit=5").then((res) => {
    //         return res.json()
    //     }).then((resp) => {
    //         setData(resp)
    //     }).catch((err) => {
    //         console.log(err.message)
    //     })
    // },[]) 

    // const handlepagechange=()=>{
    //     console.log("clicked")
    // }

    useEffect(() => {
        const gettodos = async () => {
            const res = await fetch(
                `http://localhost:8000/todos?_page=1&_limit=${limit}`

            );
            const items = await res.json();
            const total = res.headers.get("x-total-count");
            setpageCount((total / limit));
            setData(items);
        };

        gettodos();
    }, [limit]);

    const fetchtodos = async (currentPage) => {
        const res = await fetch(
            `http://localhost:8000/todos?_page=${currentPage}&_limit=${limit}`

        );
        const items = await res.json();
        return items;
    };

    const handlePageclick = async (items) => {
        console.log(items.selected);

        let currentPage = items.selected + 1;

        const todosFormServer = await fetchtodos(currentPage);

        setData(todosFormServer);
        // scroll to the top
        // window.scrollTo(0, 0)
    };
    return (
        <div>
            <Typography
                variant='h2' component='h1' color="primary" gutterBottom align='center'>
                DATA
            </Typography>
            <div className='field'>
                <Button onClick={handleOpen} variant="outlined" >Add new (+)</Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 1200 }} aria-label="customised table" align="center">
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
                                        <a><Button onClick={() => { LoadEdit(item.id) }} variant="contained" color="inherit">Edit</Button></a>
                                        <a><Button onClick={() => { Removefuntion(item.id) }} variant="contained" color="secondary">Remove</Button></a>
                                        <a><Button onClick={() => { LoadDetail(item.id) }} variant="contained" color="primary">Details</Button></a>
                                    </StyledTableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                marginPagesDisplayed={8}
                pageCount={8}
                onPageChange={handlePageclick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <form onSubmit={handleSubmit}>
            <Typography
                variant='h2' component='h1' color="primary" gutterBottom align='center'>
                ADD
            </Typography>
            <div className='field'>
                <TextField  required value={userId} onMouseDown={e=>setValidation(true)} onChange={e=>setUserId(e.target.value)} id="outlined-basic" label="userId" variant="outlined" />
                {userId.length===0 && validation && <span>Enter userId</span>}
                <br />
                <TextField  required value={id} onChange={e=>setId(e.target.value)} id="outlined-basic" label="Id" variant="outlined" /><br />
                <TextField  required value={title} onChange={e=>setTitle(e.target.value)} id="outlined-basic" label="title" variant="outlined" />
                {/* <FormGroup>
                    <FormControlLabel value={active} onChange={e=>setActive(e.target.checked)}control={<Checkbox />} label="isActive" />
                </FormGroup> */}
                <div className='btn'>
                <Button type="submit" variant="outlined">Save</Button>
                <Link to="/">
                <Button onClick={handleClose} variant="outlined">Back</Button>
                </Link>
                </div>
            </div>
            </form>
                    </Box>
                </Modal></div>
        </div>
    )
}
