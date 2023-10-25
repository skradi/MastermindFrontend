import './Registration.css';
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export const Registration = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('')
    const [error, setError] = useState('');

    // const navigate = useNavigate();
    const sendForm = async (e) => {
        e.preventDefault();
        console.log('form sent')

        const person = {
            username,
            password,
        }
        // console.log(person)

        const res = await fetch(`http://localhost:3001/registration`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(person),
        })

        if (res.ok) {
            const nameOfJustRegisteredPerson = await res.json();
            // console.log(nameOfJustRegisteredPerson);
            setUser(nameOfJustRegisteredPerson);
        } else {
            // Handle the error response
            const errorMessage = await res.json();
            // console.log(errorMessage);
            // console.log(errorMessage.error);
            setError(errorMessage.error);
        }
    }

    if (error) {
        return <>
            <h2>{error}</h2>
        </>
    }

    if (user) {
        return <>
            <h2>{user}</h2>
            <h3>You've been register. Go to login.</h3>
        </>
    }

    return <div>
        <h2>Registration</h2>
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
                        type="text"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        maxLength={15}
                        minLength={4}
                        required
                    />
                </label>
            </p>
            <p>
                <button type="submit">Sign up</button>
            </p>
        </form>
    </div>
}