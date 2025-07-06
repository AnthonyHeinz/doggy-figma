import { React, useState } from 'react';
import SideNavBar from '../SideNavBar/index.jsx';
import DogIcon from '../../../assets/dibby_Dog_Logo.png';
import MainContent from '../MainContent/index.jsx';
import './styles.css';


function Profile () {
    const [ selected, setSelected ] = useState('myAccount');
    console.log('state: ', selected);


    return(
        <div className='profile'>
             <img src={DogIcon} alt='dogIcon' className='profile-dog-icon' />
            <SideNavBar selected={selected} setSelected={setSelected} />
            <MainContent selected={selected} />
        </div>
    )
};

export default Profile; 