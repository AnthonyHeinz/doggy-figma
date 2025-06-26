import React from 'react';
import './howItWorks.css';
import dogIcon from '../assets/dibby_Dog_Logo.png';

function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Pick a property',
      description:
        'Choose your next home from our selection of listings or from another site.',
      linkText: 'View Property Listings →',
      href: 'View_Property_Listing',
      picture: dogIcon,
    },
    {
      number: 2,
      title: 'Get it Checked Out',
      description:
        'Send one of our gig Viewers to inspect and tour the property for you.',
      linkText: '',
      picture: dogIcon,
    },
    {
      number: 3,
      title: 'Receive a Report',
      description: 'Receive a comprehensive report on your future home.',
      linkText: 'See Example Report →',
      href: 'See_Example_Report',
      picture: dogIcon,
    },
  ];

  return (
    <section className='how-it-works-section'>
      <div className='how-it-works-gradient-one'></div>
      <h2 className='how-it-works-title'>How it Works</h2>
      <div className='how-it-works-steps'>
        {steps.map((step, index) => (
          <div className='step' key={index}>
            <div className='step-number'>{step.number}</div>
            <h3 className='step-title'>{step.title}</h3>
            <p className='step-description'>{step.description}</p>
            {step.linkText && (
              <a className='step-link' href={step.href}>
                {step.linkText}
              </a>
            )}
            <img src={step.picture} alt='dog' className='step-dog' />
          </div>
        ))}
      </div>
       <div className='how-it-works-gradient-two'></div>
    </section>
  );
}

export default HowItWorks;
