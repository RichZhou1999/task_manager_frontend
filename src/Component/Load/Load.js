import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import axios from 'axios';
import { ItemContext } from "../../App";
import ProjectDisplayCell from '../ProjectDisplayCell/ProjectDisplayCell';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {AiOutlineArrowRight} from 'react-icons/ai';
import SearchProject from '../SearchProject/SearchProject';

const Load = ()=>{

    const navigate = useNavigate()
    const { userID, setUserID,projectID,setProjectID} = React.useContext(ItemContext)

    const [projectList, setProjectList] = React.useState([]);

    React.useEffect(()=>{
        fetch_project_list()
    },[])


    const fetch_project_list = async()=>{
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/loadProjectList`, {
            user_id:userID
        })
        setProjectList(response.data)
        console.log(response)
        }
    return (
        <>
        <SearchProject />
        <div>
            {projectList.map((project)=>{
                return(
                <ProjectDisplayCell
                project_id = {project.project_id}
                title = {project.title}
                />
                )
            })}
        </div>
        </>
    )
    }
export default Load;

