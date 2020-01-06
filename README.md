<div align="center">

# preferable

preferable lets you manage preferences for your website with an easy to use API.

</div>

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/preferable.svg?style=flat)](https://www.npmjs.com/package/preferable)
  [![Known Vulnerabilities](https://snyk.io/test/github/robertcorponoi/preferable/badge.svg)](https://snyk.io/test/github/robertcorponoi/preferable)
  ![npm](https://img.shields.io/npm/dt/preferable)
  [![NPM downloads](https://img.shields.io/npm/dm/preferable.svg?style=flat)](https://www.npmjs.com/package/preferable)
  <a href="https://badge.fury.io/js/preferable"><img src="https://img.shields.io/github/issues/robertcorponoi/preferable.svg" alt="issues" height="18"></a>
  <a href="https://badge.fury.io/js/preferable"><img src="https://img.shields.io/github/license/robertcorponoi/preferable.svg" alt="license" height="18"></a>
  [![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/robertcorponoi)

</div>

## **Table of contents**

- [Install](#install)
- [Usage](#usage)
- [Initialization](#initialization)
- [Properties](#properties)
- [API](#api)
- [Tests](#tests)

## **Install**

To install preferable, you can use:

```shell
$ npm install preferable
```

## **Usage**

preferable is an ES6 module so to use it, you have to first import it and then create a new instance of it like so:

```js
// Webpack
import preferable from 'preferable';

// Browser
import preferable from './path/to/preferable.js';

const preferable = new preferable('myapp');
```

If you're using webpack, you can just require it like any other module:

```js
require('preferable');
```

## **Initialization**

preferable takes one parameter when being initialized, and that's the namespace that should be used for the localStorage key it will save preferences under.

By default, preferable will use the 'preferable' namespace but if you are concerned about collisions with other localStorage data you may have, you can choose a custom namespace on initialization.

```js
// Default settings on initialization, use namespace 'preferable'
const preferable = new preferable();
```

```js
// Use a custom namespace of 'myapp'
const preferable = new preferable('myapp');
```

## **Properties**

### **namespace**

Returns the name of the namespace set for this instance of preferable.

```js
const preferable = new preferable('myapp');

console.log(preferable.namespace); // myapp
```

## **API**

Currently preferable just has methods to create and toggle a toggleable preference but more ways to manage user preferences are coming soon.

### **setToggle**

Sets a toggle preference that can be toggled on/off by `toggle`.

| Param   | Type                    | Description                                                          | Default |
|---------|-------------------------|----------------------------------------------------------------------|---------|
| name    | string                  | Sets a preference that can toggle one or more classes on an element. |         |
| element | string                  | The  identifier to use to query for the element.                     |         |
| classes | string or Array<string> | One or more classes to toggle for the element defined above.         |         |

```js
const preferable = new preferable('myapp');

preferable.setToggle('dark-mode', '#body', 'theme--dark');
```

### **toggle**

Sets off a toggle preference by name.

| Param | Type   | Description                           | Default |
|-------|--------|---------------------------------------|---------|
| name  | string | The name of the preference to toggle. |         |

```js
const preferable = new preferable('myapp');

preferable.setToggle('dark-mode', '#body', 'theme--dark');
 
preferable.toggle('dark-mode');
```

### **clear**

Clears all preferences set.

```js
preferable.clear();
```

## **Tests**

To run the available tests for preferable, you can use:

```bash
$ npm run test
```

## **License**

MIT