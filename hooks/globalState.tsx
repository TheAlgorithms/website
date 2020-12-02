import React, { createContext, useReducer, useContext } from "react";

const initialState = {
  query: "",
};

function reducer(state: any, action: Action) {
  return {
    ...state,
    [action.key]: action.value,
  };
}

const StateContext = createContext(null);

export function GlobalStateProvider({ children }) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

export function useGlobalState(): [
  typeof initialState,
  (action: Action) => void
] {
  return useContext(StateContext);
}

interface Action {
  key: keyof typeof initialState;
  value: any;
}
