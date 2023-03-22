import React, { useState, createContext } from "react";
import stringifyObject from "stringify-object";

export const DetailsContext = createContext();

export const DetailsProvider = ({ children }) => {
  const [compProps, setCompProps] = useState(
    `const var1 = 1`
  );
  const [compActions, setCompActions] = useState(
    `const handleClick = () => console.log('button clicked')`
  );
  const [compHTML, setCompHTML] = useState(
    `<button onClick = {handleClick}>Click Me</button>`
  );
  const [compState, setCompState] = useState(
    "const [count, setCount] = React.useState(1)"
  );
  return (
    <DetailsContext.Provider
      value={{
        compProps: [compProps, setCompProps],
        compActions: [compActions, setCompActions],
        compHTML: [compHTML, setCompHTML],
        compState: [compState, setCompState],
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
};
