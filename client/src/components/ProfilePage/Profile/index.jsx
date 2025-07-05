import { React, useState } from 'react';
import SideNavBar from '../SideNavBar/index.jsx';
import MainContent from '../MainContent/index.jsx';
import './styles.css';


function Profile () {
    const [ selected, setSelected ] = useState('myAccount');
    console.log('state: ', selected);


    return(
        <div className='profile'>
            <SideNavBar selected={selected} setSelected={setSelected} />
            <MainContent selected={selected} />
        </div>
    )
};

export default Profile; 