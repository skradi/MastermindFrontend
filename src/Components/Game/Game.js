import React, { useState } from 'react';
import './Game.css';
import { ColorBox } from '../ColorBox/ColorBox';
import {RulesBtn} from "../RulesBtn/RulesBtn";

export const Game = () => {
    const [rowCount, setRowCount] = useState(0); // Start with 0 rows
    const [gameStarted, setGameStarted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleNewGame = async () => {
        // tu zrobic zaczecie gry i zapytanie moze czy sie chce grac w nowa gre
        setRowCount(0);

        const res = await fetch(`http://localhost:3001/game`, {
            method: 'GET',
            credentials: "include",
        })

        const data = await res.json();
        console.log(data, 'data from game endpoint')

        if (data === 'you are not login') {
            setErrorMessage('You need to login');
            return;
        }

        if (data === 'new game started') {
            setGameStarted(true);
            setRowCount(1);
        } else {
            throw new Error('something went really wrong');
        }
    };

    const handleClick2 = () => {
        setRowCount(count => count + 1);
    };

    return (
        <div className='game-container'>
            <div className='left-container'>
                <button onClick={handleNewGame}>New Game</button>
                <RulesBtn/>
            </div>
            {(errorMessage) && <p className="error-message">{errorMessage}</p>}
            {gameStarted && (
                <div className='middle-container'>
                    <div className='game-panel'>
                        <button className='button-panel' onClick={handleClick2}>
                            Check Your Choice
                        </button>
                    </div>
                    {[...Array(rowCount)].map((_, index) => (
                        <div className='row-game' key={index}>
                            <ColorBox />
                            <ColorBox />
                            <ColorBox />
                            <ColorBox />
                            <ColorBox />
                        </div>
                    ))}
                </div>
            )}
            <div className='right-container'></div>
        </div>
    );
};
