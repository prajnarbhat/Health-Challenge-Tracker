import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
                </Routes>
            </Router>
            </DataProvider>
        </>
    )
}

export default App;
