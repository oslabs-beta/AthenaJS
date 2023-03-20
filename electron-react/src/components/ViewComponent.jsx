import React, { useContext } from 'react';
import { DetailsContext } from './context/DetailsContext';
import useActions from '@/hooks/useActions';

const ViewComponent = () => {

  const { compProps, compActions, compHTML } = useContext(DetailsContext);
  const { handleClick, logs } = useActions(compActions[0]);
  const [styles, setStyles] = compProps;

  return (
    <>
      <div id = 'rendered-component' dangerouslySetInnerHTML={{ __html: compHTML[0]}} onClick = {handleClick} style={styles}/>
      <div className = 'actions'>
        <h3>Actions</h3>
        <hr></hr>
        {logs.map((log, index) => (
          <p key = {index}>
            {log.action} called
          </p>
        ))}
      </div>
    </>
  )
};

export default ViewComponent;