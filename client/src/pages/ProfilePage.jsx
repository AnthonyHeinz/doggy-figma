import React from 'react';
import NavBar from '../components/Navbar/index.jsx';
import Profile from '../components/ProfilePage/Profile/index.jsx';

function ProfilePage () {
    return (
        <div className='profile-page' style={{ overflow: 'hidden' }}>
            <NavBar />
            <Profile />
        </div>
    )
}

export default ProfilePage;