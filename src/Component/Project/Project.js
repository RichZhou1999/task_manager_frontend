import * as React from 'react';
import TextField from '@mui/material/TextField';
import "./Project.css"
import DropItem from '../DropItem/DropItem';
import Grid from "@material-ui/core/Grid"
import Task from '../Task/Task';
import { BiSave } from 'react-icons/bi';
import {AiFillAlipaySquare, AiFillBackward} from 'react-icons/ai';
import Button from '@mui/material/Button';
import { ItemContext } from "../../App";
import axios from 'axios';
import {AiFillPlusCircle} from "react-icons/ai"
import NewTaskModal from '../NewTaskModal/NewTaskModal';
import { useNavigate } from 'react-router-dom';



const Project = ()=>{
    const {userID, setUserID,
            projectID, setProjectID,
            progressData,setProgressData,
            finishedData,setFinishedData,
            title,changeTitle
            } = React.useContext(ItemContext);
    // const [progressData,setProgressData] = React.useState([])
    // const [finishedData,setFinishedData] = React.useState([])
    
    const [gobackState, setgoBackState] = React.useState(false)

    // const [title,changeTitle] = React.useState("")

    React.useEffect(()=>{
        if (gobackState == true){
            setgoBackState(false)
            setProgressData([])
            setFinishedData([])
            navigate(-1)
        }
    },[gobackState,progressData,title])

    const navigate = useNavigate()
    const SaveProject=()=>{
        console.log(title)
        axios.post(`${process.env.REACT_APP_SERVER_URL}/saveProject`, {
            project_id : projectID,
            title: title,
          })
          .then(function (response) {
            if (response.status == "200"){
                console.log(response)
                console.log("succeessful");
            }
            else{
              alert("fail to create project");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const backPage = ()=>{
        setgoBackState(true)
    }

    
    const tasks = require("../../test_data/task_data.json");
    
    // React.useEffect(()=>{

    // },[progressData,title])

    return (
        <>
        <div className="project_button_div">
        <Button variant = "contained" startIcon={<BiSave />} color="primary" target="__blank" className="project_save" onClick={(e)=>SaveProject()}> Save </Button>
        <Button variant = "contained" startIcon={<AiFillBackward />} color="primary" target="__blank" className="project_save" onClick={(e)=>backPage()}> Back </Button>
        </div>
        <div className = "project_title_position">
            <TextField id="project_title" size="normal" label="title" variant="standard"  onChange={(e) => changeTitle(e.target.value)} style={{width:"50%"}}/>
        </div>
        <div className="grid_container">
        <div className="grid_item1">
        <div className="task_type_word">In progress</div>
        <div>
            {
                progressData.map((task)=>{
                    return <Task 
                    task_id = {task.task_id}
                    project_id = {task.project_id}
                    description = {task.description}
                    status = {task.status}
                    finish_time = {task.finish_time}
                    title = {task.title}
                    key = {task.task_id}
                    progressData = {progressData}
                    finishedData = {finishedData}
                    setProgressData={setProgressData}
                    setFinishedData={setFinishedData}
                    />
                })
            }
        </div>
        
        </div>

        <div className="grid_item2">
        <div>Finished</div>
        <div>
        {
                finishedData.map((task)=>{
                    return <Task 
                    task_id = {task.task_id}
                    project_id = {task.project_id}
                    description = {task.description}
                    status = {task.status}
                    finish_time = {task.finish_time}
                    title = {task.title}
                    key = {task.task_id}
                    progressData = {progressData}
                    finishedData = {finishedData}
                    setFinishedData={setFinishedData}
                    setProgressData={setProgressData}
                    />
                })
            }
        </div>
        </div>
        <NewTaskModal projectID={projectID} progressData = {progressData} setProgressData={setProgressData} >
        <Button  startIcon={<AiFillPlusCircle />} color="primary" target="__blank" className="add_task_button" > Add </Button>
        </NewTaskModal>
        </div>
        
        </>
    )

}
export default Project;