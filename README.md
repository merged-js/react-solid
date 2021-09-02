# react-solid-bridge

A way to use Solid components inside React

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
import { Solid } from 'react-solid-bridge'
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
