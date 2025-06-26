import React from 'react';
import './theDibbyExperience.css';
import greenCheckMark from '../assets/green_Check_Mark.png';
import dogIcon from '../assets/dibby_Dog_Logo.png';

function TheDibbyExperience() {
  const features = [
    'Interior and exterior photos',
    'Neighborhood tour',
    'Property and neighborhood videos',
    'Street parking check',
    'Written report',
    'Smell and noise level test',
    'FaceTime call',
    'Water pressure test',
  ];

  return (
    <section className='dibby-experience'>
      <div className='experience-text'>
        <h1>The Dibby Experience</h1>
        <p>
          Get the full picture without actually being there. For $49, we’ll send
          a trusted Viewer to tour a property on your behalf. You’ll get
          everything you need to decide if it’s worth your time without the
          hassle of going in person.
        </p>
      </div>
      <div className='experience-card'>
        <h3>What We Provide</h3>
        <ul className='feature-grid'>
          {features.map((item, index) => (
            <li key={index}>
              <img
                src={greenCheckMark}
                alt='greenCheckMark'
                className='check-icon'
              ></img>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <img src={dogIcon} alt='dogIcon' className='dibby-experience-dog-icon' />
    </section>
  );
}

export default TheDibbyExperience;
