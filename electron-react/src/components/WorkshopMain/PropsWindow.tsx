import React, { useState, useContext } from 'react';
import { DetailsContext } from '../context/DetailsContext';
import { MockFetchContext } from '../context/MockFetchContext';
import { PerformanceContext } from '../context/PerformanceContext';
import { 
  usePerformance,
  useMockFetch,
  useDetails,
  useUserComp 
} from '@/hooks/useContextHooks';
import {motion} from 'framer-motion';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/worker-javascript';
import 'ace-builds/src-noconflict/worker-json';

// https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-d-ts.html
// exposing an any type for the ace editor on the window
declare global {
  interface Window {
    ace: any;
  }
}

//Need these to make workers function for ace editor (allows linting and other code editor functionality)
window.ace.config.setModuleUrl('ace/mode/javascript_worker', '../../node_modules/ace-builds/src-noconflict/worker-javascript.js');
window.ace.config.setModuleUrl('ace/mode/json_worker', '../../node_modules/ace-builds/src-noconflict/worker-json.js');

//Framer motion variants
const fadeInVariants = {
  hidden: { opacity: 0.9 },
  visible: { opacity: 1 },
};

const transition = {
  duration: 2,
};

const transitionPage = {
  type: "spring",
  damping: 30,
  stiffness: 300,
  duration: 1
};

//form for adjusting component
const PropsWindow = () => {
  //Global state: temp versions are for the text editor states
  const { compBody, compJSX, tempCompBody, tempCompJSX} = useDetails();
  const [compBodyVal, setCompBodyVal] = compBody;
  const [compJSXVal, setCompJSXVal] = compJSX;
  const { mockServer } = useMockFetch();
  const [ mockServerVal, setMockServerVal ] = mockServer;
  // States for text editors 
  const [ tempCompBodyVal, setTempCompBodyVal ] = tempCompBody;
  const [ tempCompJSXVal, setTempCompJSXVal ] = tempCompJSX;
  const [ tempMockServer, setTempMockServer ] = useState(`fetchMock.mock('*', {data: 'mock data'}, { overwriteRoutes: true });`)
  // toggle states for windows (props, state, mockFetch)
  const [bodyWindowVisible, setBodyWindowVisible] = useState(true);
  const [mockServerWindowVisible, setMockServerWindowVisible] = useState(false);
  //Key count to force remount on component update -> this is used for the React Profiler API in ViewComponent.jsx
  const { keyCount } = usePerformance();
  const [ keyCountVal , setKeyCountVal] = keyCount;
  //state and dispatch for saved user components
  const {components, dispatch} = useUserComp();
  const [ saveName, setSaveName ] = useState('my_component');
  const [ checkSaveModal, setCheckSaveModal ] = useState(false);

  //Handle the submit of the create props form
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    //On form submission (Update View button), we set the states for the component renderer
    //We also adjust keyCount so that we measure a new render time with react profiler API
    try {
      setCompBodyVal(tempCompBodyVal);
      setCompJSXVal(tempCompJSXVal);
      setMockServerVal(tempMockServer);
      setTimeout(() => setKeyCountVal(keyCountVal + 1), 0);
    } catch (error) {
      console.log(error);
    }
  };

  //Check if component has already been saved when we press save component
  const checkCompExist = (): void => {
    for (let i = 0; i < components.length; i++){
      if (components[i].name === saveName) return setCheckSaveModal(true);
    }
    return handleSave();
  };

  //If user says they want to overwrite component -> do this
  const handleOverWriteYes = (): void => {
    try{
      //Overwrite the object for the existing component in the UserComponents global state
      dispatch({type: 'EDIT_COMPS', payload: {
        name: saveName, 
        jsx: compJSXVal,
        body: compBodyVal,
        mockServer: mockServerVal,
      }});
      //Close the modal
      setCheckSaveModal(false);
    } catch(error){
      console.log(error);
    }
  };

  //If user says they don't want to overwrite component
  const handleOverWriteNo = (): void => {
    //close modal
    setCheckSaveModal(false);
  };

  //Save current component by adding to the UserComponent array (via reducer)
  const handleSave = (): void => {
    try{
      dispatch({type: 'ADD_COMPS', payload: {
        name: saveName, 
        jsx: compJSXVal,
        body: compBodyVal,
        mockServer: mockServerVal,
      }});
    } catch(error){
      console.log(error);
    }
  };

  // handle toggling the body and mockServer containers
  const handleToggleWindow = {
    body : (e: React.MouseEvent<HTMLAnchorElement>): void => {
      setBodyWindowVisible(true);
      setMockServerWindowVisible(false);
    },
    mockServer: (e: React.MouseEvent<HTMLAnchorElement>): void => {
      setBodyWindowVisible(false);
      setMockServerWindowVisible(true);
    }
  };

  // ace editor style options object
  const styleOptions = {
    width: '100%',
    height: '100%',
  };

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={transitionPage} 
      id = 'props-window-page'
    >
      <h1>Edit Component</h1>
      <div id = 'props-header'>
        {checkSaveModal &&
          <div id = 'overwrite-modal'>
            <h4>A component with this name already exists, overwrite component?</h4>
            <br/>
            <button onClick = {handleOverWriteYes}>Yes</button>
            <button onClick = {handleOverWriteNo}>No</button>
          </div>
        }
        <input 
          value = {saveName}
          onChange = {(e) => setSaveName(e.target.value)} />
        <button onClick = {checkCompExist}>Save Component</button>
        <br/>
      </div>
      <form className = 'props-form'>
        <button onClick = {handleSubmit}>Update View</button>
        <div className='props-window'>
          {/* toggleable containers */}
          <div className='props-container' id='toggle-edit-container'>
            {bodyWindowVisible && 
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={transition}
                className='props-container' 
                id='prop-edit-container'>
                <label>Function Definitions</label>
                <nav className='props-toggle-nav'>
                  <ul>
                    <li><a href="#" onClick={handleToggleWindow.body}>Body</a></li>
                    <li><a href="#" onClick={handleToggleWindow.mockServer}>Mock Server</a></li>
                  </ul>
                </nav>
                <AceEditor
                  mode="javascript"
                  theme="monokai"
                  fontSize="1.5rem"
                  wrapEnabled={true}
                  onChange={(value) => setTempCompBodyVal(value)}
                  value={tempCompBodyVal}
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
              </motion.div>
            }
            {mockServerWindowVisible && 
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={transition}
                className='props-container' 
                id='prop-edit-container'
              >
                <label>Mock Server</label>
                <nav className='props-toggle-nav'>
                  <ul>
                    <li><a href="#" onClick={handleToggleWindow.body}>Body</a></li>
                    <li><a href="#" onClick={handleToggleWindow.mockServer}>Mock Server</a></li>
                  </ul>
                </nav>
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
              </motion.div>
            }
          </div>
          <div className='props-container' id='jsx-edit-container'>
            <label>JSX</label>
            <AceEditor
              mode="jsx"
              theme="monokai"
              fontSize="1.5rem"
              wrapEnabled={true}
              onChange={(value) => setTempCompJSXVal(value)}
              value={tempCompJSXVal}
              editorProps={{ $blockScrolling: true }}
              width={styleOptions.width}
              height={styleOptions.height}
            />
          </div>
        </div>
      </form>
    </motion.div>
  );

};

export default PropsWindow;