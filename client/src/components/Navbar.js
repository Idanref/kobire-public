import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-scroll';

const Navbar = () => {
  // change nav color when scrolling
  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 130) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener('scroll', changeColor);

  return (
    <div id='navbar' className={color ? 'navbar navbar-bg' : 'navbar top'}>
      <h1 className='logo'>
        <span className='text-primary'>
          <FontAwesomeIcon icon={faCamera} /> Kobi
        </span>
        Refaeli
      </h1>
      <nav>
        <ul>
          {/* Smooth Scrolling */}
          {/* <li>
            <Link to='contact' spy={true} smooth={true} offset={-100} duration={500}>
              צרו קשר
            </Link>
          </li> */}

          <li>
            <Link to='info' spy={true} smooth={true} offset={-100} duration={500}>
              אודות
            </Link>
          </li>
          <li>
            <Link to='comments' spy={true} smooth={true} offset={-100} duration={500}>
              חוות דעת
            </Link>
          </li>
          <li>
            <Link to='order' spy={true} smooth={true} offset={-100} duration={500}>
              להזמנות
            </Link>
          </li>
          <li>
            <Link to='gallery' spy={true} smooth={true} offset={-100} duration={500}>
              גלריה
            </Link>
          </li>
          <li>
            <Link to='home' spy={true} smooth={true} offset={-100} duration={500}>
              בית
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
