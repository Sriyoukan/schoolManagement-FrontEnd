import React from 'react';
import axios from "axios";
import { useState } from "react"
import { Slide } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@mui/x-data-grid';
import MenuItem from '@material-ui/core/MenuItem';
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';


const AdminLibraryPage = () =>{
    const [bookTitle,setBookTitle]= useState('')
    const [author,setAuthor] = useState('')
    const [rate,setRate] = useState(0)
    const [fileName,setFileName] = useState('')
    const [file,setFile] = useState(null)
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)
    const url = 'http://localhost:3000/library'


    const addBook = async () =>{
        try{
            await upload()
            await axios.post(url+'/addBooks',{bookTitle:bookTitle,author:author,arrivalDate:new Date(),rate:rate,fileName:fileName})
            setSuccess(true)
        }catch{
            setError(true)
        }
    }
    const fileHandler = (event) =>{
        setFile(event.target.files[0])
    }
    const upload = async () =>{
        const formData = new FormData()
        formData.append("file",file)
        try{
            const response = await axios.post(url+'/uploadBook',formData)
            setFileName(response.data)
        }catch{
            setError(false)
        }
        

    }

    return (
        <div style={{textAlign:'center'}}>
			
            
            <TextField id="outlined-basic" label="Book Title" variant="outlined" value={bookTitle} style={{marginTop:20}} onChange={(e)=>{setBookTitle(e.target.value)}} />
            <br/>
            <TextField id="outlined-basic" label="Author" variant="outlined" value={author} style={{marginTop:20}} onChange={(e)=>{setAuthor(e.target.value)}} />    
            <br/>
            <TextField id="outlined-basic" label="Rate" variant="outlined" value={rate} style={{marginTop:20}} onChange={(e)=>{setRate(e.target.value)}} />
            <br/>
            <input type="file" name="file" style={{marginTop:20,marginLeft:40}} onChange={fileHandler} />
            <br/>
            <Button variant="contained" color="primary" style={{marginTop:20}} onClick={()=>{addBook()}}>submit</Button>
		</div>
    )
}

export default AdminLibraryPage;