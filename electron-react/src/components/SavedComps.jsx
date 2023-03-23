import React, {useState, useContext} from 'react';
import { useUserCompContext } from '@/hooks/useUserCompContext';
import { DetailsContext } from './context/DetailsContext';
import { MockFetchContext } from './context/MockFetchContext';
import { PerformanceContext } from './context/PerformanceContext';

const SavedComps = () => {
  const {components, dispatch} = useUserCompContext();
  //Global state to handle component in the viewer
  const { compProps, compActions, compHTML, compState } = useContext(DetailsContext);
  const [compPropsVal, setCompPropsVal] = compProps;
  const [compActionsVal, setCompActionsVal] = compActions;
  const [compHTMLVal, setCompHTMLVal] = compHTML;
  const [compStateVal, setCompStateVal] = compState;
  const { mockServer } = useContext(MockFetchContext);
  const [ mockServerVal, setMockServerVal ] = mockServer;

  const { keyCount } = useContext(PerformanceContext);
  const [ keyCountVal , setKeyCountVal] = keyCount;

  const renderComponent = (component) => {
    console.log(component);
    setCompPropsVal(component.props);
    setCompActionsVal(component.actions);
    setCompHTMLVal(component.html);
    setCompStateVal(component.state);
    setMockServerVal(component.mockServer);
    setKeyCountVal(keyCountVal + 1);
  };

  const handleDelete = (component) => {
    dispatch({type: 'DELETE_COMPS', payload: component.name});
  };

  return(
    <div className = 'saved-comp-page'>
      <h2>Saved Components</h2>
      {components.length > 0 && components.map( (component) => (
        <div key = {component.name} className = 'saved-comp-container'>
          <button onClick = {() => renderComponent(component)}>{component.name}</button>
          <button onClick = {() => handleDelete(component)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default SavedComps;