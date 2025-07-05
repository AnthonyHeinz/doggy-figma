import React from 'react';
import MyAccount from '../MyAccount/index.jsx';
import MyPropertyListings from '../ProperyListings/index.jsx'
import './styles.css';


function MainContent ({ selected }) {
    return (
        <div className='main-content'>
            {selected === 'myAccount' ? <MyAccount /> : <MyPropertyListings />}
        </div>
    )
}

export default MainContent;