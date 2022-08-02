import React, {useContext, useReducer, createContext} from "react";

export const StateContext = createContext();

//a provider component which gets rendered by index.js and props are passed
//this will also wrap the whole app 
export const ServiceProvider = ({reducer,initialState,children}) => (
  <StateContext.Provider value={useReducer(reducer,initialState)}>
    {children}
  </StateContext.Provider>
)

//provide ability to access the current state through provider
export const useStateValue = () => useContext(StateContext);