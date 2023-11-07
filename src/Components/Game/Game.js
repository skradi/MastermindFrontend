import React, {useState} from 'react';
import './Game.css';
import {RulesBtn} from "../RulesBtn/RulesBtn";

export const Game = () => {

    const [errorMessage, setErrorMessage] = useState('');
    console.log(errorMessage)
    const handleNewGame = async () => {
        // Asking client if he wants to play new game
        const userConfirmed = window.confirm('Start a new game?');

        if (userConfirmed) {
            const res = await fetch(`http://localhost:3001/game`, {
                method: 'GET',
                credentials: "include",
            })

            const data = await res.json();

            if (data === 'you are not logged in') {
                setErrorMessage('You need to login');
                console.log('You need to login')
                return;
            }

            if (data !== 'new game started') {
                throw new Error('something went really wrong');
            }

            if (data === 'new game started') {
                // here we want to create first row to start the game
                const roundNumber = 1;

                // we clean board from previous game
                const divGameContainer = document.querySelector('.game-container');
                divGameContainer.innerHTML = '';
                const gameInfo = document.querySelector('.game-info');
                gameInfo.innerText = ""

                // we set text to Round 1
                const pNumber = document.querySelector('.round-number');
                pNumber.innerText = '1';
                const textRound = document.querySelector('.round');
                textRound.innerText = 'Round';

                // we create a new whole game section
                const newRow = document.createElement('div');
                newRow.className = `row row-${roundNumber}`;
                const leftContainer = document.createElement('div');
                leftContainer.className = 'left-game-container';
                const smallCircles = document.createElement('div');
                smallCircles.className = 'small-circles';

                for (let i = 0; i < 5; i++) {
                    const smallCircle = document.createElement('div');
                    smallCircle.className = 'small-circle';
                    smallCircles.appendChild(smallCircle);
                }

                leftContainer.appendChild(smallCircles);

                const rightContainer = document.createElement('div');
                rightContainer.className = 'right-game-container';
                const form = document.createElement(`form`);
                form.addEventListener('submit', handleSubmit);

                for (let i = 0; i < 5; i++) {
                    const select = document.createElement('select');
                    select.className = 'select-div brown';
                    select.addEventListener('change', colorChange);

                    const colors = ['brown', 'green', 'red', 'blue', 'orange', 'purple', 'dgreen', 'yellow'];
                    for (const color of colors) {
                        const option = document.createElement('option');
                        option.className = color;
                        option.value = color;
                        option.textContent = color;
                        select.appendChild(option);
                    }
                    form.appendChild(select);
                }

                const submitButton = document.createElement('button');
                submitButton.type = 'submit';
                submitButton.className = 'submit-btn-1 position-btn';
                submitButton.textContent = 'Check';
                form.appendChild(submitButton);
                rightContainer.appendChild(form);

                newRow.appendChild(leftContainer);
                newRow.appendChild(rightContainer);

                divGameContainer.appendChild(newRow);
            }
        }
    };

    const handleSubmit = async (e) => {
        // we submit a form, so we need to prevent browser from refreshing
        e.preventDefault();

        // get selected colors
        const selectedElements = e.target.getElementsByTagName('select');
        const selectedValues = Array.from(selectedElements).map((select) => select.value);
        // console.log('values', selectedValues);

        // check if colors are all different
        const areAllUnique = (arr) => {
            const uniqueSet = new Set(arr);
            return uniqueSet.size === arr.length;
        }

        const isUnique = areAllUnique(selectedValues);

        if (isUnique) {
            // send this data on server
            const gameInfo = document.querySelector('.game-info');
            gameInfo.innerText = ""
        } else {
            // Selected colors must be unique; no duplicates allowed.
            const gameInfo = document.querySelector('.game-info');
            gameInfo.innerText = "Selected colors must be unique; no duplicates allowed."
            return;
        }

        // sending data to backend and handling response,
        const res = await fetch(`http://localhost:3001/check`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(selectedValues),
        })

        const data = await res.json();
        // console.log(data);

        const numberForNextRound = document.querySelector('.round-number');

        // if response is positive it's time to generate new line of colors
        const roundNumber = Number(numberForNextRound.innerText)+1;

        // getting 5 elements from prev round
        const circlesElementsInRow1 = document.querySelectorAll(`.game-container .row-${roundNumber-1} .small-circle`);

        // color small circles according to hints from data server
        for (let i = 0; i < 5; i++) {
            const thesame = Number(data.theSame);
            const different = Number(data.differentIndex);
            const element = circlesElementsInRow1[i];
            if (i < thesame) {
                element.classList.add('red');
            } else if (i < (thesame + different)) {
                element.classList.add('black');
            }
        }

        // what happened in case the player guess the solution
        if (data.theSame === 5) {
            const gameInfo = document.querySelector('.game-info');
            gameInfo.innerText = 'You WIN !';

            // the game is end so we need to block options
            const prevSubmitBtn = document.querySelector(`.submit-btn-${roundNumber - 1}`);
            prevSubmitBtn.className = 'submit-btn-invisible';

            const selectElementsInRow1 = document.querySelectorAll(`.game-container .row-${roundNumber - 1} select`);
            selectElementsInRow1.forEach((select) => {
                select.disabled = true;
            });

            return;
        }

        // if there is no win yet the game is going on to the next round
        const divGameContainer = document.querySelector('.game-container');

        const paragraphInfo = document.querySelector('.round-number');

        paragraphInfo.innerText = `${roundNumber}`;

        const newRow = document.createElement('div');
        newRow.className = `row row-${roundNumber}`;

        const leftContainer = document.createElement('div');
        leftContainer.className = 'left-game-container';
        const smallCircles = document.createElement('div');
        smallCircles.className = 'small-circles';

        for (let i = 0; i < 5; i++) {
            const smallCircle = document.createElement('div');
            smallCircle.className = 'small-circle';
            smallCircles.appendChild(smallCircle);
        }

        leftContainer.appendChild(smallCircles);

        const rightContainer = document.createElement('div');
        rightContainer.className = 'right-game-container';
        const form = document.createElement('form');
        form.addEventListener('submit', handleSubmit);

        for (let i = 0; i < 5; i++) {
            const select = document.createElement('select');
            select.className = 'select-div brown';
            select.addEventListener('change', colorChange);

            const colors = ['brown', 'green', 'red', 'blue', 'orange', 'purple', 'dgreen', 'yellow'];
            for (const color of colors) {
                const option = document.createElement('option');
                option.className = color;
                option.value = color;
                option.textContent = color;
                select.appendChild(option);
            }
            form.appendChild(select);
        }

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = `submit-btn-${roundNumber} position-btn`;
        submitButton.textContent = 'Check';
        form.appendChild(submitButton);
        rightContainer.appendChild(form);

        // blocking options from prev round
        const prevSubmitBtn = document.querySelector(`.submit-btn-${roundNumber - 1}`);
        prevSubmitBtn.className = 'submit-btn-invisible';

        const selectElementsInRow1 = document.querySelectorAll(`.game-container .row-${roundNumber-1} select`);
        selectElementsInRow1.forEach((select) => {
            select.disabled = true;
        });

        newRow.appendChild(leftContainer);
        newRow.appendChild(rightContainer);

        divGameContainer.appendChild(newRow);
    }

    const colorChange = (event) => {
        const select = event.target;
        const selectedValue = select.value;
        select.className = `select-div ` + selectedValue;
    }

    return (<>
            <div className='game-panel-container'>
                <div className="game-top-container">
                    <RulesBtn>Rules</RulesBtn>
                    <button onClick={handleNewGame} className='new-game-btn button-84'>New Game</button>
                    <div className='panel-info'>
                        <p className='round'></p>
                        <p className='round-number'></p>
                    </div>
                </div>
            </div>
            <p className='game-info'></p>
            <div className='game-container'></div>
        </>
    );
};
