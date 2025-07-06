import { React, useState } from 'react';
import SideNavBar from '../SideNavBar/index.jsx';
import DogIcon from '../../../assets/dibby_Dog_Logo.png';
import MainContent from '../MainContent/index.jsx';
import SignOutPopUp from '../PopUps/SignOut/index.jsx';
// import DeleteListingPopUp from '../PopUps/DeleteListing/index.jsx';
import EnterPasswordPopUp from '../PopUps/EnterPassword/index.jsx';
// import UpdateEmailPopUp from '../PopUps/EmailUpdated/index.jsx';
// import UpdatePasswordPopUp from '../PopUps/PasswordUpdated/index.jsx';
// import EmailSuccessPopUp from '../PopUps/EmailUpdated/index.jsx';
// import PasswordSuccessPopUp from '../PopUps/PasswordUpdated/index.jsx';

import './styles.css';

function Profile() {
  const [selected, setSelected] = useState('myAccount');
  const [signedOut, setSignedOut] = useState(false);
  // const [ deleteListing, setDeleteListing ] = useState(false);
  const [enterPassword, setEnterPassword] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);
  // const [ updatePassword, setUpdatePassword ] = useState(false);
  // const [ emailSuccess, setEmailSuccess ]= useState(false);
  // const [ passwordSuccess, setPasswordSuccess ] = useState(false);

  return (
    <div className='profile'>
      <img src={DogIcon} alt='dogIcon' className='profile-dog-icon' />
      <SideNavBar
        selected={selected}
        setSelected={setSelected}
        setSignedOut={setSignedOut}
      />
      <MainContent
        selected={selected}
        setEnterPassword={setEnterPassword}
      />
      {signedOut && <SignOutPopUp onClose={() => setSignedOut(false)} />}
      {/* {deleteListing && (<DeleteListingPopUp onClose={() => setDeleteListing(true)} />)} */}
      {enterPassword && (
        <EnterPasswordPopUp onClose={() => setEnterPassword(false)} />
      )}
      {updateEmail && (
        <UpdateEmailPopUp onClose={() => setUpdateEmail(false)} />
      )}
      {/* {updatePassword && (<UpdatePasswordPopUp onClose={() => setUpdatePassword(true)} />)}
            {emailSuccess && (<EmailSuccessPopUp onClose={() => setEmailSuccess(true)} />)}
            {passwordSuccess && (<PasswordSuccessPopUp onClose={() => setPasswordSuccess(true)} />)}
             */}
    </div>
  );
}

export default Profile;
