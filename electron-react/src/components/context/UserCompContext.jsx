import React, { createContext, useReducer } from 'react';

export const UserCompContext = createContext();

//Comp reducer which defines various actions that can be made to mutate comp state
export const UserCompReducer = (state, action) => {
  switch (action.type) {
  //We can use a useEffect that reads the file stored on users local machine and sets components array
  case 'SET_COMPS':
    return {
      components: action.payload
    };

  case 'ADD_COMPS':
    return {
      components: [action.payload, ...state.components]
    };

  case 'DELETE_COMPS':
    return {
      components: state.components.filter((comp) => comp.name !== action.payload)
    };

  case 'EDIT_COMPS':
    return {
      components: state.components.map((comp) => comp.name === action.payload.name ? action.payload : comp)
    };

  default:
    return state;
  }
};
//Define context provider -> reducer is UserCompReducer and initial argument is components
export const UserCompProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(UserCompReducer, {
    components: []
  });
  

  //Provider passes state and dispatch props to children
  return(
    <UserCompContext.Provider value = {{...state, dispatch}}>
      { children }
    </UserCompContext.Provider>
  );
};