import React, {useState} from "react";
import './Login.css'

export const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const sendForm = e => {
        e.preventDefault();
        console.log('form sent')

        const person = {
            username,
            password,
        }
        console.log(person)
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
                        maxLength={20}
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
                        maxLength={20}
                        minLength={4}
                        required
                    />
                </label>
            </p>
            <p>
                <button type="submit">Sign in</button>
            </p>
        </form>
    </div>
}