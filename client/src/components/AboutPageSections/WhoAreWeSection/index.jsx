import React from 'react';
import PackingBoxes from '../../../assets/packing-boxes.png';
import DogIcon from '../../../assets/dibby_Dog_Logo.png';
import './styles.css';

function WhoAreWe() {
    return(
        <div className='who-are-we-section'>
            <div className='who-are-we-section-content'>
                <img src={DogIcon} alt='dogIcon' className='about-who-are-we-dog-icon' />
                <div className='who-are-we-text'>
                    <h3>Who are we?</h3>
                    <p>Dibby is an on-demand platform that helps you trust what you can’t see in person. Whether you’re moving to a new city or too busy to tour yourself, Dibby lets you send a verified gig worker to inspect it before you commit. We provide detailed photos, videos, FaceTime walkthroughs, written reports, and neighborhood insights — all delivered directly to your inbox.</p>
                </div>
                <img src={PackingBoxes} alt='packingBoxes' className='packing-boxes' />
            </div>
        </div>
    )
}

export default WhoAreWe;