import React, { useState } from 'react';
import './RulesBtn.css'; // Zaimportuj plik ze stylami CSS

export const RulesBtn = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <div>
            <button onClick={toggleModal} className='button-84'>Rules</button>
            {isModalVisible && (
                <div className="modal-container">
                    <div className="modal-content">
                        <span className="close-button" onClick={toggleModal}>CLOSE</span>
                        <p> Mastermind is a classic code-breaking game in which one player (the Code Breaker) tries to guess a secret code (a sequence of colors that do not repeat) in as few attempts as possible. The Code Breaker starts the game by creating their initial guess. Select the colors for each circle simply by clicking on them (there is 8 available colors to pick) and then click the "Check" button to see if your guess is correct. After making a guess, you will see hints on the left side of the game.</p>
                        <p>Hints:  Small red circles indicate that you've hit a correct color in the exact position in that round. (BUT you won't know which of the colors exactly). Small black circles mean that a correct color is in the code but in the wrong place, and white circles mean that some of the colors are not part of the code.</p>
                        <p>Example:  Your hint is 2 red 1 black and 2 white small circles. That means that in that round - 2 of 5 colors are in good position. 1 of 5 colors is in the code but on the wrong place and 2 of 5 colors picked by you are not part of the code</p><p>The fact that the red circle in the hint is the first one from the left does not mean that the circle on the left is correctly guessed. It may be, but it doesn't have to be!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

