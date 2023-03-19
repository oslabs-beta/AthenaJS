import React from 'react'
import useActions from '../hooks/useActions'

// Custom React hook that returns an object with functions
const SampleButton = () => {
    const { handleClick, logs } = useActions({handleClick: () => console.log('Button clicked')})
    
    return (
        <div>
            <button onClick = {handleClick}> Click Me</button>
            <div>
                {logs.map((log, index) => (
                    <p key = {index}>
                        {log.action} called
                    </p>
                ))}
            </div>
        </div>

    )
}

export default SampleButton;