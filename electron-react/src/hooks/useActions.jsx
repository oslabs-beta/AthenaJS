import React from 'react';
import { useState } from 'react';

// Custom React hook that returns an object with functions that log to the console
const useActions = (actions) => {
  // Actions is an object containing functions => below is an example of an object with one function
  // const actions = {
  //   onClick: () => {
  //     console.log('Button Clicked!')
  //  }
  //};
  const [logs, setLogs] = useState([]);
  
  //actionsWithLogging is a modified version of actions that calls the action and logs it
  //This is so that we can pass in the actions object and then use this modified version when we call the hook
  // e.g
  // const { handleClick, logs } = useActions({handleClick: () => console.log('Button clicked')})
  // const handleClick is a property on our actionsWithCall object.
  const actionsWithCall = {};

  //For each function
  Object.keys(actions).forEach((key) => {
    //assign the function name as a new key in the actionsWithLogging object and assign its value to a function
    //The function logs the action, updates the log state, and calls the function.is 
    actionsWithCall[key] = (...args) => {
      setLogs((prevLogs) => [...prevLogs, {action: key, args}]);
      actions[key](...args);
    };
  });

  return {...actionsWithCall, logs};
};

export default useActions;