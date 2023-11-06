import {Link, useNavigate} from "react-router-dom";
import React from "react";
import './Navigation.css'
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
            const res = await fetch('http://localhost:3001/logout', {
                credentials: "include",
            });
            const data = await res.json();
            console.log(data, 'data from fetch response logout ');
            navigate('/')
            props.rerenderParent();
        }
    }

    const leaderboard = () => {
        alert('This section is on the roadmap, and the anticipated time for its implementation is January 2024');
    }

    return <>
        {(logged) && <div className="nav">
            <p className='username'>{props.username}</p>
            {/*<button className='button-84' onClick={leaderboard}>Leaderboard</button>*/}
            <button className='nav-list-item button-84' onClick={handleLogout}>Logout</button>
        </div>}
        {(!logged) && <div className="nav">
            <RulesBtn/>
            <div className='nav-list-item button-84'><Link to='/' className="custom-link" style={{ padding: 0 }}>Login</Link></div>
            <div className='nav-list-item button-84'><Link to='/registration' className="custom-link" style={{ padding: 0 }}>Registration</Link></div>
        </div>}
    </>
}