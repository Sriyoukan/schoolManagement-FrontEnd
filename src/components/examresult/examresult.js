import React from 'react';
import axios from "axios";
import { useState } from "react"
import { Slide } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@mui/x-data-grid';
import MenuItem from '@material-ui/core/MenuItem';

const examtypes = [
    {
        value: '',
        label: '',
      },
    {
      value: 'practical',
      label: 'practical',
    },
    {
      value: 'written',
      label: 'written',
    }
  ];

const columns = [
  { field: '_id', headerName: 'ID', width: 150 },
  { field: 'studentIndex', headerName: 'Index', width: 150 },
  {
    field: 'examType',
    headerName: 'Exam type',
    width: 150,
    editable: true,
  },
  {
    field: 'marks',
    headerName: 'Marks',
    width: 150,
    editable: true,
  }
];


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const ExamResult = () =>{

    const classes = useStyles();
    const [studentIndex,setIndex] = useState('');
    const [examType,setExamType] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage,setErrorMessage]= useState('');
    const [data, setData] = useState([]);
    const [showMarks,setShowMarks] = useState(false); 

    const getResult = async ()=>{
        try{
            const res = await axios.post('http://localhost:3000/examResult',{studentIndex: studentIndex, examType: examType})
            setData(res.data)
            setIndex('')
            setExamType('')
            setShowMarks(true)
            
        }catch{
            setError(true)
            setErrorMessage("something went wrong try again")
            setTimeout(()=>{
                setError(false)
                setErrorMessage('')
            },3000)
        }
        
            
        

    }

    return (
        <div >
            <div style={{textAlign:'center'}}>
                <TextField id="outlined-basic" label="studentIndex" variant="outlined" value={studentIndex} style={{marginTop:20}} onChange={(e)=>{setIndex(e.target.value)}} />
                <br/>
                <div>
                <TextField id="outlined-select-currency-native" select label="examType"  value={examType} style={{marginTop:20,width:'25ch'}} onChange={(e)=>{setExamType(e.target.value)}}  SelectProps={{native: true}} variant="outlined"> 
                    {examtypes.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                </div>
                <br/>
                <Button variant="contained" color="primary" style={{marginTop:20}} onClick={()=>{getResult()}}>submit</Button>

            </div>
            {showMarks?
            <div style={{ height: 200, width: '50%', margin:'auto',marginTop:20}}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={1}
                    rowsPerPageOptions={[1]}
                    getRowId = {(row)=>row._id}
                    
                />
            </div>: null
            }
        </div>
    )


}

export default ExamResult;