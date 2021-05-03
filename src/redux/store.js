import { createStore, applyMiddleware, compose } from "redux";
import _ from "underscore";
import thunk from "redux-thunk";
import axios from "axios";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { composeWithDevTools } from "remote-redux-devtools";
import { SET_DATA, FAILURE, TOGGLE_TEMP } from "./action";

const initialState = {
  data: null,
  error: null,
  UnitType: "metric",
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// create your reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };
      if (state.count) nextState.count = state.count; // preserve count value on client side navigation
      return nextState;
    case SET_DATA: {
      return {
        ...state,
        data: action.payload,
        error: false,
      };
    }
    case FAILURE:
      return { data: null, error: action.payload };
    case TOGGLE_TEMP: {
      const { data, unit } = action.payload;
      return {
        ...state,
        data: data,
        UnitType: unit,
      };
    }
    default:
      return state;
  }
};

const enhancer = composeEnhancers(
  applyMiddleware(thunk.withExtraArgument(axios))
);

// create a makeStore function
const makeStore = (context) => createStore(reducer, enhancer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
