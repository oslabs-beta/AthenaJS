import React, { useState, useContext } from 'react';
import { DetailsContext } from './context/DetailsContext';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/worker-javascript';
import 'ace-builds/src-noconflict/worker-json';
import stringifyObject from 'stringify-object';

window.ace.config.setModuleUrl('ace/mode/javascript_worker', '../../node_modules/ace-builds/src-noconflict/worker-javascript.js');
window.ace.config.setModuleUrl('ace/mode/json_worker', '../../node_modules/ace-builds/src-noconflict/worker-json.js');

//NOTE: User inputs a function definition in the actions tab e.g. () => console.log('hello')
//form for adjusting component
const PropsWindow = () => {
  //Use detailsContext
  const { compProps, compActions, compHTML } = useContext(DetailsContext);
  //Definition for props object
  const [compPropsVal, setCompPropsVal] = compProps;
  //Definition for action object
  const [compActionsVal, setCompActionsVal] = compActions;
  //Definition for JSX
  const [compHTMLVal, setCompHTMLVal] = compHTML;
  //Definition for actions (function names + function definitions)
  const [compActionNames, setCompActionNames] = useState('handleClick');
  const [compActionDefinitions, setCompActionDefinitions] = useState('');

  //Handle the submit of the create props form
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const actionDefsArr = compActionDefinitions.split(/\n\n+/);
      const actionNamesArr = compActionNames.replace(/\s/g, '').split(',');
      console.log(actionDefsArr)
      //Set handleclick to the function definition specified by the user
      // console.log(newHandleClick)
      const myActions = {};
      //Map function definitions onto function names
      for (let i = 0; i < actionNamesArr.length; i++){
        const actionName = actionNamesArr[i];
        const actionDef = actionDefsArr[i].replace(/;/g, '');
        const newAction = eval(`(${actionDef})`);
        myActions[actionName] = newAction;
      }
      setCompActionsVal(myActions);
    } catch (error) {
      console.error(error);
    }
  };

  // ace editor style options object
  const styleOptions = {
    width: '100%',
    height: '500px',
  };

  return (
    <>
      <form className = 'props-form' onSubmit = {handleSubmit}>
        <div id = 'props-header'>
          <h3>Edit Component</h3>
          <button>Update Component</button>
        </div>
        <div className='props-window'>
          <div className='props-container'>
            <label>Props</label>
            <AceEditor
              mode="json"
              theme="monokai"
              fontSize="1.5rem"
              wrapEnabled={true}
              onChange={(value) => setCompPropsVal(value)}
              value={compPropsVal}
              editorProps={{ $blockScrolling: true }}
              width={styleOptions.width}
              height={styleOptions.height}
            />
          </div>

          <div id = 'function-definitions' className='props-container'>
  
            <h3>Function Name</h3>
            <input 
              type = "text"
              onChange = {(e) => setCompActionNames(e.target.value)}
              value = {compActionNames}
            />
            <h3>Function Definition</h3>
            <AceEditor
              mode="javascript"
              theme="monokai"
              fontSize="1.5rem"
              wrapEnabled={true}
              onChange={(value) => setCompActionDefinitions(value)}
              value={compActionDefinitions}
              editorProps={{ $blockScrolling: true }}
              width={styleOptions.width}
              height={styleOptions.height}
              placeholder= 'insert function definition e.g. () => console.log(&quot;Hello World&quot;)'
              setOptions={{
                useWorker: true,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
              }}
            />
          </div>

          <div className='props-container'>
            <label>JSX</label>
            <AceEditor
              mode="jsx"
              theme="monokai"
              fontSize="1.5rem"
              wrapEnabled={true}
              onChange={(value) => setCompHTMLVal(value)}
              value={compHTMLVal}
              editorProps={{ $blockScrolling: true }}
              width={styleOptions.width}
              height={styleOptions.height}
            />
          </div>
        </div>
      </form>
    </>
  );

};

export default PropsWindow;