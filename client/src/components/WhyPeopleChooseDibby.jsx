import React from 'react';
import { useState, useEffect } from 'react';
import './whyPeopleChooseDibby.css';
import dogIcon from '../assets/dibby_Dog_Logo.png';
import dogImage from '../assets/testdog.jpeg';

function WhyPeopleChooseDibby() {
  const testimonials = [
    {
      name: 'Doggo',
      quote: `This honestly made life so much easier. I honestly was pretty nervous about moving with my sister, but Dibby gave us a lot of comfort in our decision.`,
      image: dogImage,
    },
    {
      name: 'NAME',
      quote: `This was crazy helpful. So many apartment tours are during the week and it’s hard to take enough time off to make it worth the cost of the work day.`,
      image: dogImage,
    },
    {
      name: 'NAME',
      quote: `There is no way me and my partner would have been able to move as quickly without Dibby’s help.`,
      image: dogImage,
    },
    {
      name: 'NAME',
      quote: `Something was going on with the property manager, and we received very helpful advice.`,
      image: dogImage,
    },
    {
      name: 'NAME',
      quote: `This honestly made life so much easier. I honestly was pretty nervous about moving with my sister, but Dibby gave us a lot of comfort in our decision.`,
      image: dogImage,
    },
    {
      name: 'NAME',
      quote: `This was crazy helpful. So many apartment tours are during the week and it’s hard to take enough time off to make it worth the cost of the work day.`,
      image: dogImage,
    },
    {
      name: 'NAME',
      quote: `There is no way me and my partner would have been able to move as quickly without Dibby’s help.`,
      image: dogImage,
    },
    {
      name: 'NAME',
      quote: `Something was going on with the property manager, and we received very helpful advice.`,
      image: dogImage,
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount(4));

  useEffect(() => {
    const updateCount = () => setVisibleCount(getVisibleCount());
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  function getVisibleCount() {
    const width = window.innerWidth;
    if (width >= 1200) return 4;
    if (width >= 992) return 3;
    if (width >= 768) return 2;
    return 1;
  }

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + 1, testimonials.length - visibleCount)
    );
  };

  const visibleCards = testimonials.slice(
    startIndex,
    startIndex + visibleCount
  );

  return (
    <section className='testimonials-section'>
      <div className='how-it-works-gradient-three'></div>
      <h2>Why people choose Dibby</h2>
      <p className='subtitle'>
        Hear what real customers have to say about their Dibby experience.
      </p>
      <div className='carousel-wrapper'>
        <button
          className='carousel-btn'
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          ‹
        </button>
        <div className='carousel-track'>
          {visibleCards.map((card, index) => (
            <div className='carousel-card testimonial-card' key={index}>
              <div
                className='testimonial-background'
                style={{ backgroundImage: `url(${card.image})` }}
              >
                <div className='testimonial-overlay'>
                  <p className='quote'>“{card.quote}”</p>
                  <p className='name'>– {card.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className='carousel-btn'
          onClick={handleNext}
          disabled={startIndex + visibleCount >= testimonials.length}
        >
          ›
        </button>
      </div>
      <img src={dogIcon} alt='dog' className='dog-icon-bottom-left' />
      <img src={dogIcon} alt='dog' className='dog-icon-top-right' />
      <div className='how-it-works-gradient-four'></div>
      <div className='how-it-works-gradient-five'></div>
    </section>
  );
}

export default WhyPeopleChooseDibby;
