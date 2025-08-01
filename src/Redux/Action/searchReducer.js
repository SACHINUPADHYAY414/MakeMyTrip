export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";

export const setSearchResults = (buses, fromCityName, toCityName) => ({
  type: SET_SEARCH_RESULTS,
  payload: { buses, fromCityName, toCityName },
});

export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
});
