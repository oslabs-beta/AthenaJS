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
  const { compProps, compActions, compHTML, compState } = useContext(DetailsContext);
  //Definition for props object
  const [compPropsVal, setCompPropsVal] = compProps;
  //Definition for action object
  const [compActionsVal, setCompActionsVal] = compActions;
  //Definition for JSX
  const [compHTMLVal, setCompHTMLVal] = compHTML;
  //Definition for State
  const [compStateVal, setCompStateVal] = compState;
  //Definition for actions (function names + function definitions)
  const [compActionDefinitions, setCompActionDefinitions] = useState(compActionsVal);

  // toggle states for windows (props & state)
  const [propsWindowVisible, setPropsWindowVisible] = useState(true);
  const [stateWindowVisible, setStateWindowVisible] = useState(false);

  //Handle the submit of the create props form
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setCompActionsVal(compActionDefinitions);
    } catch (error) {
      console.error(error);
    }
  };

  // handle toggling the props and state containers
  // currently set used in props-toggle-nav links
  const handleToggleWindow = {
    props : (e) => {
      setPropsWindowVisible(true);
      setStateWindowVisible(false);
    },
    state : (e) => {
      setStateWindowVisible(true);
      setPropsWindowVisible(false);
    },
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
          {/* toggleable containers */}
          <div className='props-container' id='toggle-edit-container'>
            <nav className='props-toggle-nav'>
              <ul>
                <li><a href="#" onClick={handleToggleWindow.props}>props</a></li>
                <li><a href="#" onClick={handleToggleWindow.state}>state</a></li>
              </ul>
            </nav>
            {propsWindowVisible && 
              <div className='props-container' id='prop-edit-container'>
                <label>Props</label>
                <AceEditor
                  mode="javascript"
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
            }
            {stateWindowVisible &&
              <div className='props-container' id='state-edit-container'>
                <label>state</label>
                <AceEditor
                  mode="javascript"
                  theme="monokai"
                  fontSize="1.5rem"
                  wrapEnabled={true}
                  onChange={(value) => setCompStateVal(value)}
                  value={compStateVal}
                  editorProps={{ $blockScrolling: true }}
                  width={styleOptions.width}
                  height={styleOptions.height}
                />
              </div>
            }
          </div>
          {/* static containers */}
          <div className='props-container' id='function-definitions'>
            <label>Function Definitions</label>
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
          <div className='props-container' id='jsx-edit-container'>
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