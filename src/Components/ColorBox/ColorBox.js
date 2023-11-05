import React from "react";
import './ColorBox.css'

export const ColorBox = props => {

    const colorChange = (event) => {
        const select = event.target;
        const selectedValue = select.value;
        select.className = 'select-div ' + selectedValue;
    }

    return <div>
        <div className='select-container'>
            <select className='select-div grey' onChange={colorChange} >
                <option className='grey' value="grey"></option>
                <option className='green' value="green"></option>
                <option className='red' value="red"></option>
                <option className='blue' value="blue"></option>
                <option className='orange' value="orange"></option>
                <option className='purple' value="purple"></option>
                <option className='pink' value="pink"></option>
                <option className='yellow' value="yellow"></option>
            </select>
        </div>
    </div>
}