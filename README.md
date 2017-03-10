## babel-plugin-jsx-component-showing-controll  

v1.0.7

Inspired by [babel-plugin-jsx-if](https://github.com/motion/babel-transform-jsx-if).  

Showing current component or other component conditionally

### Install

`yarn add babel-plugin-jsx-component-showing-controll -D`

### Usage

.babelrc

```
{
  ...
  "plugins": [
    ...,
    "jsx-component-showing-controll"
  ]
}
```

Component.js

```jsx
import React, { PureComponent } from 'react'

// Or require it globally
const InLoading = () => (<div>loading...</div>) // eslint-disable-line

export default class Component extends PureComponent {
  render() {
    return (
      <div is-show={!this.props.loading} >
        current component
      </div>
    )
  }
  // conver to
  // (this.props.loading ? <InLoading /> : <div>current component </div>)
}

```

Showing custom tag instead of InLoading

```jsx
import React, { PureComponent } from 'react'

const Loading = () => (<div>loading...</div>) // eslint-disable-line

export default class Component extends PureComponent {
  render() {
    return (
      <div is-show={!this.props.loading} show-tag="Loading">
        current component
      </div>
    )
  }
  // conver to
  // (this.props.loading ? <Loading /> : <div>current component </div>)
}

```

### Use case

* loading display
* permission controll
* other conditional component display case
