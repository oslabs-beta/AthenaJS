const extractComponents = (data) => {
  let methods = '';
  const methodRegex = /(function\s+(\w+)\((.*?)\)\s*\{.*?\})|(const|let|var)\s+(\w+)\s*=\s*\(?(.*?)\)?\s*=>\s*{.*?}|function\s+(\w+)\((.*?)\)\s*{.*?}/gs;
  
  for (let match = methodRegex.exec(data); match !== null; match = methodRegex.exec(data)) {
    const startIndex = match.index;
    let depth = 0;
    let endIndex = startIndex;
  
    while (endIndex < data.length) {
      if (data[endIndex] === '{') {
        depth++;
      } else if (data[endIndex] === '}') {
        depth--;
        if (depth === 1) { // Check if depth is greater than one to exclude outer function
          endIndex++;
          break;
        }
      }
      endIndex++;
    }
  
    if (depth === 1) { // Check if depth is greater than one to exclude outer function
      const methodCode = data.substring(startIndex + 1, endIndex - 1); // Exclude brackets
      methods = methodCode;
    }
  }
  return methods;
};

const extractMethodsFromComponent = (component) => {
  const methods = [];
  const methodRegex = /(function\s+(\w+)\((.*?)\)\s*\{.*?\})|(const|let|var)\s+(\w+)\s*=\s*\(?(.*?)\)?\s*=>\s*{.*?}|function\s+(\w+)\((.*?)\)\s*{.*?}/gs;
  
  for (let match = methodRegex.exec(component); match !== null; match = methodRegex.exec(component)) {
    const startIndex = match.index;
    let depth = 0;
    let endIndex = startIndex;
  
    while (endIndex < component.length) {
      if (component[endIndex] === '{') {
        depth++;
      } else if (component[endIndex] === '}') {
        depth--;
        if (depth === 0) {
          endIndex++;
          break;
        }
      }
      endIndex++;
    }
  
    if (depth === 0) {
      const methodCode = component.substring(startIndex, endIndex);
      methods.push(methodCode);
    }
  }
  return methods;
};

  
const dataString = `
  import React, { useState } from 'react';
  
  function Button(props) {
    const [count, setCount] = useState(0);
  
    function handleClick() {
      setCount(count + 1);
    }
  
    return (
      <button onClick={handleClick}>
        {props.label} ({count})
      </button>
    );
  }
  
  export default Button;
  `;
  
const jsxComponent = extractComponents(dataString);
console.log ('JSXCOMPONENT', jsxComponent);

console.log(extractMethodsFromComponent(jsxComponent));
  