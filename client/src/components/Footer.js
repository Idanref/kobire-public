import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaFacebook, FaInstagram, FaTiktok, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='footer bg-dark'>
      <div className='social'>
        <a href='https://www.instagram.com/kobi_refaeli/' target='_blank' rel='noreferrer'>
          <FaInstagram className='fa-2x' />
        </a>

        <a href='https://www.facebook.com/kobire' target='_blank' rel='noreferrer'>
          <FaFacebook className='fa-2x' />
        </a>

        <a href='https://www.linkedin.com/in/kobire/' target='_blank' rel='noreferrer'>
          <FaLinkedin className='fa-2x' />
        </a>

        <a href='https://wa.me/972522649955' target='_blank' rel='noreferrer'>
          <FaWhatsapp className='fa-2x' />
        </a>
      </div>
      <p>Copyright &copy; 2022 - Kobi Refaeli</p>
    </footer>
  );
};

export default Footer;
