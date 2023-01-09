import "./Task.css"
import Button from '@mui/material/Button';
import DescriptionModal from "../DescriptionModal/DescriptionModal";
import axios from "axios";

// task_id, project_id,description,status,time,title
const Task = (props)=>{

    const updateTaskDatabase= async(temp)=>{
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/updateTask`, temp)
        }

    const handle_progress_to_finish = (task_id)=>{
        console.log(task_id)
        var temp = props.progressData.filter(t=>t.task_id == task_id)
        temp[0].status = "finished"
        props.setProgressData(props.progressData.filter(t=>t.task_id !== task_id))
        props.setFinishedData([...props.finishedData, temp[0]])
        console.log(temp[0])
        updateTaskDatabase(temp[0])
    }

    const handle_progress_to_delete = (task_id)=>{
        var temp = props.progressData.filter(t=>t.task_id === task_id)
        temp[0].status = "deleted"
        props.setProgressData(props.progressData.filter(t=>t.task_id !== task_id))
        updateTaskDatabase(temp[0])
    }

    const handle_finish_to_progress = (task_id)=>{
        var temp = props.finishedData.filter(t=>t.task_id === task_id)
        temp[0].status = "progress"
        props.setFinishedData(props.finishedData.filter(t=>t.task_id !== task_id))
        props.setProgressData([...props.progressData, temp[0]])
        updateTaskDatabase(temp[0])
    }

    return (
    <>
    <div className="task_frame">
    <DescriptionModal props = {props}>
        <div className="span_type"> {props.title}</div>
        <div className="span_type"> {props.finish_time}</div>
    </DescriptionModal>
        {/* <div className="span_type"> {props.title}</div>
        <div className="span_type"> {props.time}</div> */}
        <div>
            {props.status=="progress" ? <Button
            variant="contained" color="success" onClick={e=>handle_progress_to_finish(props.task_id)}>finish</Button>:<></>}
            {props.status=="progress" ? <Button
            variant="contained" color="error" onClick={e=>handle_progress_to_delete(props.task_id)}>delete</Button>:<Button
            variant="contained" color="error" onClick={e=>handle_finish_to_progress(props.task_id)}>back progress</Button>}
        </div>
    </div>
    </>
    )
}
export default Task;