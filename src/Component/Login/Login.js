import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import "./Login.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ItemContext } from "../../App";


const Login = ()=>{
    const [account, setAccount] = React.useState("")
    const [password, setPassword] = React.useState("")
    const {userID, setUserID, name, setName, portraitLink, setPortraitLink} = React.useContext(ItemContext);



    // const fetchPortaritLink= async(userID)=>{
    //   console.log()
    //   const link = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getUserPortraitLink/${userID}`)
      
    //   return link
    // }
    const navigate = useNavigate()
    const [loginSucceed,setLoginSucceed] = React.useState(0);
    React.useEffect(()=>{
      if (userID !==""){
        navigate("/choice")
      }
    },[userID])

    const fetchPortaritLink= async(user_id)=>{
      console.log(`${process.env.REACT_APP_SERVER_URL}/getUserPortraitLink/${user_id}`)
      await axios.get(`${process.env.REACT_APP_SERVER_URL}/getUserPortraitLink/${user_id}`)
      .then((response)=>{setPortraitLink(response.data)})
      
    }

    const submit = ()=>{
        console.log(`${process.env.REACT_APP_SERVER_URL}/login`);
        axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, {
            name: account,
            password: password
          })
          .then(function (response) {
            if (response.data){
              setUserID(response.data);
              fetchPortaritLink(response.data)
              setName(account)
            }
            else{
              alert("wrong account or password");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
    const register=()=>{
      axios.post(`${process.env.REACT_APP_SERVER_URL}/register`, {
        name: account,
        password: password
      })
      .then(function (response) {
        if (response.data){
          // setUserID(response.data);
          // fetchPortaritLink(response.data)
          // setName(account)
          alert("succeeed");
        }
        else{
          alert("account exist can not register");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    return(
        <>
        <div className="login_title_div">
        <h1 className="login_title">
        💼Welcome to Task Manager💼
        </h1>
        </div>
        {/* <div className='login'>hello</div> */}
         <div className="login">
        <Stack spacing={2} sx= {{width:"40%"}}>
        <TextField id="account" label="account" variant="outlined"  className='account_textfield' onChange={(e) => setAccount(e.target.value)}/>
        <TextField id="password" label="password" variant="outlined" type="password" className='password_textfield' onChange={(e) => setPassword(e.target.value)}/>
        <Button variant="contained" className='login_submit' onClick={submit}>Log In</Button>
        <Button variant="contained" className='login_submit' onClick={register}>Sign Up</Button>
        {/* <div className='login_submit'>submit</div> */}
        </Stack>
        </div>
        </>
  )
}

export default Login;