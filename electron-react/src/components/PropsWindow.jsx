import React, { useState, useContext } from 'react';
import { DetailsContext } from './context/DetailsContext';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-noconflict/theme-monokai';

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
        <AceEditor
          mode="json"
          theme="monokai"
          onChange={(value) => setCompPropsVal(JSON.parse(value))}
          value={JSON.stringify(compPropsVal)}
          editorProps={{ $blockScrolling: true }}
          width="30%"
          height="100px"
        />

        <label>Actions</label>
        <AceEditor
          mode="javascript"
          theme="monokai"
          onChange={(value) => setCompActionsInput(value)}
          value={compActionsInput}
          editorProps={{ $blockScrolling: true }}
          width="30%"
          height="100px"
          placeholder= 'insert function definition\n e.g. () => console.log(&quot;Hello World&quot;)'
        />

        <label>JSX</label>
        <AceEditor
          mode="jsx"
          theme="monokai"
          onChange={(value) => setCompHTMLVal(value)}
          value={compHTMLVal}
          editorProps={{ $blockScrolling: true }}
          width="30%"
          height="100px"
        />
      

        <button>Update Component</button>
      </form>
    </>
  );

};

export default PropsWindow;