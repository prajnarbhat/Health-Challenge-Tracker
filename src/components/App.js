import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Chart from "./Chart";
import { DataProvider } from "./DataContext";
import LoginForm from "./LoginForm";
import TableData from "./TableData";

const App = () => {
    return (
        <>
           <DataProvider>
            <Router>
                
                <Routes>
                    <Route path="/" element={<LoginForm/>}/>
                    <Route path="/TableData" element={<TableData/>}/>
                    <Route path="/chart" element={<Chart/>}/>
                </Routes>
            </Router>
            </DataProvider>
        </>
    )
}

export default App;
