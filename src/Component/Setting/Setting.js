import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ItemContext } from "../../App";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {AiOutlineArrowRight} from 'react-icons/ai';
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import "./Setting.css"

const Setting = () =>{  

  // const fetchPortaritLink= async()=>{
  //   // console.log(`${process.env.REACT_APP_SERVER_URL}/getUserPortraitLink/${userID}`)
  //   await axios.get(`${process.env.REACT_APP_SERVER_URL}/getUserPortraitLink/${userID}`)
  //   .then((response)=>{setPortraitLink(response.data)})
    
  //   // return link
  // }

  // React.useEffect(()=>{

  // },[portraitLink])
 
  const {name,portraitLink, setPortraitLink,userID} = React.useContext(ItemContext);
  React.useEffect(()=>{

  },[portraitLink])
 
  console.log(portraitLink);
  // var photo_link;
  // console.log(`${process.env.REACT_APP_SERVER_URL}/getUserPortraitLink/${userID}`)
  // fetchPortaritLink(userID)
  // console.log(photo_link)
  // setPortraitLink(photo_link)

  const uploadFile = async(formData)=>{
    axios.post(`${process.env.REACT_APP_SERVER_URL}/uploadFile`,
    formData,
    {
      headers:{
        "Content-type": "multipart/form-data"
      }
    }).then((response)=>{
      console.log(response.data)
      updateUserPortraitLink(response.data)
      // return response.data
    })
  }
  // return response.data;

  const updateUserPortraitLink = async(filename)=>
  {
    const response  = axios.post(`${process.env.REACT_APP_SERVER_URL}/updateUserPortraitLink/${userID}/${filename}`)
    console.log(`${process.env.REACT_APP_SERVER_URL}/updateUserPortraitLink/${userID}/${filename}`)
    setPortraitLink(filename);
  }

function Dropzone() {
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    var filename;
    uploadFile(formData)
    // console.log(filename)
    // updateUserPortraitLink(filename)

  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
    <>
    {/* {
      portraitLink != null ? <img src = {`${process.env.REACT_APP_SERVER_URL}/download/${portraitLink}`}/> :  <></>
    } */}
    {/* <img src = {`${process.env.REACT_APP_SERVER_URL}/download/1672611278060_result.png`} /> */}
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
      portraitLink !== "" ? <p> <img src = {`${process.env.REACT_APP_SERVER_URL}/download/${portraitLink}` } className="img_type"/></p> : 
       <><p>Choose your portrait here</p></>
      }
      {/* {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      } */}
    </div>
    </>
  )
}
return (
    <>
    <Dropzone/>
    </>
)
}

export default Setting;

