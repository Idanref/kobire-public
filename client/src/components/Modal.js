import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  closeModal,
  setProfile,
  clearProfile,
  sendConfirmation,
  confirmEmail,
  clearAll,
  removeSpecificFromPending,
  updateChosenPaymentOption,
  checkCoupon,
} from '../actions/workshop';
import OtpInput from 'react-otp-input';
import bitPay from '../images/payment/bitPay.png';
import payBoxPay from '../images/payment/payBoxPay.png';

// Check if an object is empty
const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const Modal = ({
  closeModal,
  setProfile,
  clearProfile,
  sendConfirmation,
  confirmEmail,
  clearAll,
  removeSpecificFromPending,
  checkCoupon,
  isModalOpen,
  profile,
  currentWorkshop,
  confirmationSent,
  numberOfTries,
  emailVerified,
  chosenPaymentOption,
  currentCoupon,
}) => {
  // Local states before sending to redux
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [numTickets, setNumTickets] = useState('');
  const [couponBoxChecked, setCouponBoxChecked] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  const [confirmationCode, setConfirmationCode] = useState('');

  const clearFields = () => {
    setName('');
    setEmail('');
    setPhone('');
    setNumTickets('');
    setConfirmationCode('');
    setCouponBoxChecked(false);
    setCouponCode('');
  };

  const handleToggleCouponBox = () => {
    setCouponBoxChecked(!couponBoxChecked);
  };

  const handleSubmit = () => {
    if (!name || !email || !phone || !numTickets) alert('שגיאה: חלק מהפרטים לא הוזנו');
    else if (numTickets > 30 || numTickets < 1) alert('שגיאה: מספר הכרטיסים צריך להיות בטווח בין 1-30');
    // if email is not in valid email format
    else if (!/\S+@\S+\.\S+/.test(email)) alert('שגיאה: המייל שהוזן שגוי');
    // Success
    else {
      // removing all chars from phone except digits
      const phoneDigitsOnly = phone.replace(/\D+/g, '');

      // convert numOfTickets to Int
      setNumTickets(parseInt(numTickets));

      // profile to be sent to redux
      const profileToSend = {
        name,
        email,
        phone: phoneDigitsOnly,
        // in backend it's called numOfTickets
        numOfTickets: numTickets,
        coupon: !isObjectEmpty(currentCoupon) ? currentCoupon._id : null,
      };

      setProfile(profileToSend);
      sendConfirmation(profileToSend, currentWorkshop._id);
    }
  };

  // otp = OtpInput
  const handleChangeCode = (otp) => {
    setConfirmationCode(otp);
  };

  // If number of tries (entering code) reaches 0, it will reset everything
  useEffect(() => {
    if (numberOfTries < 1) {
      clearAll();
      clearFields();
      removeSpecificFromPending({ email: profile.email }, currentWorkshop._id);
    }
  }, [numberOfTries]);

  const handleConfirmCode = () => {
    if (confirmationCode.length < 6) return alert('קוד חייב להיות בן 6 ספרות');

    // if failed to confirm, will decrease numberOfTries.
    // if succeeded to confirm, will set emailVerified to true.
    confirmEmail({ email: profile.email, code: confirmationCode }, currentWorkshop._id);
  };

  return (
    <Wrapper>
      <div className={`${isModalOpen ? 'modal-container isOpen' : 'modal-container'}`}>
        <div className='modal-content'>
          <h2>למעבר לקבוצת תשלום</h2>

          {/* ----------- BEFORE Confirmation Sent To Email ----------- */}

          {!confirmationSent && (
            <>
              <p>אנא הזינו פרטים</p>

              {/* Form */}
              <section className='direction-rtl'>
                <form className='profile-form '>
                  <div className='profile-info'>
                    <div className='row'>
                      <div className='form-group'>
                        {/* Name */}
                        <label htmlFor='name'>שם</label>
                        <input type='text' name='name' id='name' value={name} placeholder='שם המזמין' onChange={(e) => setName(e.target.value)} />
                      </div>
                      {/* Email */}
                      <div className='form-group'>
                        <label htmlFor='email'>אימייל</label>
                        <input type='email' name='email' id='email' value={email} placeholder='כתובת המייל' onChange={(e) => setEmail(e.target.value)} />
                      </div>
                    </div>
                    <div className='row'>
                      {/* Phone */}
                      <div className='form-group'>
                        <label htmlFor='phone'>טלפון</label>
                        <input type='tel' name='phone' id='phone' value={phone} placeholder='מספר הטלפון' onChange={(e) => setPhone(e.target.value)} />
                      </div>
                      {/* Num of tickets */}
                      <div className='form-group'>
                        <label htmlFor='num-tickets'>כרטיסים</label>
                        <input
                          type='number'
                          min='1'
                          name='num-tickets'
                          id='num-tickets'
                          value={numTickets}
                          className='num-tickets'
                          placeholder='מספר כרטיסים (מינ׳ 1)'
                          onChange={(e) => setNumTickets(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* Coupon */}
                    <label>
                      <input type='checkbox' checked={couponBoxChecked} onChange={handleToggleCouponBox} /> ממש קופון
                    </label>
                    {couponBoxChecked && (
                      <>
                        <div className='coupon-row'>
                          <input
                            className={!isObjectEmpty(currentCoupon) ? 'coupon-code-input border-green' : 'coupon-code-input border-red'}
                            type='text'
                            value={couponCode}
                            placeholder='קוד קופון'
                            onChange={(e) => setCouponCode(e.target.value)}
                          />
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              checkCoupon(couponCode);
                            }}
                          >
                            ממש
                          </button>
                        </div>

                        {/* If there is a currentCoupon, show discount percentage, otherwise, show that coupon doesn't exist */}
                        {isObjectEmpty(currentCoupon) ? (
                          <span className='clr-red'>הקופון לא קיים במערכת</span>
                        ) : (
                          <span className='clr-green'>הקופון מקנה {currentCoupon.discountPercentage}% הנחה</span>
                        )}
                      </>
                    )}
                  </div>
                </form>

                {/* If inserted numOfTickets, will render the total price */}
                {numTickets && (
                  <span>
                    {/* if currentCoupon applied, set price after discount, else, regular price */}
                    סה״כ לתשלום:{' '}
                    {!isObjectEmpty(currentCoupon)
                      ? ((100 - currentCoupon.discountPercentage) / 100) * (parseInt(numTickets) * currentWorkshop.price)
                      : parseInt(numTickets) * currentWorkshop.price}
                    ₪
                  </span>
                )}

                {/* Removed buttons from form because of unnecessary sumbit (handled manually in React) */}

                {/* Buttons */}
                {!confirmationSent && (
                  <div className='form-buttons'>
                    <button className='form-button clr-primary' onClick={handleSubmit}>
                      אישור
                    </button>
                    <button
                      className='form-button'
                      onClick={() => {
                        closeModal();
                        clearFields();
                        clearProfile();
                      }}
                    >
                      ביטול
                    </button>
                  </div>
                )}
              </section>
              <div className='cancel-note'>
                <span>ניתן לבטל את ההזמנה עד 48 שעות טרם המועד</span>
              </div>
            </>
          )}

          {/* ----------- AFTER Confirmation Sent To Email ----------- */}
          {confirmationSent && (
            <>
              <section className='after-confirmation'>
                <p className='font-1rem'>שלחנו לכם קוד בן 6 ספרות למייל</p>
                <div className='code-input-container'>
                  <OtpInput
                    className='direction-ltr'
                    value={confirmationCode}
                    onChange={handleChangeCode}
                    numInputs={6}
                    isInputNum={true}
                    inputStyle={{
                      width: '1.8rem',
                      height: '3rem',
                      margin: '0 1rem',
                      fontSize: '2rem',
                      borderRadius: 4,
                      border: '1px solid rgba(0,0,0,0.3)',
                    }}
                    hasErrored={true}
                    shouldAutoFocus={true}
                  />
                </div>
                {numberOfTries < 3 && !emailVerified && <span style={{ color: 'red' }}>נותרו {numberOfTries} נסיונות</span>}
                {!emailVerified && (
                  <>
                    {/* Buttons */}
                    <div className='form-buttons direction-rtl'>
                      <button className='form-button clr-primary' onClick={handleConfirmCode}>
                        אישור
                      </button>
                      <button
                        className='form-button'
                        onClick={() => {
                          clearAll();
                          clearFields();
                          removeSpecificFromPending({ email: profile.email }, currentWorkshop._id);
                        }}
                      >
                        ביטול
                      </button>
                    </div>
                  </>
                )}
                {emailVerified && (
                  <>
                    <p>
                      {/* if currentCoupon applied, set price after discount, else, regular price */}
                      תודה שהצטרפתם אלינו! לאחר אימות העברת התשלום בסך{' '}
                      {!isObjectEmpty(currentCoupon)
                        ? ((100 - currentCoupon.discountPercentage) / 100) * (parseInt(numTickets) * currentWorkshop.price)
                        : parseInt(numTickets) * currentWorkshop.price}
                      ₪ תצורפו לרשימת המשתתפים בסדנה
                    </p>
                    {/* If user chose paybox payment */}
                    {chosenPaymentOption === 'paybox' && (
                      <button className='payment-button'>
                        <a href={currentWorkshop.payBoxUrl} target='_blank' rel='noreferrer'>
                          <img src={payBoxPay} alt='PayBox' />
                        </a>
                      </button>
                    )}

                    {/* If user chose bit payment */}
                    {chosenPaymentOption === 'bit' && (
                      <button className='payment-button'>
                        <a href={currentWorkshop.bitUrl} target='_blank' rel='noreferrer'>
                          <img src={bitPay} alt='Bit' />
                        </a>
                      </button>
                    )}

                    <button
                      className='exit-button'
                      onClick={() => {
                        clearAll();
                        clearFields();
                      }}
                    >
                      חזרה למסך הבית
                    </button>
                  </>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* Modal */

  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s linear;
    z-index: -1;
  }

  .coupon-row {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    /* margin-bottom: 1rem; */
    /* background-color: red; */
    padding: 1rem 0 0.5rem 0;
  }

  .coupon-row .coupon-code-input {
    border-radius: 5px;
    text-align: center;
    padding: 0.2rem;
  }

  .coupon-row .coupon-code-input:focus {
    outline: none;
  }

  .coupon-row button {
    padding: 0.3rem;
    border-radius: 7px;
    border: 1px solid #333;
    background-color: #fff;
    color: #333;
  }

  .isOpen {
    opacity: 1;
    z-index: 999;
  }

  .modal-content {
    background: #fff;
    width: 90vw;
    max-width: 620px;
    padding: 3rem;
    border-radius: 0.5rem;
    text-align: center;
    position: relative;
  }
  .modal-content p {
    font-size: 1.5rem;
    text-transform: none;
  }

  .modal-content h2 {
    letter-spacing: 0.1rem;
    text-transform: capitalize;
    line-height: 1.25;
    /* margin-bottom: 0.75rem; */
    font-size: 2.5rem;
  }

  .modal-content p {
    margin-bottom: 1.25rem;
    color: hsl(209, 34%, 30%);
    font-size: 1.5rem;
  }

  .row {
    display: flex;
    justify-content: space-between;
    /* padding: 1rem 0; */
    /* background: red; */
  }

  .form-group {
    /* margin-left: 1rem; */
    padding: 0 1rem;
    margin-bottom: 1rem;
  }

  .form-group label {
    /* background: red; */
    display: inline-block;
    margin-left: 0.5rem;
    width: 3.5rem;
  }

  .form-group input {
    /* height: 1.5rem; */
    padding: 0.2rem;
    border-radius: 5px;
    text-align: center;
  }

  .form-group .num-tickets {
    /* width: 3rem; */
  }

  .form-buttons {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  .form-button {
    /* width: 4rem; */
    padding: 1rem 2rem;
    font-size: 1rem;
    border: none;
    border-radius: 10px;
    color: #444;
    margin-right: 1.5rem;
    cursor: pointer;
    box-shadow: 0px 1px 2px #333;
    outline: none;
    opacity: 1;
    user-select: none;
  }

  .form-button:hover {
    opacity: 0.9;
  }

  .form-button:active {
    box-shadow: none;
  }

  .clr-primary {
    background: var(--color-primary);
  }

  .cancel-note {
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: lightslategray;
  }

  /* After Confirmation Sent */

  .after-confirmation p {
    font-size: 1.3rem;
  }

  .code-input-container {
    display: flex;
    justify-content: center;
    /* background: red; */
    /* margin: 1rem 0; */
    padding: 0.5rem 0 1rem 0;
  }

  .payment-button {
    background-color: transparent;
    outline: none;
    padding-top: 10px;
    border: none;
    cursor: pointer;
  }

  .exit-button {
    display: block;
    margin: auto;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin-top: 0.8rem;
    border-radius: 10px;
    background-color: #444;
    color: #fff;
    cursor: pointer;
    border: 1px solid #444;
  }

  .exit-button:hover {
    opacity: 0.9;
  }

  .direction-rtl {
    direction: rtl;
  }

  .direction-ltr {
    direction: ltr;
  }

  .border-green {
    border: 2px solid green;
  }

  .border-red {
    border: 2px solid #c70000;
  }

  .clr-green {
    color: green;
  }

  .clr-red {
    color: #c70000;
  }

  @media only screen and (max-width: 768px) {
    .modal-content h2 {
      font-size: 1.7rem;
    }

    .modal-content p {
      font-size: 1.3rem;
    }

    .row {
      display: block;
    }

    .form-button {
      padding: 0.8rem 1.5rem;
      margin-top: 1rem;
    }

    .after-confirmation p {
      font-size: 1.1rem;
    }
  }
  /* End Of Modal */
`;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setProfile: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
  sendConfirmation: PropTypes.func.isRequired,
  confirmEmail: PropTypes.func.isRequired,
  clearAll: PropTypes.func.isRequired,
  removeSpecificFromPending: PropTypes.func.isRequired,
  checkCoupon: PropTypes.func.isRequired,

  isModalOpen: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  currentWorkshop: PropTypes.object.isRequired,
  confirmationSent: PropTypes.bool.isRequired,
  numberOfTries: PropTypes.number.isRequired,
  emailVerified: PropTypes.bool.isRequired,
  chosenPaymentOption: PropTypes.string.isRequired,
  currentCoupon: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isModalOpen: state.workshop.isModalOpen,
  profile: state.workshop.profile,
  currentWorkshop: state.workshop.currentWorkshop,
  confirmationSent: state.workshop.confirmationSent,
  numberOfTries: state.workshop.numberOfTries,
  emailVerified: state.workshop.emailVerified,
  chosenPaymentOption: state.workshop.chosenPaymentOption,
  currentCoupon: state.workshop.currentCoupon,
});

export default connect(mapStateToProps, { closeModal, setProfile, clearProfile, sendConfirmation, confirmEmail, clearAll, removeSpecificFromPending, checkCoupon })(Modal);
