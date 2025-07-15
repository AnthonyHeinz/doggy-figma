import React from 'react';
import './styles.css';
import DogIcon from '../../../../assets/dibby_Dog_Logo.png';

function AccountCreationConfirmation({ onClose }) {
    return(
           <div className='account-creation-confirmation-wrapper'>
             <div className='account-creation-confirmation-content'>
                <p>Your Dibby account has been created!</p>
               <button onClick={onClose}>Return to Account</button>
             </div>
             <img src={DogIcon} className='account-created-dog-icon' />
           </div>
    )
}

export default AccountCreationConfirmation;