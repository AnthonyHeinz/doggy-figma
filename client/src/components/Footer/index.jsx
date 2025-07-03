import React from 'react';
import './styles.css';
import twitterIcon from '../../assets/Twitter.png'
import instaIcon from '../../assets/Insta.png'
import linkedinIcon from '../../assets/Linkedin.png'

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-main-column'>
          <h3>Dibby</h3>
          <p>
            Your number one site for making the renting process as easy as
            possible.
          </p>
          <h4>Follow Us</h4>
          <div className='social-icons'>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
              <img src = {twitterIcon} alt = 'twitterIcon' className='social-icons'/>
            </a>
            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
              <img src = {instaIcon} alt = 'instaIcon' className='social-icons'/>
            </a>
            <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
              <img src = {linkedinIcon} alt = 'linkedinIcon' className='social-icons'/>
            </a>
          </div>
        </div>

        <div className='footer-column'>
          <h4>Become a Viewer</h4>
          <ul>
            <li><a href='/create-profile'>Create a profile</a></li>
            <li><a href='/viewers-hub'>Viewer’s hub</a></li>
            <li><a href='/inbox'>Inbox</a></li>
          </ul>
        </div>

        <div className='footer-column'>
          <h4>Post Your Own Listing</h4>
          <ul>
            <li><a href='/post-listing'>Post a listing</a></li>
            <li><a href='/your-listings'>Your listings</a></li>
            <li><a href='/boost-listing'>Boost your listing</a></li>
          </ul>
        </div>

        <div className='footer-column'>
          <h4>Help</h4>
          <ul>
            <li><a href='/faq'>FAQ</a></li>
            <li><a href='/about-us'>About us</a></li>
            <li><a href='/testimonials'>Testimonials</a></li>
            <li><a href='/contact'>Contact us</a></li>
          </ul>
        </div>

        <div className='footer-column policy-links'>
          <ul>
            <li><a href='/terms'>Terms and Conditions</a></li>
            <li><a href='/privacy'>Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
