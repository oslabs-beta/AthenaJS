import React, {useState, useContext} from 'react';
import { useUserComp } from '@/hooks/useContextHooks';
import { UICompProps, component } from './UITypes';

//This is the UI we use to add/remove components from the react flow UI & change the background color for the react flow UI
const UIComps = ({bg, addNode, removeNode}: UICompProps) => {
  const {components, dispatch} = useUserComp();
  const [ bgColor, setBgColor ] = bg;
  const [ bgColorIn, setBgColorIn ] = useState<string>(bgColor);
   
  return(
    <div className = 'saved-comp-page'>
      <h1>Saved Components</h1>
      <div id = 'flow-info'>
        <input id = 'flow-background-input' onChange = {(e) => setBgColorIn(e.target.value)} value = {bgColorIn}/>
        <button id = 'flow-background-submit' onClick = {() => setBgColor(bgColorIn)}>Change BG Color</button>
      </div>
      <div className = 'saved-comps'>
        {components.length > 0 && components.map( (component: component): JSX.Element => (
          <div key = {component.name} className = 'saved-comp-container'>
            <span className = 'comp-container-name'>{component.name}</span>
            <button onClick = {() => addNode(component)}>Add </button>
            <button onClick = {() => removeNode(component)}> Remove </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UIComps;