import React, {useState} from 'react';
import './Game.css';
import {RulesBtn} from "../RulesBtn/RulesBtn";

export const Game = () => {

    const [errorMessage, setErrorMessage] = useState('');
    console.log(errorMessage);
    const handleNewGame = async () => {
        // asking client if he wants to play new game
        const userConfirmed = window.confirm('Start a new game?');

        if (userConfirmed) {
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

            if (data !== 'new game started') {
                throw new Error('something went really wrong');
            }

            if (data === 'new game started') {
                console.log('game can be started')

                // here we want to create first row to start the game
                const roundNumber = 1;

                // we clean board from previous game
                const divGameContainer = document.querySelector('.game-container');
                divGameContainer.innerHTML = '';

                // we set text to Round 1
                const pNumber = document.querySelector('.round-number');
                pNumber.innerText = '1';
                const textRound = document.querySelector('.round');
                textRound.innerText = 'Round';


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
                    select.className = 'select-div grey';
                    select.addEventListener('change', colorChange);

                    const colors = ['grey', 'green', 'red', 'blue', 'orange', 'purple', 'pink', 'yellow'];
                    for (const color of colors) {
                        const option = document.createElement('option');
                        option.className = color;
                        option.value = color;
                        select.appendChild(option);
                    }
                    form.appendChild(select);
                }

                const submitButton = document.createElement('button');
                submitButton.type = 'submit';
                submitButton.className = 'submit-btn-1';
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
        e.preventDefault();

        // get selected colors
        const selectedElements = e.target.getElementsByTagName('select');
        const selectedValues = Array.from(selectedElements).map((select) => select.value);
        console.log('values', selectedValues);

        // check if colors are all different
        const areAllUnique = (arr) => {
            const uniqueSet = new Set(arr);
            return uniqueSet.size === arr.length;
        }

        const isUnique = areAllUnique(selectedValues);

        if (isUnique) {
            console.log('send this data to backend');
        } else {
            console.log('Selected colors must be unique; no duplicates allowed.')
            return;
        }
        console.log('this message only show up if colors are different')
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
        console.log(data);
        console.log(data.theSame);
        console.log(data.differentIndex);



        // getting values from backend
        // - new round number

        // - hit array lik  red red black white white

        const numberForNextRound = document.querySelector('.round-number');
        // console.log(numberForNextRound.innerText);

        // if response is positive it's time to generate new line of colors

        const roundNumber = Number(numberForNextRound.innerText)+1;

        // pobieram 5 elementow z poprzednije rundy
        const circlesElementsInRow1 = document.querySelectorAll(`.game-container .row-${roundNumber-1} .small-circle`);
        console.log(circlesElementsInRow1, 'to sa kolka male');
        // ustawiam kolorki w zaleznosci od tego jaka byla odpowiedz z backendu
        // for (let i = 0; i < circlesElementsInRow1.length; i++) {
        //     const element = circlesElementsInRow1[i];
        //
        //     if (i < data.theSame) {
        //         element.classList.add('red');
        //     } else if (i < data.differentIndex) {
        //         element.classList.add('black');
        //     }
        // }

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

        if (data.theSame === 5) {
            console.log('you win!!! ')
            const gameInfo = document.querySelector('.game-info');
            gameInfo.innerText = 'You WIN !';
            return
        }



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
            select.className = 'select-div grey';
            select.addEventListener('change', colorChange);

            const colors = ['grey', 'green', 'red', 'blue', 'orange', 'purple', 'pink', 'yellow'];
            for (const color of colors) {
                const option = document.createElement('option');
                option.className = color;
                option.value = color;
                select.appendChild(option);
            }
            form.appendChild(select);
        }

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = `submit-btn-${roundNumber}`;
        submitButton.textContent = 'Check';
        form.appendChild(submitButton);
        rightContainer.appendChild(form);

        // pobieramy btn submit z poprzedniej lini i zmieniamy mu klase na invisible
        const prevSubmitBtn = document.querySelector(`.submit-btn-${roundNumber - 1}`);
        prevSubmitBtn.className = 'submit-btn-invisible';

        // pobieramy selecty o klasie 1 i wstawiamy im klase disable true
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
                    <button onClick={handleNewGame} className='new-game-btn'>New Game</button>
                    <div className='panel-info'>
                        <p className='round'></p>
                        <p className='round-number'></p>
                        <p className='game-info'></p>
                    </div>
                </div>
            </div>
            <div className='game-container'>
                {/*<div className="row row-1">*/}
                {/*    <div className='left-game-container'>*/}
                {/*        <div className='small-circles'>*/}
                {/*            <div className='small-circle'></div>*/}
                {/*            <div className='small-circle'></div>*/}
                {/*            <div className='small-circle'></div>*/}
                {/*            <div className='small-circle'></div>*/}
                {/*            <div className='small-circle'></div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className='right-game-container'>*/}
                {/*        <form onSubmit={handleSubmit}>*/}
                {/*            <select className='select-div grey' onChange={colorChange}>*/}
                {/*                <option className='grey' value="grey"></option>*/}
                {/*                <option className='green' value="green"></option>*/}
                {/*                <option className='red' value="red"></option>*/}
                {/*                <option className='blue' value="blue"></option>*/}
                {/*                <option className='orange' value="orange"></option>*/}
                {/*                <option className='purple' value="purple"></option>*/}
                {/*                <option className='pink' value="pink"></option>*/}
                {/*                <option className='yellow' value="yellow"></option>*/}
                {/*            </select>*/}
                {/*            <select className='select-div grey' onChange={colorChange}>*/}
                {/*                <option className='grey' value="grey"></option>*/}
                {/*                <option className='green' value="green"></option>*/}
                {/*                <option className='red' value="red"></option>*/}
                {/*                <option className='blue' value="blue"></option>*/}
                {/*                <option className='orange' value="orange"></option>*/}
                {/*                <option className='purple' value="purple"></option>*/}
                {/*                <option className='pink' value="pink"></option>*/}
                {/*                <option className='yellow' value="yellow"></option>*/}
                {/*            </select>*/}
                {/*            <select className='select-div grey' onChange={colorChange}>*/}
                {/*                <option className='grey' value="grey"></option>*/}
                {/*                <option className='green' value="green"></option>*/}
                {/*                <option className='red' value="red"></option>*/}
                {/*                <option className='blue' value="blue"></option>*/}
                {/*                <option className='orange' value="orange"></option>*/}
                {/*                <option className='purple' value="purple"></option>*/}
                {/*                <option className='pink' value="pink"></option>*/}
                {/*                <option className='yellow' value="yellow"></option>*/}
                {/*            </select>*/}
                {/*            <select className='select-div grey' onChange={colorChange}>*/}
                {/*                <option className='grey' value="grey"></option>*/}
                {/*                <option className='green' value="green"></option>*/}
                {/*                <option className='red' value="red"></option>*/}
                {/*                <option className='blue' value="blue"></option>*/}
                {/*                <option className='orange' value="orange"></option>*/}
                {/*                <option className='purple' value="purple"></option>*/}
                {/*                <option className='pink' value="pink"></option>*/}
                {/*                <option className='yellow' value="yellow"></option>*/}
                {/*            </select>*/}
                {/*            <select className='select-div grey' onChange={colorChange}>*/}
                {/*                <option className='grey' value="grey"></option>*/}
                {/*                <option className='green' value="green"></option>*/}
                {/*                <option className='red' value="red"></option>*/}
                {/*                <option className='blue' value="blue"></option>*/}
                {/*                <option className='orange' value="orange"></option>*/}
                {/*                <option className='purple' value="purple"></option>*/}
                {/*                <option className='pink' value="pink"></option>*/}
                {/*                <option className='yellow' value="yellow"></option>*/}
                {/*            </select>*/}
                {/*            <button type='submit' className='submit-btn'>Check</button>*/}
                {/*        </form>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </>
    );
};
