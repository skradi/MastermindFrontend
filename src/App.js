import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import {Login} from "./Components/Login/Login";
import {Registration} from "./Components/Registration/Registration";
import {Game} from "./Components/Game/Game";
import {NotFoundView} from "./Components/NotFoundView/NotFoundView";
import {ErrorPage} from "./Components/ErrorPage/ErrorPage";
import {Rules} from "./Components/Rules/Rules";

const pass = false;

export const App = () => {

    return <>
        <div className="container">
            <div className="nav">
                <div className='nav-list-item'><Link to='/rules'>Rules</Link></div>
                <div className='nav-list-item'><Link to='/'>Login</Link></div>
                <div className='nav-list-item'><Link to='/registration'>Registration</Link></div>
            </div>
            <h1>MASTERMIND</h1>
            <div className="routes">
                <Routes>
                    <Route path='/rules' element={<Rules/>}/>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/registration' element={<Registration/>}/>
                    <Route path='/error' element={<ErrorPage/>}/>
                    {pass && <Route path='/game' element={<Game/>}/>}
                    <Route path='/*' element={<NotFoundView/>}/>
                </Routes>
            </div>
        </div>

    </>
}


