import React from 'react';
import MyAccount from '../MyAccount/index.jsx';
import DogIcon from '../../../assets/dibby_Dog_Logo.png';
import MyPropertyListings from '../ProperyListings/index.jsx'
import './styles.css';


function MainContent ({ selected }) {
    return (
        <div className='main-content'>
                  <div className='main-content-gradient-one'></div>
                  <div className='main-content-gradient-two'></div>
                  <div className='main-content-gradient-three'></div>
                  <div className='main-content-gradient-four'></div>
            {selected === 'myAccount' ? <MyAccount /> : <MyPropertyListings />}
        </div>
    )
}

export default MainContent;