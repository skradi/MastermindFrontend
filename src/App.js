import './App.css';
import {Route, Routes} from "react-router-dom";
import {Login} from "./Components/Login/Login";
import {Registration} from "./Components/Registration/Registration";
import {Game} from "./Components/Game/Game";
import {NotFoundView} from "./Components/NotFoundView/NotFoundView";
import {ErrorPage} from "./Components/ErrorPage/ErrorPage";
import {Rules} from "./Components/Rules/Rules";
import React, {useState} from "react";
import {Navigation} from "./Components/Navigation/Navigation";
import Cookies from 'universal-cookie';


export const App = () => {

    const [parentState, setParentState] = useState('initial state');

    console.log(parentState);

    const handleRerender = () => {
        // Update the state to trigger a rerender
        setParentState(Math.random().toString());
    }

    const cookies = new Cookies();
    const cookieJWT = cookies.get('jwt_token');
    console.log(cookieJWT, 'JWOT COOKIE ')

    return <>
        <div className="container">
            <Navigation logged={cookieJWT} rerenderParent={handleRerender} ok={34}/>
            <h1>MASTERMIND</h1>
            <div className="routes">
                <Routes>
                    <Route path='/rules' element={<Rules/>}/>
                    <Route path='/' element={<Login rerenderParent={handleRerender}/>}/>
                    <Route path='/registration' element={<Registration/>}/>
                    <Route path='/error' element={<ErrorPage/>}/>
                    <Route path='/*' element={<NotFoundView/>}/>
                    <Route path='/game' element={<Game/>}/>
                </Routes>
            </div>
        </div>

    </>
}


