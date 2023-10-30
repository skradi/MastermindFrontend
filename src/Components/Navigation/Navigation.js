import {Link, useNavigate} from "react-router-dom";
import React from "react";
import './Navigation.css'
import Cookies from "universal-cookie";
import {RulesBtn} from "../RulesBtn/RulesBtn";
import './Link.css';


export const Navigation = (props) => {
    const navigate = useNavigate();

    // console.log('cos z propsów', props.logged);
    // console.log(props.rerenderParent, 'props');

    let logged ;

    if (props.logged) {
        logged = true;
    } else {
        logged = false;
    }

    const handleLogout = async () => {
        const userWantToLogout = window.confirm('Are you sure you want to logout?');

        if (userWantToLogout) {
            const cookies = new Cookies();
            const token = cookies.get('jwt_token');
            console.log(token);

            console.log('befor fetch');
            const res = await fetch('http://localhost:3001/logout', {
                credentials: "include",
            });
            console.log('after fetch');
            console.log(res);
            const data = await res.json();
            console.log(data, 'data from fetch respons logout ');
            navigate('/')
            props.rerenderParent();
        }
    }

    return <>
        {(logged) && <div className="nav">
            {/*<div className='nav-list-item'><Link to='/game' className="custom-link">Game</Link></div>*/}
            <button className='nav-list-item' onClick={handleLogout}>Logout</button>
        </div>}
        {(!logged) && <div className="nav">
            <RulesBtn/>
            <div className='nav-list-item'><Link to='/' className="custom-link">Login</Link></div>
            <div className='nav-list-item'><Link to='/registration' className="custom-link">Registration</Link></div>
        </div>}
    </>
}