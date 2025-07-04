import { React, useState } from 'react';
import SideNavBar from '../SideNavBar/index.jsx';
import MyAccount from '../MyAccount/index.jsx';


function Profile () {
    const [ selected, setSelected ] = useState('profile')


    return(
        <div>
            <SideNavBar selected={selected}/>
        </div>
    )
}

export default Profile;