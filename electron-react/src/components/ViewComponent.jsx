import React, { useContext, useState } from 'react';
import { DetailsContext } from './context/DetailsContext';
import useActions from '@/hooks/useActions';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import stringifyObject from 'stringify-object'


const ViewComponent = () => {
  
  const { compProps, compActions, compHTML } = useContext(DetailsContext);
  const action = useActions(compActions[0]);
  const [styles, setStyles] = compProps;
  const string = `() => {
    const [ logs, setLogs ] = React.useState([])
    const actions = ${stringifyObject(compActions[0])}
    return(  
    <>
      ${compHTML[0]}
    </>
    )
      }`;
  return (
    <LiveProvider code= {string}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
)
};

export default ViewComponent;