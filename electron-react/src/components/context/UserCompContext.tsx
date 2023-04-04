import React, { createContext, ReducerWithoutAction, useReducer } from 'react';
import { UserCompType, UserActionType, UserStateType, PayloadType } from './ContextTypes';

export const UserCompContext = createContext<UserCompType | null>(null);

//Comp reducer which defines various actions that can be made to mutate comp state
export const UserCompReducer = (state: UserStateType, action: UserActionType): UserStateType => {
  switch (action.type) {
    //useEffect in App.tsx gets user's component library from local system and sets the component array content using the SET_COMPS action type
    case 'SET_COMPS':
      return {
        components: action.payload
      };
    //When a user saves a component, it gets added to the array as an additional object
    case 'ADD_COMPS':
      return {
        components: [action.payload, ...state.components]
      };
    //Filter to find the specific component to be deleted, reassign state to be the array that does not contain that component
    case 'DELETE_COMPS':
      return {
        components: state.components.filter((comp) => comp.name !== action.payload.name)
      };
    //If the user wants to overwrite a component that exists already, we use this action type
    case 'EDIT_COMPS':
      return {
        components: state.components.map((comp) => comp.name === action.payload.name ? action.payload : comp)
      };
    //Default case return state
    default:
      return state;
  }
};

//Define context provider -> reducer is UserCompReducer and initial argument is components
export const UserCompProvider = ({ children }: any) => {

  // Currently not typing the react reducer, will reroute to this to fully implement typing once get better hang of it.
  const [state, dispatch] = useReducer(UserCompReducer, { components: [] });

  //Provider passes state and dispatch props to children
  return (
    <UserCompContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserCompContext.Provider>
  );
};