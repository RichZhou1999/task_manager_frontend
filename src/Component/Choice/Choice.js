import "./Choice.css"
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import axios from 'axios';
import { ItemContext } from "../../App";
import { unstable_composeClasses } from "@mui/material";
import Setting from "../Setting/Setting";

const Choice = ()=>{
    const {userID, setUserID,projectID, setProjectID,
          progressData,setProgressData,finishedData,
          setFinishedData,title,changeTitle,
          portraitLink, 
          setPortraitLink} 
          = React.useContext(ItemContext);
    const [res, setRes] = React.useState("")

    // const fetchPortaritLink= async()=>{
    //     // console.log(`${process.env.REACT_APP_SERVER_URL}/getUserPortraitLink/${userID}`)
    //     await axios.get(`${process.env.REACT_APP_SERVER_URL}/getUserPortraitLink/${userID}`)
    //     .then((response)=>{setPortraitLink(response.data)})
        
    //     // return link
    //   }


    const create_new_project= async()=>{
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/createProject`, {
            title: "",
          })
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/createRole`, {
            project_id: response.data,
            user_id: userID,
            role:"owner"
          })
        setProjectID(response.data);
        setProgressData([])
        setFinishedData([])
        changeTitle("")
    }

    
    const createNewRole= async()=>{
        console.log(projectID)
        console.log(userID)
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/createRole`, {
            project_id: projectID,
            user_id: userID,
            role:"owner"
          })
    }
    
    
    const handle_new_project_click=()=>{   
        create_new_project()
        setChoiceMode("new")
    }

    const handle_load_project_click=()=>{   
        setChoiceMode("load")
    }

    const [choiceMode,setChoiceMode] = React.useState("None");

    const navigate = useNavigate()

    const goToSetting=()=>{
        setChoiceMode("setting")
    }

    React.useEffect(()=>{
        if (choiceMode === "new"){
        console.log(projectID);
        navigate("/project")
        }
        if(choiceMode === "load"){
            navigate("/load")
        }
        if(choiceMode === "setting"){
            // fetchPortaritLink()
            // console.log(link)
            // setPortraitLink(link)
            navigate("/setting")
        }
    })
    return(
        <>
        <div className="setting_type">
        <Setting/>
        </div>
        {/* <h1 className="choice_title">Choose the one you want </h1> */}
        <br></br>
        <div className="choice_frame">
            <span className="choice" onClick={(e)=>{handle_new_project_click()}}> New Project</span>
            <span className="choice" onClick={(e)=>{handle_load_project_click()}}> Load Project</span>
        </div>
        </>
    )

}
export default Choice;