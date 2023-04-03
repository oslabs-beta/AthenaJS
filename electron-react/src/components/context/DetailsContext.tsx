import React, { useState, createContext, Dispatch, SetStateAction } from 'react';


interface DetailsContextType {
  compJSX: (string | Dispatch<SetStateAction<string>>)[],
  compBody:(string | Dispatch<SetStateAction<string>>)[],
  tempCompBody:(string | Dispatch<SetStateAction<string>>)[],
  tempCompJSX:(string | Dispatch<SetStateAction<string>>)[]
}


export const DetailsContext = createContext<DetailsContextType | null>(null);
//These are the details that define the component that gets rendered on the screen
export const DetailsProvider = ({ children } : any) => {
  //States for the component in the renderer
  const [compBody, setCompBody] = useState(
    `
const [count, setCount] = useState(1)
const var1 = 1
const handleClick = () => console.log('button clicked')
    `
  );
  const [compJSX, setCompJSX] = useState(
    '<button onClick = {handleClick}>Click Me</button>'
  );
  //States for the code written in the code editors, it gets transferred to the states above when we press the update view button in PropsWindow.jsx
  const [ tempCompBody, setTempCompBody ] = useState(
    `const [count, setCount] = useState(1)
const var1 = 1
const handleClick = () => console.log('button clicked')
    `
  );
  const [ tempCompJSX, setTempCompJSX ] = useState(
    '<button onClick = {handleClick}>Click Me</button>'
  );

  return (
    <DetailsContext.Provider
      value={{
        compJSX: [compJSX, setCompJSX],
        compBody: [compBody, setCompBody],
        tempCompBody: [ tempCompBody, setTempCompBody],
        tempCompJSX: [ tempCompJSX, setTempCompJSX ],
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
};
