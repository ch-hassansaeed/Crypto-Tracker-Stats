import { combineReducers } from "redux";
import { Actions as coinActions } from "../actions/coinActions";

// Use the initialState as a default value
const coins = (
  state = { loading: false, data: [], error: null, page: 1 },
  action: { type: any; payload: { data?: any; page: any; error?: any } },
) => {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    case coinActions.FETCH_COINS_REQUEST_SUCCESS: {
      const { data, page } = action.payload;
      return {
        loading: false,
        data,
        error: null,
        page,
      };
    }
    case coinActions.FETCH_COINS_REQUEST_LOADING: {
      return {
        ...state,
        error: null,
        loading: true,
        data: [],
      };
    }
    case coinActions.FETCH_COINS_REQUEST_FAIL: {
      const { error, page } = action.payload;
      return {
        ...state,
        data: [],
        error,
        page,
        loading: false,
      };
    }
    // Do something here based on the different types of actions
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
};

const coin = (
  state = { loading: false, data: {}, error: null },
  action: { type: any; payload: { data?: any; error?: any } },
) => {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    case coinActions.FETCH_COIN_DETAILS_REQUEST_SUCCESS: {
      const { data } = action.payload;
      return {
        loading: false,
        data,
        error: null,
      };
    }
    case coinActions.FETCH_COIN_DETAILS_LOADING: {
      return {
        ...state,
        error: null,
        loading: true,
        data: null,
      };
    }
    case coinActions.FETCH_COIN_DETAILS_REQUEST_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        data: null,
        error,
        loading: false,
      };
    }

    // Do something here based on the different types of actions
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
};

const chart = (
  state = { loading: false, data: {}, error: null },
  action: { type: any; payload: { data?: any; days?: any; error?: any } },
) => {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    case coinActions.FETCH_COINS_REQUEST_LOADING: {
      return {
        ...state,
        data: {},
      };
    }
    case coinActions.FETCH_COIN_CHART_DATA_REQUEST_SUCCESS: {
      const { data, days } = action.payload;
      return {
        ...state,
        loading: false,
        data: { ...state.data, [days]: data, selected: days },
      };
    }
    case coinActions.FETCH_COIN_CHART_DATA_LOADING: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case coinActions.FETCH_COIN_CHART_DATA_REQUEST_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        data: {},
        error,
        loading: false,
      };
    }
    // Do something here based on the different types of actions
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
};

const rootReducer = combineReducers({
  coins,
  coin,
  chart,
});

export default rootReducer;
