import React, { useState, useContext } from 'react';
import { DetailsContext } from './context/DetailsContext';

//NOTE: User inputs a function definition in the actions tab e.g. () => console.log('hello')
//form for adjusting component
const PropsWindow = () => {
  const { compProps, compActions, compHTML } = useContext(DetailsContext);
  const [compPropsVal, setCompPropsVal] = compProps;
  const [compActionsVal, setCompActionsVal] = compActions;
  const [compHTMLVal, setCompHTMLVal] = compHTML;
  const [compActionsInput, setCompActionsInput] = useState('');

  //Handle the submit of the create props form
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      //Set handleclick to the function definition specified by the user
      const newHandleClick = eval(`(${compActionsInput})`);
      setCompActionsVal({ handleClick: newHandleClick });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className = 'props-window' onSubmit = {handleSubmit}>
        <div id = 'props-header'>
          <h3>Edit Component</h3>
        </div>

        <label>Props</label>
        <textarea
          type = "text"
          onChange={(e) => setCompPropsVal(JSON.parse(e.target.value))}
          value={JSON.stringify(compPropsVal)}
        />

        <label>Actions</label>
        <textarea
          type = "text"
          onChange = {(e) => setCompActionsInput(e.target.value)}
          defaultValue = 'Insert function definition e.g. () => console.log("Hello World")'
        />

        <label>HTML</label>
        <textarea
          type = "text"
          onChange = {(e) => setCompHTMLVal(e.target.value)}
          value = {compHTMLVal}
        />
      

        <button>Update Component</button>
      </form>
    </>
  );

};

export default PropsWindow;