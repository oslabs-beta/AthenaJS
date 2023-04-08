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

If you're reading this document, we're really excited that you want to contribute to the project!  All work on AthenaJS happens directly on GitHub. If you would like to contribute, please send a pull request to the dev branch.  The following guide has some useful information, so we highly recommend you take a look at it before getting started!

## Not sure where to start?

- You'll most likely need to read up on a few topics
  - Parsing
  - [ASTs](https://en.wikipedia.org/wiki/Abstract_syntax_tree) (Abstract Syntax Tree): 
    - We use Babel for parsing and traversing user uploaded files:  the Babel AST [spec](https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md) is a bit different from [ESTree](https://github.com/estree/estree).
    - Check out [the Babel Plugin Handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#babel-plugin-handbook), in particular the parser, traverser, and best practices section
    - Check out [AST Explorer](http://astexplorer.net/#/scUfOmVOG5) to learn more about ASTs
  - File Reader
    - [FileReader - Web API MDN](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
  - 
  - Helpful diagrams
    - [Athena App Diagram (Excalidraw)](#)
<hr/>

### Setup

If you want to contribute to AthenaJS, the first step is to fork and clone the repository to your local machine. Once you've cloned it, navigate to the "electron-react" folder and run "npm run dev" to start up the application after installing the dependencies. This will allow you to begin making changes and testing your code. 

```sh
git clone https://github.com/oslabs-beta/Athena.git
cd Athena/electron-react
```

Then you can run:

```sh
npm run dev
```
Which will spin up the application on your local machine.  AthenaJS uses Vite for an enhanced development experience with really fast HMR.  Any changes you make to the codebase on your local machine will be quickly reflected on your running instance of AthenaJS!

## Externals

- AST spec ([babel-parser/ast/spec.md](https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md))

## File Structure

- Electron React (Root Directory for AthenaJS Project)
  - Electron (Electron)
  - src (React)
    - Index.tsx (Hangs app off of root and wraps app in context providers)
    - App.tsx
    - Pages
      - UI Page
      - Workshop
    - Components



## License
By contributing to AthenaJS, you agree that your contributions will be licensed under its MIT license.
