import React from 'react';
import profilePhoto from '../images/home/kobi.jpg';
import aboutPhoto from '../images/home/about-photo.png';

const AboutHome = () => {
  return (
    <section className='flex-columns' id='about'>
      <div className='row'>
        <div className='column'>
          <div className='column-1'>
            <img src={aboutPhoto} className='profile-photo' alt='' />
          </div>
        </div>
        <div className='column'>
          <div className='column-2 right-to-left  bg-light-white'>
            <h2 className='text-align-center'>אודותיי • קובי רפאלי</h2>
            <p className=''>
              היי, שמי קובי רפאלי ותחום התמחותי הינו צילום אומנותי בסמארטפון.
              <br />
              אולי בעבר נתקלתם בחשבון האינסטגרם שלי, המכיל המון תמונות מזוויות צילום בלתי שגרתיות, סגנונות צילום רבים ומגוונים ובעיקר מעוררי השראה.
              <br />
              כמו כן, אני מנהל חשבונות הנותנים במה לצלמים מכל העולם, אשר מכילים מעל כחצי מיליון עוקבים.
              <br />
              בעברי נבחרתי בתואר ״צלם השנה״ במסגרת תחרות האוסקר הישראלי של אינסטגרם והשתתפתי בקמפיינים רבים בארץ ובעולם עם חברות מובילות כמו:
              <br />
              • הובלת טור של שלושה ימי צילום ברחבי הארץ במסגרת השקה של דגמי רכב הספורט ״מאזרטי״.
              <br />
              • מפגש אינסטגרמרים באיים המלדיביים ובהרים המושלגים של צרפת במסגרת שת״פ עם חברת ״קלאב מד״.
              <br />
              ועוד המון הזדמנויות מדהימות, ושוב, הכל עם הסמארטפון בלבד!
            </p>
            {/* <a href="#" className="btn btn-outline">
                <i className="fas fa-chevron"></i>
                Read More
              </a> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHome;
