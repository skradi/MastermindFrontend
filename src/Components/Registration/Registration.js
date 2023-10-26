import './Registration.css';
import React, {useState} from "react";

export const Registration = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('')
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const sendForm = async (e) => {
        e.preventDefault();
        console.log('form sent registration')

        const person = {
            username,
            password,
            email
        }
        console.log(person);

        const res = await fetch(`http://localhost:3001/registration`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(person),
        })

        console.log(res, 'res from registration fetch')

        if (res.ok) {
            const nameOfJustRegisteredPerson = await res.json();
            // console.log(nameOfJustRegisteredPerson);
            setUser(nameOfJustRegisteredPerson);
        } else {
            // Handle the error response
            const errorMessage = await res.json();
            // console.log(errorMessage);
            if (errorMessage.error === 'Sorry, that username is already in use. Please choose a different username.') {
                console.log('no co jesttttttt')
                setErrorMessage('Sorry, that username is already in use. Please choose a different username.');
            } else {
                // console.log(errorMessage.error);
                setError(errorMessage.error);
                console.log(errorMessage.error, 'how does this error look like?');
                // if we set new value in setState then our Component is rendering again with new data.
            }
        }
    }
    if (errorMessage) {
        console.log('convert message to true');
    }
    // console.log(!!(errorMessage), '!! errorMessage');
    // console.log(errorMessage, 'errorMessage');

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
                <label className='label-email'>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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
        {(errorMessage) && <p className="error-message">{errorMessage}</p>}
    </div>
}