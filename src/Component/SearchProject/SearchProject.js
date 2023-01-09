
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ItemContext } from "../../App";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {AiOutlineArrowRight} from 'react-icons/ai';
import React, {useCallback} from 'react'
import "./SearchProject.css"


const SearchProject = () => {

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

    const goToProject = ()=>{
        setSelectState(true)
    }



    return(<>
        <div className="search_frame">
        <span><TextField id="project_id" label="project_id" variant="outlined"  onChange={(e) => setProjectID(e.target.value)} style={{width:"30vw"}}/></span>
        <span><Button variant = "contained" startIcon={<AiOutlineArrowRight />} color="primary" target="__blank" style={{margin:"1vh"}} onClick={(e)=>goToProject()}> Go </Button></span>
        </div>
    </>)
}

export default SearchProject;