import './App.css';
import {Route, Routes} from "react-router-dom";
import {Login} from "./Components/Login/Login";
import {Registration} from "./Components/Registration/Registration";
import {Game} from "./Components/Game/Game";
import {NotFoundView} from "./Components/NotFoundView/NotFoundView";
import {ErrorPage} from "./Components/ErrorPage/ErrorPage";
import React, {useEffect, useState} from "react";
import {Navigation} from "./Components/Navigation/Navigation";
import Cookies from 'universal-cookie';


export const App = () => {

    const [parentState, setParentState] = useState('initial state');
    const [loggedUsername, setLoggedUsername] = useState('');

    //
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        // Dodajmy nasłuchiwanie zdarzenia resize po zamontowaniu komponentu
        window.addEventListener("resize", handleResize);

        // Oczyść nasłuchiwanie po odmontowaniu komponentu
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    useEffect(() => {
        // Sprawdź szerokość okna i zmień kolor tła w zależności od wartości
        if (windowWidth < 500) {
            document.body.style.backgroundColor = "#1f391f";
            // const selectElements = document.querySelectorAll('.select-div');
            // selectElements.forEach(select => {
            //     select.innerText = '';
            // });
        } else {
            document.body.style.backgroundColor = "";
            // const selectElements = document.querySelectorAll('.select-div');
            // selectElements.forEach(select => {
            //     select.innerText = '';
            // });// przywróć domyślny kolor tła
        }
    }, [windowWidth]);

    const handleRerender = (username) => {
        // Update the state to trigger a rerender
        setParentState(Math.random().toString());
        console.log(parentState);
        setLoggedUsername(username);
    }

    const cookies = new Cookies();
    const cookieJWT = cookies.get('jwt_token');

    return <>
        <div className="container">
            <Navigation logged={cookieJWT} rerenderParent={handleRerender} username={loggedUsername}/>
            <h1 className='mastermind'>MASTERMIND</h1>
            <div className="routes">
                <Routes>
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


