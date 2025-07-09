import { React, useState } from 'react';
import SideNavBar from '../SideNavBar/index.jsx';
import DogIcon from '../../../assets/dibby_Dog_Logo.png';
import MainContent from '../MainContent/index.jsx';
import SignOutPopUp from '../PopUps/SignOut/index.jsx';
import DeleteListingPopUp from '../PopUps/DeleteListing/index.jsx';
import EnterPasswordPopUpEmail from '../PopUps/EnterPasswordEmail/index.jsx';
import EnterPasswordPopUpPassword from '../PopUps/EnterPasswordPassword/index.jsx';
import UpdateEmailPopUp from '../PopUps/UpdateEmailAddress/index.jsx';
import UpdatePasswordPopUp from '../PopUps/UpdatePassword/index.jsx';
import EmailSuccessPopUp from '../PopUps/EmailSuccess/index.jsx';
import PasswordSuccessPopUp from '../PopUps/PasswordSuccess/index.jsx';
import './styles.css';

function Profile() {
  const [selected, setSelected] = useState('myAccount');
  const [signedOut, setSignedOut] = useState(false);
  const [deleteListing, setDeleteListing] = useState(false);
  const [enterPasswordEmail, setEnterPasswordEmail] = useState(false);
  const [enterPasswordPassword, setEnterPasswordPassword] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  console.log('setDL: ', deleteListing);

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
        setEnterPasswordEmail={setEnterPasswordEmail}
        setEnterPasswordPassword={setEnterPasswordPassword}
        setDeleteListing={setDeleteListing}
      />
      {signedOut && <SignOutPopUp onClose={() => setSignedOut(false)} />}
      {enterPasswordEmail && (
        <EnterPasswordPopUpEmail
          onClose={() => setEnterPasswordEmail(false)}
          setUpdateEmail={setUpdateEmail}
          setEnterPasswordEmail={setEnterPasswordEmail}
        />
      )}
      {enterPasswordPassword && (
        <EnterPasswordPopUpPassword
          onClose={() => setEnterPasswordPassword(false)}
          setUpdatePassword={setUpdatePassword}
          setEnterPasswordPassword={setEnterPasswordPassword}
        />
      )}
      {updateEmail && (
        <UpdateEmailPopUp
          setEmailSuccess={setEmailSuccess}
          setUpdateEmail={setUpdateEmail}
          onClose={() => setUpdateEmail(false)}
        />
      )}
      {updatePassword && (
        <UpdatePasswordPopUp
          setUpdatePassword={setUpdatePassword}
          setPasswordSuccess={setPasswordSuccess}
          onClose={() => setUpdatePassword(false)}
        />
      )}
      {emailSuccess && (
        <EmailSuccessPopUp onClose={() => setEmailSuccess(false)} />
      )}
      {passwordSuccess && (
        <PasswordSuccessPopUp onClose={() => setPasswordSuccess(false)} />
      )}
      {deleteListing && (
        <DeleteListingPopUp onClose={() => setDeleteListing(false)} />
      )}
    </div>
  );
}

export default Profile;
