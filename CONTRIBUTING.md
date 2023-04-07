<p align="center" class="toc">
<strong><a href="#setup">Setup</a></strong>
|
<strong><a href="#documentation-editing">Documentation Editing</a></strong>
|
<strong><a href="#externals">Externals</a></strong>
|
<strong><a href="#iteration-roadmap">Iteration Roadmap</a></strong>
</p>
<hr/>

# Contributing

## Not sure where to start?

- you'll most likely need to read up on a few topics
  - Parsing
  - [ASTs](https://en.wikipedia.org/wiki/Abstract_syntax_tree) (Abstract Syntax Tree): 
    - We use Babel for parsing and traversing:  the Babel AST [spec](https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md) is a bit different from [ESTree](https://github.com/estree/estree).
    - Check out [the Babel Plugin Handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#babel-plugin-handbook), in particular the parser, traverser, and best practices section
    - Check out [AST Explorer](http://astexplorer.net/#/scUfOmVOG5) to learn more about ASTs
  - File Exploring
    - [FileReader - Web API MDN](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
  - the app's diagram as well
    - [Athena App Diagram (Excalidraw)](#)

<hr/>

## Developing


_Node_: Check that Node is [installed](https://nodejs.org/en/download/) You can check this with `node -v`.

_TypeScript_: 

### Setup

If you want to contribute to AthenaJS, the first step is to fork and clone the repository to your local machine. Once you've cloned it, navigate to the "electron-react" folder and run "npm run dev" to start up the application. This will allow you to begin making changes and testing your code.

```sh
git clone https://github.com/oslabs-beta/Athena.git
cd Athena/electron-react
```

Then you can run:

```sh
npm run build
```
to create the app DMG or ISO

OR

```sh
npm run dev
```

to view the app from the electron vite localhost

```jsx
// simple sample component
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
```

### Documentation Editing

Our Documentation is build off of Docusaurus 2, this is a link to the [WEBSITE](/electron-react/athena-website/README.md) readme 

<hr/>

## Important things to not change


```jsx title='electron-react/src/components/FileExplorer.jsx'
const traverse = require('@babel/traverse').default;
```

This line is crucial for using the traverse library in production mode. In development mode, the  `.default` at the end is not required, but for some reason the app cannot build without it.

## Externals

- AST spec ([babel-parser/ast/spec.md](https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md))

## Iteration Roadmap

- lorem ipsum