import {
  GET_LOCATIONS,
  GET_WORKSHOPS_BY_CITY,
  UPDATE_CHOSEN_PAYMENT_OPTION,
  UPDATE_CURRENT_WORKSHOP,
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
} from '../actions/types';

const initialState = {
  locations: [],
  workshopsInCity: [],
  currentWorkshop: {},
  chosenPaymentOption: '',
  profile: {},
  isModalOpen: false,
  confirmationSent: false,
  numberOfTries: 3,
  emailVerified: false,
  currentCoupon: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LOCATIONS:
      return {
        ...state,
        locations: payload,
      };
    case GET_WORKSHOPS_BY_CITY:
      return {
        ...state,
        workshopsInCity: payload,
      };
    case UPDATE_CURRENT_WORKSHOP:
      return {
        ...state,
        currentWorkshop: payload,
      };
    case SEND_CONFIRMATION:
      return {
        ...state,
        currentWorkshop: payload,
        confirmationSent: true,
      };
    case UPDATE_CHOSEN_PAYMENT_OPTION:
      return {
        ...state,
        chosenPaymentOption: payload,
      };
    case OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };
    case SET_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: {},
        currentCoupon: {},
      };
    case DECREASE_NUMBER_OF_TRIES:
      return {
        ...state,
        numberOfTries: state.numberOfTries - 1,
      };
    case SET_EMAIL_VERIFIED:
      return {
        ...state,
        emailVerified: true,
      };
    case CLEAR_ALL:
      return {
        ...state,
        workshopsInCity: [],
        currentWorkshop: {},
        chosenPaymentOption: '',
        profile: {},
        isModalOpen: false,
        confirmationSent: false,
        numberOfTries: 3,
        emailVerified: false,
        currentCoupon: {},
      };
    case UPDATE_CURRENT_COUPON:
      return {
        ...state,
        currentCoupon: payload,
      };
    case CLEAR_COUPON:
      return {
        ...state,
        currentCoupon: {},
      };
    default:
      return state;
  }
}
