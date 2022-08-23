import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import ImageGallery from 'react-image-gallery';
import styled from 'styled-components';

import { galleryOne, galleryTwo, galleryThree, galleryFour, galleryFive } from '../images/gallery';

const images = [
  {
    original: galleryOne,
    thumbnail: galleryOne,
  },
  {
    original: galleryTwo,
    thumbnail: galleryTwo,
  },
  {
    original: galleryThree,
    thumbnail: galleryThree,
  },
  {
    original: galleryFour,
    thumbnail: galleryFour,
  },
  {
    original: galleryFive,
    thumbnail: galleryFive,
  },
];

const Gallery = () => {
  return (
    <section id='gallery' className='gallery flex-grid section-padding'>
      <header className='section-header'>
        <h2>הגלריה שלי</h2>
        <p dir='rtl'>קבלו הצצה לחלק מתמונותיי אשר צולמו באמצעות הסמארטפון בלבד!</p>
      </header>

      <GalleryContainer>
        <div className='container'>
          <ImageGallery items={images} showPlayButton={false} useBrowserFullscreen={false} autoPlay={true} />
        </div>
      </GalleryContainer>

      <div className='gallery-container'>
        <a href='https://www.instagram.com/kobi_refaeli/?hl=en' className='btn' target='_blank' rel='noreferrer'>
          <FontAwesomeIcon icon={faChevronLeft} /> עוד בעמוד האינסטגרם שלי
        </a>
      </div>
    </section>
  );
};

const GalleryContainer = styled.div`
  .container {
    display: flex;
    justify-content: center;
  }

  .image-gallery {
  }

  .image-gallery-slide {
    max-width: 600px;
  }
`;

export default Gallery;
