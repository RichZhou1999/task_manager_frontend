import logo from './logo.svg';
import './App.css';
import Login from './Component/Login/Login';
import Choice from './Component/Choice/Choice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Project from './Component/Project/Project';
import * as React from 'react';
import Load from "./Component/Load/Load"
import Setting from './Component/Setting/Setting';

export const ItemContext = React.createContext();


function App() {
  const [userID, setUserID] = React.useState("")
  const [projectID, setProjectID] = React.useState("")
  const [progressData,setProgressData] = React.useState([])
  const [finishedData,setFinishedData] = React.useState([])
  const [title,changeTitle] = React.useState("")
  const [name, setName] = React.useState("")
  const [portraitLink, setPortraitLink] = React.useState("")
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <>
    <ItemContext.Provider
    value = {{
      userID, 
      setUserID,
      projectID,
      setProjectID,
      progressData,
      setProgressData,
      finishedData,
      setFinishedData,
      title,
      changeTitle,
      portraitLink, 
      setPortraitLink,
      name, 
      setName
    }}
    >
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/choice" element={<Choice/>}/>
    <Route path="/project" element={<Project/>}/>
    <Route path="/load" element={<Load/>}/>
    <Route path="/setting" element={<Setting/>}/>
    </Routes>
    </BrowserRouter>
    </ItemContext.Provider>
    </>
  );
}

export default App;
