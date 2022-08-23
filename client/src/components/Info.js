import React from 'react';
import styled from 'styled-components';

const Info = () => {
  return (
    <Wrapper>
      <section className='info-section' id='info'>
        <br></br>
        <div className='info-container direction-rtl'>
          <hr />
          <h2 className='text-align-center'>מה תלמדו בסדנה?</h2>
          <br></br>
          <b>רוצים להפוך כל תמונה שלכם לסיפור?</b>
          <b>בא לכם לגלות איך להפוך את הסמארטפון שלכם למצלמה?</b>
          <b>הצטרפו לסדנת צילום שתשנה לכם את הפריים עם האינסטגרמר קובי רפאלי!</b>
          <br></br>
          <p>
            מכירים את זה שאתם הולכים ברחוב, בחורשה ליד הבית ורואים את הרגעים היפים של החיים? אולי בעצם אתם מאלה שמטיילים במקומות הכי מרהיבים שיש לעולם להציע לנו ואתם רוצים לנצור
            לכם את הרגע? או אם אתם רוצים להפיץ לעולם את מה שיש לכם להציע ופשוט לא כ"כ יודעים איך? התשובה היא : בקלות!
          </p>
          <p>
            במהלך הסדנה קובי, אחד מצלמי הסמארטפון המובילים בארץ ובעולם ומהאינסטגרמים המוכרים והמשפיעים ביותר ילמד אתכם את עקרונות הצילום הבסיסים - והכל דרך הסמארטפון שנמצא אצל כל
            אחד מכם בכיס! תקבלו ידע רב ומעשיר בכל סגנונות הצילום המוכרים והנפוצים (נוף, תקריב, דיוקן, טבע, תנועה ועוד), התייחסות לתאורה, טכניקה וקומפוזיציה, תתנסו בצילום אמנותי
            מזוויות שונות ומיוחדות, תרכשו כלים ושיטות לעיבוד נכון של תמונה ולמתעניינים בתחום המדיה החברתית אינסטגרם מובטחת הכרות בסיסית שתאפשר פרסום ושיתוף התכנים בהתאם להעדפותם.
          </p>
          <br></br>
          <b>• תרכשו את עקרונות והיסודות הצילום רלוונטיים לכל סוג צילום.</b>
          <b>• תיישמו את מה שתלמדו בסיור צילום מודרך בשטח.</b>
          <b>• תהנו מפעילות מיוחדת מאינסטגרמר זוכה פרסים!</b>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .info-section {
    padding: 0 8rem;
    margin-bottom: 2rem;
  }

  .info-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 0.5rem;
  }

  .info-section hr {
    width: 100%;
    margin-bottom: 2rem;
    /* border: px solid #c3c3c3; */
    background: #f1f1f1;
    height: 2px;
    border: none;
  }

  .direction-rtl {
    direction: rtl;
  }

  @media only screen and (max-width: 768px) {
    .info-section {
      padding: 0 1rem;
    }

    .info-container h2 {
      font-size: 1.7rem;
    }

    .info-container b {
      /* font-size: 0.9rem; */
    }

    .info-container p {
      /* font-size: 0.9rem; */
    }
  }
`;

export default Info;
