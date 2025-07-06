import React from 'react';
import './styles.css';

function () {
    return (
    <div className='sign-out-popup-wrapper'>
      <div className='sign-out-popup-content'>
        <div className='sign-out-popup-content-text'>Enter 
        </div>
        <div className='sign-out-popup-form'>
            <input></input>
            <button className='sign-out-pop-up-continue'>Continue</button>
        </div>
      </div>
      <button onClick={onClose} className='sign-out-pop-up-close-window'><img src={CloseWindow} /></button>
    </div>
    )
}

export default ;