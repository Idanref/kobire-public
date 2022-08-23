import '../select-workshop.css';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Moment from 'react-moment';
import hebrewLocale from 'moment/locale/he';
import bitPay from '../images/payment/bitPay.png';
import payBoxPay from '../images/payment/payBoxPay.png';
import { getLocations, getWorkshopsInCity, updateCurrentWorkshop, updateChosenPaymentOption, openModal } from '../actions/workshop';

// Check if an object is empty
const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const Order = ({ getLocations, getWorkshopsInCity, updateCurrentWorkshop, updateChosenPaymentOption, openModal, locations, workshopsInCity, currentWorkshop }) => {
  const [datesVisible, setDatesVisible] = useState(false);
  const [paymentVisible, setPaymentVisible] = useState(false);

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  const handleChooseLocation = async (city) => {
    setDatesVisible(true);
    await getWorkshopsInCity(city);
  };

  const handleChooseDate = (workshop) => {
    setPaymentVisible(true);
    updateCurrentWorkshop(workshop);
  };

  // Add to redux state chosen payment type
  const handleSendToPayment = (paymentOption) => {
    updateChosenPaymentOption(paymentOption);
    openModal();
  };

  return (
    <Wrapper>
      <section id='order'>
        <div className='order-container'>
          <h1>בחרו סדנת צילום</h1>
          <hr />
          <div className='buttons-container direction-rtl'>
            {locations.map((item) => {
              return (
                <button key={item} onClick={() => handleChooseLocation(item)}>
                  {item}
                </button>
              );
            })}
          </div>

          {datesVisible && (
            <div className='select animated zoomIn'>
              <input type='radio' name='option' />
              <i className='toggle icon icon-arrow-down'></i>
              <i className='toggle icon icon-arrow-up'></i>
              <span className='placeholder'>בחרו יום ותאריך</span>

              {/* Goes through all workshops in city and shows info */}
              {workshopsInCity.map((item) => {
                return (
                  <label key={item._id} className='option'>
                    <input type='radio' name='option' disabled={item.soldOut || (!item.bitUrl && !item.payBoxUrl)} onChange={() => handleChooseDate(item)} />
                    <span className={item.soldOut || (!item.bitUrl && !item.payBoxUrl) ? 'title animated fadeIn unavailable' : 'title animated fadeIn'}>
                      <Moment utc format='יום dddd, DD/MM/YYYY בשעה HH:mm'>
                        {item.date}
                      </Moment>
                    </span>
                  </label>
                );
              })}
            </div>
          )}

          {/* Renders only if picked a date */}
          {paymentVisible && (
            <div className='bit-paybox'>
              {/* // Renders only if PayBox url available */}
              {currentWorkshop.payBoxUrl && (
                <button onClick={() => handleSendToPayment('paybox')}>
                  <img src={payBoxPay} alt='PayBox' />
                </button>
              )}
              {/* // Renders only if Bit url available */}
              {currentWorkshop.bitUrl && (
                <button onClick={() => handleSendToPayment('bit')}>
                  <img src={bitPay} alt='Bit' />
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* CSS for 'select' element is imported seperately */

  #order {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #f1f5f8;
    opacity: 0.9;
  }

  .order-container {
    background-color: #444;
    width: 70%;
    height: 50%;
    border-radius: 20px;
    text-align: center;
    color: #fff;
    padding: 1.2rem;
  }

  .order-container h1 {
    margin-top: 1rem;
  }

  .order-container hr {
    width: 40%;
    height: 0.2rem;
    background: var(--color-primary);
    border-color: var(--color-primary);
    margin: auto;
    margin-top: 0.7rem;
  }

  .buttons-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .buttons-container button {
    flex: 1 0 33%;
    height: 4rem;
    font-size: 120%;
    color: #f4f4f4;
    background: transparent;
    opacity: 0.5;
    border-radius: 10px;
    margin-top: 10px;
    border-color: #fff;
    border: none;
    transition: all 0.5s ease;
    outline: none;
  }

  .buttons-container button:hover {
    opacity: 1;
    cursor: pointer;
  }

  .buttons-container button:focus {
    color: #fff;
    opacity: 1;
    box-shadow: none;
  }

  .direction-rtl {
    direction: rtl;
  }

  .unavailable {
    text-decoration: line-through;
  }

  .bit-paybox {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 80%;
    margin: auto;
    justify-content: center;
  }

  .bit-paybox button {
    background-color: transparent;
    outline: none;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }

  @media only screen and (max-width: 768px) {
    .order-container {
      width: 100%;
    }

    .buttons-container button {
      flex: 1 0 33%;
    }

    .bit-paybox {
      width: 100%;
    }
  }
`;

Order.propTypes = {
  getLocations: PropTypes.func.isRequired,
  getWorkshopsInCity: PropTypes.func.isRequired,
  updateCurrentWorkshop: PropTypes.func.isRequired,
  updateChosenPaymentOption: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  workshopsInCity: PropTypes.array.isRequired,
  currentWorkshop: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  locations: state.workshop.locations,
  workshopsInCity: state.workshop.workshopsInCity,
  currentWorkshop: state.workshop.currentWorkshop,
});

export default connect(mapStateToProps, { getLocations, getWorkshopsInCity, updateCurrentWorkshop, updateChosenPaymentOption, openModal })(Order);
