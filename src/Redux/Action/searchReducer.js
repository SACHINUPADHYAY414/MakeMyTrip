export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';

const initialState = {
  results: [],
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        results: action.payload || [],
      };
    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        results: [],
      };
    default:
      return state;
  }
}

export const setSearchResults = (results) => ({
  type: SET_SEARCH_RESULTS,
  payload: results,
});

export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
});
