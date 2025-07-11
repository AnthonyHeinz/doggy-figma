import React, { useState, useEffect } from 'react';
import './styles.css';
import dogIcon from '../../../assets/dibby_Dog_Logo.png';
import dogImage from '../../../assets/testdog.jpeg';

function WhyPeopleChooseDibby() {
  const testimonials = [
    {
      name: 'Doggo 1',
      quote: `This honestly made life so much easier. I honestly was pretty nervous about moving with my sister, but Dibby gave us a lot of comfort in our decision.`,
      image: dogImage,
    },
    {
      name: 'Doggo 2',
      quote: `This was crazy helpful. So many apartment tours are during the week and it’s hard to take enough time off to make it worth the cost of the work day.`,
      image: dogImage,
    },
    {
      name: 'Doggo 3',
      quote: `There is no way me and my partner would have been able to move as quickly without Dibby’s help.`,
      image: dogImage,
    },
    {
      name: 'Doggo 4',
      quote: `Something was going on with the property manager, and we received very helpful advice.`,
      image: dogImage,
    },
    {
      name: 'Doggo 5',
      quote: `This honestly made life so much easier. I honestly was pretty nervous about moving with my sister, but Dibby gave us a lot of comfort in our decision.`,
      image: dogImage,
    },
    {
      name: 'Doggo 6',
      quote: `This was crazy helpful. So many apartment tours are during the week and it’s hard to take enough time off to make it worth the cost of the work day.`,
      image: dogImage,
    },
    {
      name: 'Doggo 7',
      quote: `There is no way me and my partner would have been able to move as quickly without Dibby’s help.`,
      image: dogImage,
    },
    {
      name: 'Doggo 8',
      quote: `Something was going on with the property manager, and we received very helpful advice.`,
      image: dogImage,
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [animateDirection, setAnimateDirection] = useState('');
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  function getVisibleCount() {
    const width = window.innerWidth;
    if (width >= 1200) return 4;
    if (width >= 992) return 3;
    if (width >= 768) return 2;
    return 1;
  }

  const triggerAnimation = (direction, updateFn) => {
    setAnimateDirection(direction);
    updateFn();
  };

  const handlePrev = () => {
    if (startIndex === 0) return;
    triggerAnimation('why-people-choose-dibby-slide-right', () =>
      setStartIndex((prev) => Math.max(prev - 1, 0))
    );
  };

  const handleNext = () => {
    if (startIndex + visibleCount >= testimonials.length) return;
    triggerAnimation('why-people-choose-dibby-slide-left', () =>
      setStartIndex((prev) =>
        Math.min(prev + 1, testimonials.length - visibleCount)
      )
    );
  };

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchMove = (e) => setTouchEndX(e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) handleNext();
    else if (distance < -minSwipeDistance) handlePrev();
    setTouchStartX(null);
    setTouchEndX(null);
  };

  useEffect(() => {
    const updateCount = () => setVisibleCount(getVisibleCount());
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  useEffect(() => {
    if (animateDirection) {
      const timeout = setTimeout(() => setAnimateDirection(''), 300);
      return () => clearTimeout(timeout);
    }
  }, [animateDirection]);

  const visibleCards = testimonials.slice(
    startIndex,
    startIndex + visibleCount
  );

  return (
    <section className='testimonials-section-container'>
      <div className='testimonials-section-gradient-three'></div>
      <div className='testimonials-section-header-with-dog'>
        <h2 className='testimonials-section-h2-text'>
          Why people choose Dibby
        </h2>
        <img
          src={dogIcon}
          alt='dog'
          className='testimonials-section-dog-icon-top-right'
        />
      </div>
      <p className='testimonials-section-subtitle'>
        Hear what real customers have to say about their Dibby experience.
      </p>
      <div className='testimonials-section-carousel-wrapper'>
        <button
          className='testimonials-section-carousel-btn'
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          ‹
        </button>
        <div
          className={`testimonials-section-carousel-track ${animateDirection}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {visibleCards.map((card, index) => (
            <div className='testimonials-section-carousel-card' key={index}>
              <div
                className='testimonials-section-background'
                style={{ backgroundImage: `url(${card.image})` }}
              >
                <div className='testimonials-section-overlay'>
                  <p className='quote'>“{card.quote}”</p>
                  <p className='name'>– {card.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className='testimonials-section-carousel-btn'
          onClick={handleNext}
          disabled={startIndex + visibleCount >= testimonials.length}
        >
          ›
        </button>
      </div>
      <img
        src={dogIcon}
        alt='dog'
        className='testimonials-section-dog-icon-bottom-left'
      />
      <div className='testimonials-section-gradient-four'></div>
      <div className='testimonials-section-gradient-five'></div>
    </section>
  );
}

export default WhyPeopleChooseDibby;
