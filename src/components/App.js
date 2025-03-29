import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home";
import LoginForm from "./LoginForm";
import TableData from "./TableData";

const App = () => {
    return (
        <>
            <Router>
                
                <Routes>
                    <Route path="/" element={<LoginForm/>}/>
                    <Route path="./home" element={<Home/>}/>
                    <Route path="./TableData" element={<TableData/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App;
