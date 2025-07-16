import React from "react"
import './styles.css'

function AccountDetailsDropDown({ onClose }){
return(
    <div className="account-details-drop-down-container">
        <div className="account-details-drop-down-content">
            <button className="account-details-drop-down-option" onClick={() => console.log('Profile clicked')}>
                Profile
            </button>
            <button className="account-details-drop-down-option" onClick={() => console.log('Settings clicked')}>
                Settings
            </button>
            <button className="account-details-drop-down-option" onClick={() => console.log('Sign out clicked')}>
                Sign Out
            </button>
        </div>
    </div>
)
}

export default AccountDetailsDropDown