import React from 'react';
import useActions from '../hooks/useActions';

// Custom React hook that returns an object with functions
const SampleButton = () => {
  const { handleClick, logs } = useActions({handleClick: () => console.log('Button clicked')});
  //We can now give our component the handleClick prop, notice the object that we pass into useActions is the 'actions' object.  It has a function name as a key and a function definition as a value.
  return (
    <div>
      {/* When clicked the button will log 'button clicked' to the console and it will log 'handleClick called' to our UI log that we created. */}
      <button onClick = {handleClick}> Click Me</button>
      <div>
        {logs.map((log, index) => (
          <p key = {index}>
            {log.action} called
          </p>
        ))}
      </div>
    </div>

  );
};

export default SampleButton;