import React from 'react';
import SignOutIcon from '../../../assets/signOutIcons.png';

function SignOut () {
    return(
        <div className='sign-out'>
            <img src={SignOutIcon} alt='signOutIcon' className='sign-out-icon' />
            Sign Out
        </div>
    )
}

export default SignOut;