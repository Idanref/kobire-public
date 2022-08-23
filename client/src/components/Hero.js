import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <header className='hero' id='home'>
      <div className='content'>
        <h1>לתפוס את הרגע</h1>
        <p>סדנת צילום בסמארטפון • חוויה גדולה למשפחה ולחברים</p>
        <Link to='order' className='btn' spy={true} smooth={true} offset={-100} duration={500}>
          <FontAwesomeIcon icon={faChevronLeft} /> להזמנת מקום
        </Link>
      </div>
    </header>
  );
};

export default Hero;
