import React, { useState } from 'react';
import './RulesBtn.css'; // Zaimportuj plik ze stylami CSS

export const RulesBtn = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <div>
            <button onClick={toggleModal}>Rules</button>
            {isModalVisible && (
                <div className="modal-container">
                    <div className="modal-content">
                        <span className="close-button" onClick={toggleModal}>CLOSE</span>
                        <p>Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.Tutaj znajduje się Twoja informacja.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

