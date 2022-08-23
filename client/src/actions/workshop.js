import axios from 'axios';
import {
  GET_LOCATIONS,
  GET_WORKSHOPS_BY_CITY,
  UPDATE_CURRENT_WORKSHOP,
  UPDATE_CHOSEN_PAYMENT_OPTION,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_PROFILE,
  CLEAR_PROFILE,
  SEND_CONFIRMATION,
  SET_EMAIL_VERIFIED,
  DECREASE_NUMBER_OF_TRIES,
  CLEAR_ALL,
  UPDATE_CURRENT_COUPON,
  CLEAR_COUPON,
} from './types';

// Get locations
export const getLocations = () => async (dispatch) => {
  try {
    const res = await axios.get('/workshops/locations/all');

    dispatch({
      type: GET_LOCATIONS,
      payload: res.data,
    });
  } catch (err) {
    alert(err.response.data);
  }
};

// Get workshops in city
export const getWorkshopsInCity = (city) => async (dispatch) => {
  try {
    const res = await axios.get(`/workshops?location=${city}`);

    dispatch({
      type: GET_WORKSHOPS_BY_CITY,
      payload: res.data,
    });
  } catch (err) {
    alert(err.response.data);
  }
};

// Add profile to pending and send email confirmation
export const sendConfirmation = (profile, workshopId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(`/workshops/pending/${workshopId}`, profile, config);

    dispatch({
      type: SEND_CONFIRMATION,
      payload: res.data,
    });
  } catch (err) {
    alert(err.response.data);
  }
};

// confirm email with verification code
export const confirmEmail = (user, workshopId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(`/workshops/confirm/${workshopId}`, user, config);
    dispatch({
      type: SET_EMAIL_VERIFIED,
    });
  } catch (err) {
    console.log(user);
    console.log(workshopId);
    if (err.response.status === 401) {
      dispatch({
        type: DECREASE_NUMBER_OF_TRIES,
      });
    } else console.log(err.response.data);
  }
};

// remove specific user from pending
export const removeSpecificFromPending = (user, workshopId) => async (dispatch) => {
  try {
    // regular Content-Type doesn't work on axios 'delete'
    const res = await axios({
      method: 'delete',
      url: `/workshops/pending/${workshopId}`,
      data: user,
    });

    dispatch({
      type: UPDATE_CURRENT_WORKSHOP,
      payload: res.data,
    });
  } catch (err) {
    console.log(user);
    console.log(workshopId);
    console.log(err.response.data);
  }
};

// check if coupon is available
export const checkCoupon = (couponCode) => async (dispatch) => {
  try {
    const res = await axios.get(`workshops/checkcoupon/${couponCode}`);

    dispatch({
      type: UPDATE_CURRENT_COUPON,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLEAR_COUPON,
    });
  }
};

// ==== Utility Actions ====

// update current workshop (in redux state)
export const updateCurrentWorkshop = (workshop) => async (dispatch) => {
  try {
    const res = await axios.get(`workshops/${workshop._id}`);
    dispatch({
      type: UPDATE_CURRENT_WORKSHOP,
      payload: res.data,
    });
  } catch (err) {
    alert(err.response.data);
  }
};

// update chosen payment option
export const updateChosenPaymentOption = (paymentOption) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_CHOSEN_PAYMENT_OPTION,
      payload: paymentOption,
    });
  } catch (err) {
    alert(err.response.data);
  }
};

// open modal
export const openModal = () => async (dispatch) => {
  dispatch({
    type: OPEN_MODAL,
  });
};

export const closeModal = () => async (dispatch) => {
  dispatch({
    type: CLOSE_MODAL,
  });
};

export const setProfile = (profile) => async (dispatch) => {
  try {
    dispatch({
      type: SET_PROFILE,
      payload: profile,
    });
  } catch (err) {
    console.log(err);
  }
};

export const clearProfile = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
};

export const clearAll = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ALL,
  });
};
