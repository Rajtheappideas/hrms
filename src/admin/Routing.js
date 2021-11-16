import React from 'react'
import Navbar from './Components/Navbar'
import {  Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login'
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard/index'
import Report from './pages/Dashboard/Report';
function Routing() {
    return (
        <div>
            <Navbar/>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/Dashboard">
                <Dashboard/>
            </Route>
            <Route exact path="/login">
                <Login/>
             </Route>
            <Route path="/register">
                <Registration/>
             </Route>
            <Route path="/report">
                <Report/>
             </Route>
        </div>
    )
}

export default Routing
