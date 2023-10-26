import React, {useState} from "react";
import './Login.css'
import {useNavigate} from "react-router-dom";

export const Login = ({ rerenderParent }) => {
    const navigate = useNavigate();
    // console.log(rerenderParent, 'co to takiego tu mamy login');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const sendForm = async (e) => {
        e.preventDefault();
        console.log('form sent login')

        const person = {
            username,
            password,
        }

        const res = await fetch(`http://localhost:3001/login`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(person),
        })

        const data = await res.json();

        if (res.ok) {
            console.log(data, 'data from backend login');
            setErrorMessage('')
            navigate('/game');
            rerenderParent();
        } else if (data.error === 'incorrect username'){
            setErrorMessage('Incorrect username');
        } else if (data.error === 'invalid password') {
            setErrorMessage('Invalid password');
        }
    }

    return <div>
        <h2>Login</h2>
        <form onSubmit={sendForm}>
            <p>
                <label className='label-username'>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        maxLength={15}
                        minLength={3}
                        required
                    />
                </label>
            </p>
            <p>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        maxLength={15}
                        minLength={4}
                        required
                    />
                </label>
            </p>
            <p>
                <button type="submit">Sign in</button>
            </p>
        </form>
        {(errorMessage) && <p className="error-message">{errorMessage}</p>}
    </div>
}