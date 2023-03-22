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
import { MockFetchContext } from './context/MockFetchContext';
import { PerformanceContext } from './context/PerformanceContext';

window.ace.config.setModuleUrl('ace/mode/javascript_worker', '../../node_modules/ace-builds/src-noconflict/worker-javascript.js');
window.ace.config.setModuleUrl('ace/mode/json_worker', '../../node_modules/ace-builds/src-noconflict/worker-json.js');

//NOTE: User inputs a function definition in the actions tab e.g. () => console.log('hello')
//form for adjusting component
const PropsWindow = () => {
  //Global state
  const { compProps, compActions, compHTML, compState } = useContext(DetailsContext);
  const [compPropsVal, setCompPropsVal] = compProps;
  const [compActionsVal, setCompActionsVal] = compActions;
  const [compHTMLVal, setCompHTMLVal] = compHTML;
  const [compStateVal, setCompStateVal] = compState;
  const { mockServer } = useContext(MockFetchContext);
  const [ mockServerVal, setMockServerVal ] = mockServer;
  //States for text editors 
  const [ tempCompActions, setTempCompActions ] = useState(compActionsVal);
  const [ tempCompHTML, setTempCompHTML ] = useState(compHTMLVal);
  const [ tempCompProps, setTempCompProps ] = useState(compPropsVal);
  const [ tempCompState, setTempCompState ] = useState(compStateVal);
  const [ tempMockServer, setTempMockServer ] = useState(`fetchMock.mock('*', {data: 'mock data'}, { overwriteRoutes: true });`)
  // toggle states for windows (props & state)
  const [propsWindowVisible, setPropsWindowVisible] = useState(true);
  const [stateWindowVisible, setStateWindowVisible] = useState(false);
  const [mockServerWindowVisible, setMockServerWindowVisible] = useState(false);
  //Key count to force remount on component update
  const { keyCount } = useContext(PerformanceContext);
  const [ keyCountVal , setKeyCountVal] = keyCount;

  //Handle the submit of the create props form
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setCompActionsVal(tempCompActions);
      setCompHTMLVal(tempCompHTML);
      setCompPropsVal(tempCompProps);
      setCompStateVal(tempCompState);
      setMockServerVal(tempMockServer);
      setKeyCountVal(keyCountVal + 1);
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
      setMockServerWindowVisible(false);
    },
    state : (e) => {
      setStateWindowVisible(true);
      setPropsWindowVisible(false);
      setMockServerWindowVisible(false);
    },
    mockServer: (e) => {
      setStateWindowVisible(false);
      setPropsWindowVisible(false);
      setMockServerWindowVisible(true);
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
          {/* toggleable containers */}
          <div className='props-container' id='toggle-edit-container'>
            <nav className='props-toggle-nav'>
              <ul>
                <li><a href="#" onClick={handleToggleWindow.props}>props</a></li>
                <li><a href="#" onClick={handleToggleWindow.state}>state</a></li>
                <li><a href="#" onClick={handleToggleWindow.mockServer}>mock server</a></li>
              </ul>
            </nav>
            {propsWindowVisible && 
              <div className='props-container' id='prop-edit-container'>
                <label>Variables</label>
                <AceEditor
                  mode="javascript"
                  theme="monokai"
                  fontSize="1.5rem"
                  wrapEnabled={true}
                  onChange={(value) => setTempCompProps(value)}
                  value={tempCompProps}
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
                  onChange={(value) => setTempCompState(value)}
                  value={tempCompState}
                  editorProps={{ $blockScrolling: true }}
                  width={styleOptions.width}
                  height={styleOptions.height}
                />
              </div>
            }
            {mockServerWindowVisible && 
              <div className='props-container' id='prop-edit-container'>
                <label>Mock Server</label>
                <AceEditor
                  mode="javascript"
                  theme="monokai"
                  fontSize="1.5rem"
                  wrapEnabled={true}
                  onChange={(value) => setTempMockServer(value)}
                  value={tempMockServer}
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
              onChange={(value) => setTempCompActions(value)}
              value={tempCompActions}
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
              onChange={(value) => setTempCompHTML(value)}
              value={tempCompHTML}
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