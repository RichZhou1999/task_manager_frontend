import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { img_300 } from '../../config/config';
import { BiSave } from 'react-icons/bi';
import "./DescriptionModal.css"
import axios from 'axios';
import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';
import TextField from '@mui/material/TextField';
import { ItemContext } from "../../App";

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
  


const modalStyle = {
    display:"flex",
    alignItems:"center",
    justifyContent: "center",
}

const paperStyle = {
//   position: 'flex',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
  display:"flex",
  flexDirection: "column",
  width:"50%",
//   width: "60%",
//   height:"60%",
  alignItems:"center",
  justifyContent: "center",
  textAlign: "center",
//   bgcolor: '#2E294E',
//   border: '2px solid #000',
//   borderRadius: "20px",
//   boxShadow: 24,
//   p: 4,
};

export default function DescriptionModal({props, children}) {

    const {progressData,setProgressData,finishedData,setFinishedData} = React.useContext(ItemContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [description, setDescription] = React.useState(props.description);


    const updateTaskDatabase= async(temp)=>{
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/updateTaskDescription`, temp)
      }
    // const SaveProjectDB = ()=>{

    // }

    const saveDescription = ()=>{
      // console.log(task_id)
      var temp
      var temp_list
      if (props.status == "progress"){
        temp = props.progressData.filter(t=>t.task_id == props.task_id)
        temp_list = props.progressData.filter(t=>t.task_id != props.task_id)
        temp[0].description = description;
        temp_list.push(temp[0])
        setProgressData([...temp_list])
      }
      if (props.status == "finished"){
        temp = props.finishedData.filter(t=>t.task_id ==  props.task_id)
        temp_list = props.finishedData.filter(t=>t.task_id !=  props.task_id)
        temp[0].description = description;
        temp_list.push(temp[0])
        setFinishedData([...temp_list])
      }
      updateTaskDatabase(temp[0])
      handleClose()
    }
    return (
    <div className='modalFrame'>
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
        <Typography className="modal_description" >
        <TextField
          id="outlined-multiline-flexible"
          label="task description"
          multiline
          maxRows={6}
          defaultValue={props.description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </Typography>
        <Typography className="save_icon" >
        <Button variant = "contained" startIcon={<BiSave />} color="secondary" target="__blank" onClick={(e)=>{saveDescription()}} > Save </Button>
        </Typography>
         </Box>
        </Fade>
        </Modal>

    </div>
    )


}