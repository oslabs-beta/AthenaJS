<style>
h1, h2, h3, h4 {
  border-bottom: none;
}
</style>

<p align="center" class="toc">
<strong><a href="#setup">Setup</a></strong>
|
<strong><a href="#externals">Externals</a></strong>
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



<hr/>

## Developing

_Node_: Check that Node is [installed](https://nodejs.org/en/download/) You can check this with `node -v`.

_TypeScript_: 

### Setup

clone the repo and

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

<hr/>

## Externals

- AST spec ([babel-parser/ast/spec.md](https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md))