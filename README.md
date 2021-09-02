# @merged/react-solid

A way to use Solid components inside React

Also this package comes with a configured [vite](https://www.npmjs.com/package/vite) plugin, that uses [vite-plugin-solid](https://www.npmjs.com/package/vite-plugin-solid)
internally but can be restricted to a folder / pattern, so that React and Solid can life in the same codebase.

## Limitation

* Solid component children will be wrapped in an extra `<div />` by default (can be configured via `childrenContainer` prop)

## Example 

*App.tsx (Solid)*
```tsx
import type { Component } from 'solid-js'

interface AppProps {
  onClick: (event: MouseEvent) => void
}

export const App: Component = ({ onClick, children }) => (
  <div>
    <button type="button" onClick={onClick}>Click me!</button>
    <p>
      {children}
    </p>
  </div>
)
```

*main.tsx (React)*
```jsx
import React from 'react'
import { Solid } from '@merged/react-solid'
import { App } from './App.tsx' // this is a Solid component

export const ReactComponent = () => {
  const handleClick = (event: MouseEvent) => {
    console.log('clicked!')
  }

  return (
    <Solid
        component={App}
        onClick={handleClick}
    >
      <span>I'm a child!</span>
    </Solid>
  )
}
```

## Using the vite plugin

Lets assume, we have all our solid Components in the folder `src/solid`:

*vite.config.ts*
```ts
import { defineConfig } from "vite";
import jsxRefresh from "@vitejs/plugin-react-refresh"
import { narrowSolidPlugin } from "react-solid-bridge/plugin"

export default defineConfig({
  plugins: [narrowSolidPlugin({ include: /\/src\/solid/ }), jsxRefresh({exclude: /\/src\/solid\//})],
});
```

That way, all *.tsx files inside `src/solid` will be handled by the solid plugin, while everything else will still be handled by react.

## Bonus tip: Telling vscode how to handle both react and solid with typescript

Configure your `tsconfig.json` like for every other react propect.

In `src/solid` place another `tsconfig.json` that looks someting like this:

*tsconfig.json*
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "solid-js",
  }
}
```
