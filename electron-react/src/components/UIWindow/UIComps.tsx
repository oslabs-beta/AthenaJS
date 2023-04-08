import React, {useState, useContext, useEffect} from 'react';
import { useUserComp } from '../../hooks/useContextHooks';
import { UICompProps, component } from './UITypes';

//This is the UI we use to add/remove components from the react flow UI & change the background color for the react flow UI
const UIComps = ({bg, addNode, removeNode}: UICompProps) => {
  const {components, dispatch} = useUserComp();
  const [ bgColor, setBgColor ] = bg;
  const [ bgColorIn, setBgColorIn ] = useState<string>(bgColor);
  const [ search, setSearch ] = useState<string>('');
  const [ showComponents, setShowComponents ] = useState<component[]>([...components]);

  useEffect((): void => {
    if(search) {
      return setShowComponents(showComponents.filter(component => component.name.toLowerCase().includes(search.toLowerCase())));
    } else {
      return setShowComponents([...components]);
    }
  }, [search]);
   
  return(
    <div className = 'saved-comp-page'>
      <h1>Saved Components</h1>
      <div id = 'flow-info'>
        <input id = 'flow-background-input' onChange = {(e) => setBgColorIn(e.target.value)} value = {bgColorIn}/>
        <button id = 'flow-background-submit' onClick = {() => setBgColor(bgColorIn)}>Change BG Color</button>
      </div>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search Component'
      />
      <div className = 'saved-comps'>
        {showComponents.length > 0 && showComponents.map( (component: component): JSX.Element => (
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