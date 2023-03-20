import React, { useContext } from 'react';
import { DetailsContext } from './context/DetailsContext';
import useActions from '@/hooks/useActions';

const ViewComponent = () => {

  const { compProps, compActions, compHTML } = useContext(DetailsContext);
  const { handleClick, logs } = useActions(compActions[0]);
  const [styles, setStyles] = compProps;

  const Component = compHTML;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: compHTML[0]}} onClick = {handleClick} style={styles}/>
      {logs.map((log, index) => (
        <p key = {index}>
          {log.action} called
        </p>
      ))}
    </>
  )
};

export default ViewComponent;