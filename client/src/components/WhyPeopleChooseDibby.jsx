import React from 'react';
import './whyPeopleChooseDibby.css';
import dogIcon from '../assets/dibby_Dog_Logo.png';

const testimonials = [
  {
    name: 'NAME',
    quote: `This honestly made life so much easier. I honestly was pretty nervous about moving with my sister, but Dibby gave us a lot of comfort in our decision.`,
  },
  {
    name: 'NAME',
    quote: `This was crazy helpful. So many apartment tours are during the week and it’s hard to take enough time off to make it worth the cost of the work day.`,
  },
  {
    name: 'NAME',
    quote: `There is no way me and my partner would have been able to move as quickly without Dibby’s help.`,
  },
  {
    name: 'NAME',
    quote: `Something was going on with the property manager, and we received very helpful advice.`,
  },
];

function WhyPeopleChooseDibby() {
  return (
    <section className='testimonials-section'>
      <div className='how-it-works-gradient-three'></div>
      <h2>Why people choose Dibby</h2>
      <p className='subtitle'>
        Hear what real customers have to say about their Dibby experience.
      </p>
      <div className='testimonials-grid'>
        {testimonials.map((item, idx) => (
          <div className='testimonial-card' key={idx}>
            <div className='testimonial-header'>
              <div className='avatar' />
              <p className='name'>{item.name}</p>
            </div>
            <p className='quote'>“{item.quote}”</p>
          </div>
        ))}
      </div>
      <img src={dogIcon} alt='dog' className='dog-icon-bottom-left' />
      <img src={dogIcon} alt='dog' className='dog-icon-top-right' />
      <div className='how-it-works-gradient-four'></div>
      <div className='how-it-works-gradient-five'></div>
    </section>
  );
}

export default WhyPeopleChooseDibby;
