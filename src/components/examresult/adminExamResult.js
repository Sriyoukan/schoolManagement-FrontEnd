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




const currencies = [
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




const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));



const AdminExamResult = () =>{

    const classes = useStyles();
    const [studentIndex,setIndex] = useState('');
    const [studentIndex1,setIndex1] = useState('');
    const [examType,setExamType] = useState('');
    const [examType1,setExamType1] = useState('');
    const [marks,setMarks] = useState(0);
    const [marks1,setMarks1] = useState(0);
    const [error, setError] = useState(false);
    const [errorMessage,setErrorMessage]= useState('');
    const [data, setData] = useState([]);
    const [showMarks,setShowMarks] = useState(false); 
    const [update,setUpdate] = useState(false)
    const [updateId,setUpdateId]=useState('')
    const [updatedSI,setUpdatedSI] = useState('');
    const [updatedET,setUpdatedET] = useState('')
    const [updatedM,setUpdatedM]= useState(0)        
    
    
    


    const columns = [
        { field: '_id', headerName: 'ID', width: 150 },
        { field: 'studentIndex', headerName: 'Index', width: 150,editable: true },
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
        },
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <>
                <CheckCircleIcon
                  color="primary"
                  style={{ marginRight: 20, cursor: "pointer" }}
                  onClick={() => {
                    setUpdateId(params.row._id)  
                    setUpdate(true)}}
                />
                {update?
                <EditIcon 
                    color = "pramary"
                    style={{cursor:'pointer'}}
                    onClick={()=>{
                        updateResult()
                    }}
                
                />: null
          }
                
              </>
            );
          },
        },
      ];
    

    const getResult = async ()=>{
        try{
            const res = await axios.post('http://localhost:3000/examResult',{studentIndex: studentIndex1, examType: examType1})
            setData(res.data)
            setUpdatedSI(res.data[0].studentIndex)
            setUpdatedET(res.data[0].examType)
            setUpdatedM(res.data[0].marks)
            setIndex1('')
            setExamType1('')
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
    

    const addResult = async ()=>{


        try{
            const res = await axios.post("http://localhost:3000/addResult",{studentIndex:studentIndex,examType:examType,marks:marks})
            setIndex('')
            setExamType('')
            setMarks('')
        }catch{
            setError(true)
            setErrorMessage("something went wrong try again")
            setTimeout(()=>{
                setError(false)
                setErrorMessage('')
            },3000)
        }
    } 
    const handleEdit = React.useCallback(
        ({id,field,value})=>{
            if(field=='studentIndex'){
                setUpdatedSI(value)
            }
            if(field=='examType'){
                setUpdatedET(value)
            }
            if(field=='marks'){
                setUpdatedM(value)
            }
        }
    )
    
    const updateResult = async ()=>{

        try{
            const res = await axios.post("http://localhost:3000/updateResult",{_id:updateId, studentIndex:updatedSI,examType:updatedET,marks:updatedM})
            setIndex('')
            setExamType('')
            setMarks('')
            setData([])
            setUpdate(false)
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
        <>
            <div style={{textAlign:'center'}}>
                <TextField id="outlined-basic" label="studentIndex" variant="outlined" value={studentIndex} style={{marginTop:20}} onChange={(e)=>{setIndex(e.target.value)}} />
                <br/>
                <div>
                <TextField id="outlined-select-currency-native" select label="examType"  value={examType} style={{marginTop:20,width:'26ch'}} onChange={(e)=>{setExamType(e.target.value)}}  SelectProps={{native: true}} variant="outlined"> 
                    {currencies.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                </div>
                <TextField id="outlined-basic" label="marks" variant="outlined" value={marks} style={{marginTop:20}} onChange={(e)=>{setMarks(e.target.value)}} />
                <br/>
                <Button variant="contained" color="primary" style={{marginTop:20}} onClick={()=>{addResult()}}>submit</Button>

            </div>
            <hr/>
            <div style={{textAlign:'center'}}>
                <TextField id="outlined-basic" label="studentIndex" variant="outlined" value={studentIndex1} style={{marginTop:20}} onChange={(e)=>{setIndex1(e.target.value)}} />
                <br/>
                <div>
                <TextField id="outlined-select-currency-native" select label="examType"  value={examType1} style={{marginTop:20,width:'26ch'}} onChange={(e)=>{setExamType1(e.target.value)}}  SelectProps={{native: true}} variant="outlined"> 
                    {currencies.map((option) => (
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
            <div style={{ height: 200, width: '55%', margin:'auto',marginTop:20}}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={1}
                    rowsPerPageOptions={[1]}
                    getRowId = {(row)=>row._id}
                    onCellEditCommit = {handleEdit}
                    
                />
            </div>: null
            }
        </>
    )


}

export default AdminExamResult;