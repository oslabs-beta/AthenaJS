import React, { useContext, useState } from 'react';
import { DetailsContext } from './context/DetailsContext';
import useActions from '@/hooks/useActions';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import stringifyObject from 'stringify-object';


const ViewComponent = () => {
  const { compProps, compActions, compHTML } = useContext(DetailsContext);
  const action = useActions(compActions[0]);
  const [styles, setStyles] = compProps;
  // console.log(compActions[0]);
  const string = `() => {
    const [ count, setCount ] = React.useState(2)
    const actions = ${stringifyObject(compActions[0])}
    const props = ${compProps[0]}
    return(  
    <>
      ${compHTML[0]}
    </>
    )
      }`;
  return (
    <div id='navigation-area'>
      <LiveProvider code= {string}>
        <LivePreview />
        <LiveError />
      </LiveProvider>
    </div>
);
};

export default ViewComponent;