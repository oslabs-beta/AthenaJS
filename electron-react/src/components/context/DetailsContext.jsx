import React, { useState, createContext } from "react";
import stringifyObject from "stringify-object";

export const DetailsContext = createContext();
//These are the details that define the component that gets rendered on the screen
export const DetailsProvider = ({ children }) => {
  //States for the component in the renderer
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
    "const [count, setCount] = useState(1)"
  );
  //States for the code written in the code editors, it gets transferred to the states above when we press the update view button in PropsWindow.jsx
  const [ tempCompActions, setTempCompActions ] = useState(
    `const handleClick = () => console.log('button clicked')`
  );
  const [ tempCompHTML, setTempCompHTML ] = useState(
    `<button onClick = {handleClick}>Click Me</button>`
  );
  const [ tempCompProps, setTempCompProps ] = useState(
    `const var1 = 1`
  );
  const [ tempCompState, setTempCompState ] = useState(
    "const [count, setCount] = useState(1)"
  );

  return (
    <DetailsContext.Provider
      value={{
        compProps: [compProps, setCompProps],
        compActions: [compActions, setCompActions],
        compHTML: [compHTML, setCompHTML],
        compState: [compState, setCompState],
        tempCompProps: [ tempCompProps, setTempCompProps ],
        tempCompActions: [ tempCompActions, setTempCompActions ],
        tempCompHTML: [ tempCompHTML, setTempCompHTML ],
        tempCompState: [ tempCompState, setTempCompState ]
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
};
