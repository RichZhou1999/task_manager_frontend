
import {AiOutlineArrowRight} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import axios from 'axios';
import { ItemContext } from "../../App";
import Button from '@mui/material/Button';
import "./ProjectDisplayCell.css"


const ProjectDisplayCell = ({project_id, title})=>{

    const navigate = useNavigate()
    const {userID, setUserID,
        projectID, setProjectID,
        progressData,setProgressData,
        finishedData,setFinishedData,
        changeTitle
        } = React.useContext(ItemContext);
    
    const fetchTask = async()=>{
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/loadTaskList`, {
            project_id:projectID
        })
        setProgressData(response.data.filter((task)=>task.status=="progress"))
        setFinishedData(response.data.filter((task)=>task.status=="finished"))
        console.log(response)
    }
    const [selectState, setSelectState] = React.useState(false)
    React.useEffect(()=>{
        fetchTask()
        if (selectState == true){
            navigate("/project")
        }

    },[selectState])
    
    // const [selectState, setSelectState] = React.useState(false)

    const goToProject = ()=>{
        setProjectID(project_id);
        setSelectState(true)
    }

    return(
    <>
    <div className="display_cell">
        <span> {project_id}</span>
        <span> {title} </span>
        <span><Button variant = "contained" startIcon={<AiOutlineArrowRight />} color="primary" target="__blank" className="project_save" onClick={(e)=>goToProject()}> Go </Button></span>
    </div>
    </>)

}
export default ProjectDisplayCell;