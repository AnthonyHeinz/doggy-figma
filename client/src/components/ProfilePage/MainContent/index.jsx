import React from 'react';
import MyAccount from '../MyAccount/index.jsx';
import MyPropertyListings from '../ProperyListings/index.jsx';
import './styles.css';

function MainContent({ selected, setEnterPasswordEmail, setEnterPasswordPassword, setDeleteListing }) {
  return (
    <div className='main-content'>
      <div className='main-content-gradient-one'></div>
      <div className='main-content-gradient-two'></div>
      <div className='main-content-gradient-three'></div>
      <div className='main-content-gradient-four'></div>
      {selected === 'myAccount' ? (
        <MyAccount
          setEnterPasswordEmail={setEnterPasswordEmail}
          setEnterPasswordPassword={setEnterPasswordPassword}
        />
      ) : (
        <MyPropertyListings setDeleteListing={setDeleteListing} />
      )}
    </div>
  );
}

export default MainContent;
