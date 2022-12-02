import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { Link, Navigate, useNavigate } from 'react-router-dom';

export default function Create() {
    const[userId,setUserId]=useState("")
    const[id,setId]=useState("")
    const[title,setTitle]=useState("")
    // const[active,setActive]=useState(true)
    const[validation,setValidation]=useState(false)

    const navigate=useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log({userId,id,title})
        const data={userId,id,title}
    
        fetch("http://localhost:8000/todos",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(data)
        }).then((res)=>{
                alert("saved successfully")
            navigate("/")
        }).catch((err)=>{
            console.log(err.message)
        })

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <Typography
                variant='h2' component='h1' color="primary" gutterBottom align='center'>
                CREATE
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
                <Button variant="outlined">Back</Button>
                </Link>
                </div>
            </div>
            </form>
        </div>
    )
}
