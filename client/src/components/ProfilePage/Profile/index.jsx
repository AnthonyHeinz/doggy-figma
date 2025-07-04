import { React, useState } from 'react';
import SideNavBar from '../SideNavBar/index.jsx';
import MyAccount from '../MyAccount/index.jsx';


function Profile () {
    const [ selected, setSelected ] = useState('myAccount')


    return(
        <div>
            <SideNavBar selected={selected} setSelected={setSelected} />
            <MainContent selected={selected} />
        </div>
    )
}

export default Profile;