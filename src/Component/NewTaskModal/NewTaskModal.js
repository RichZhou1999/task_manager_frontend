import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { img_300 } from '../../config/config';
import { BiSave } from 'react-icons/bi';
import "./NewTaskModal.css"
import axios from 'axios';
import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';
import TextField from '@mui/material/TextField';


export default function NewTaskModal({projectID, progressData,setProgressData, children}){

  const createTaskDB=(task)=>{
      axios.post(`${process.env.REACT_APP_SERVER_URL}/createTask`, task)
      .then(function (response) {
        if (response.data){
            setTask_id(response.data);
            console.log(task_id);
        }
        else{
          alert("fail to create task");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }  
  
  const createTask=()=>{
        console.log("new")

        const temp = {        
        "project_id":projectID,
        "title":newTaskTitle,
        "description":newTaskDescription,
        "finish_time":newTaskTime,
        "status":"progress"}
        createTaskDB(temp)
        temp.task_id = task_id
        setProgressData([...progressData, temp])
        handleClose()
    }
    const [task_id, setTask_id] = React.useState("");
    const [newTaskTitle, setNewTaskTitle] = React.useState("");
    const [newTaskDescription, setNewTaskDescription] = React.useState("");
    const [newTaskTime, setNewTaskTime] = React.useState("");

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        border: '2px solid #000',
        borderRadius: "20px",
      };

    return (
        <div>
        <Button onClick={handleOpen}>{children}</Button>
        <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }
        } >
        <Fade in={open}>
        <Box sx={style}>
        <Typography className="newTaskField">
        <TextField
          id="outlined-multiline-flexible"
          label="task title"
          multiline
          maxRows={6}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        </Typography>
        <Typography className="newTaskField">
        <TextField
          id="outlined-multiline-flexible"
          label="task description"
          multiline
          maxRows={6}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        </Typography>
        <Typography className="newTaskField" >
        <TextField
          id="outlined-multiline-flexible"
          label="time"
          multiline
          maxRows={6}
          onChange={(e) => setNewTaskTime(e.target.value)}
        />
        </Typography>
        <Typography className="newTaskField" >
        <Button variant = "contained" startIcon={<BiSave />} color="primary" target="__blank" className="project_save" onClick={(e)=>{createTask()}}> Save </Button>
        </Typography>
        </Box>
        </Fade>
        </Modal>

        </div>
    )

}