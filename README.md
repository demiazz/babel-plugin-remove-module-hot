# babel-plugin-remove-module-hot

Remove `module.hot` conditions.

<a href="https://evilmartians.com/?utm_source=postcss">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>

## Example

#### in

```js
console.log('Do something always');

if (module.hot) {
  console.log('Do something, when hot reload available');
}

if (module.hot) {
  console.log('Do something, when hot reload available');
} else {
  console.log('Do something, when hot reload unavailable');
}

if (!module.hot) {
  console.log('Do something, when hot reload unavailable');
}

const variable = module.hot ? 'hot' : 'not hot';
```

#### out

```js
console.log('Do something always');

if (true) {
  console.log('Do something, when hot reload unavailable');
}

if (!module.hot) {
  console.log('Do something, when hot reload unavailable');
}

const variable = 'not hot';
```

## Warning

This plugin removes only simple condition like in example, and doesn't process more complex
expressions.

## Installation

```sh
$ npm install babel-plugin-remove-module-hot
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["remove-module-hot"]
}
```

### Via CLI

```sh
$ babel --plugins remove-module-hot script.js
```

### Via Node API

```javascript
require('babel-core').transform('code', {
  plugins: ['remove-module-hot']
});
```
