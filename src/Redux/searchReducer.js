import { SET_SEARCH_RESULTS, CLEAR_SEARCH_RESULTS } from './Action/searchReducer';

const initialState = {
  results: [],
  fromCityName: null,
  toCityName: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        results: action.payload.buses || [],
        fromCityName: action.payload.fromCityName || null,
        toCityName: action.payload.toCityName || null,
      };
    case CLEAR_SEARCH_RESULTS:
      return initialState;
    default:
      return state;
  }
};

export default searchReducer;
