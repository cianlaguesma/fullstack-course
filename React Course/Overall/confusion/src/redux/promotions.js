import * as ActionTypes from "./ActionTypes";

export const Promotions = (
  state = {
    errMess: null,
    isLoading: true,
    promotions: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_PROMOS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        promotions: action.payload,
      };
    case ActionTypes.PROMOS_LOADING:
      return { ...state, isLoading: true, errMess: null, promos: [] };
    case ActionTypes.PROMOS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        promos: [],
      };
    default:
      return state;
  }
};
