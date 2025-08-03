// bookingReducer.js

export const SET_BOOKING_DETAILS = "SET_BOOKING_DETAILS";
export const CLEAR_BOOKING_DETAILS = "CLEAR_BOOKING_DETAILS";

const initialState = {
  busId: null,
  seatId: null,
  busDetails: null,
};

export const setBookingDetails = (busId, seatId, busDetails) => ({
  type: SET_BOOKING_DETAILS,
  payload: { busId, seatId, busDetails },
});

export const clearBookingDetails = () => ({
  type: CLEAR_BOOKING_DETAILS,
});

export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BOOKING_DETAILS:
      return {
        ...state,
        busId: action.payload.busId,
        seatId: action.payload.seatId,
        busDetails: action.payload.busDetails,
      };
    case CLEAR_BOOKING_DETAILS:
      return initialState;
    default:
      return state;
  }
}
