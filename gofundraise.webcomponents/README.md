# gf-payments

> A Vue.js component module

## Installation

### Using yarn

`yarn add gf-payments`

### Using npm

`npm i --save gf-payments`

## Demo and Docs

`npm run serve`

## Usage

### ES6 Modules / CommonJS

```js
import GfPayments from 'gf-payments';
import 'gf-payments/dist/gf-payments.min.css';

Vue.component('gf-payments', GfPayments);
```

```html
<gf-payments text="Hello World!"></gf-payments>
```

### UMD

```html
<gf-payments text="Hello World!"></gf-payments>

<script src="https://unpkg.com/vue" charset="utf-8"></script>
<script src="./dist/umd/gf-payments.min.js" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="./dist/umd/gf-payments.min.css">

<script type="text/javascript">
  Vue.component('gf-payments', window.GfPayments.default);
</script>
```

## Build

Build configuration is located in the `poi.config.js` file, to build just run: `npm run build`, it will build to `cjs` and `umd` directories.

## Tests

This template uses karma with chai by default, you can change test settings in poi.config.js

`npm run test`
`npm run test:watch`
`npm run test:cov`

## License

This project is licensed under [MIT License](http://en.wikipedia.org/wiki/MIT_License)
