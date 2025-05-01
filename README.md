# mini.js

A lightweight JavaScript library that brings two-way data binding and state management to vanilla JavaScript applications. No dependencies required!

> **✨ Ultra-lightweight**: The entire library is just **3.01KB** minified and **1.11KB** gzipped!

## Features

- Two-way data binding
- Reactive state management
- Computed properties
- Customizable bindings (text, HTML, attributes, model)
- Module-based architecture with nested modules support
- Zero dependencies

## Installation

mini.js can be used in three different ways:

### Option 1: Package Manager

Install using npm or yarn:

```bash
npm install mini-js
# or
yarn add mini-js
```

Then import it in your JavaScript file:
```javascript
import mini from 'mini-js';
```

### Option 2: CDN

Use the jsDelivr CDN to include mini.js in your HTML:

```html
<script src="https://cdn.jsdelivr.net/gh/penobit/mini-js@main/dist/mini.umd.js"></script>
```

### Option 3: Build and Use

1. Clone the repository:
```bash
git clone https://github.com/penobit/mini-js.git
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Build the project:
```bash
npm run build
# or
yarn build
```

4. Use the built file from the `dist` directory:
```html
<script src="dist/mini.umd.js"></script>
```

## Usage

### Running Examples

To run the examples, follow these steps:

1. Install dependencies:
```bash
npm install
# or
yarn
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```

3. Access the examples through the development server:

   - Counter Example: http://localhost:3000/examples/counter.html
   - Nested Modules Example: http://localhost:3000/examples/nested-modules.html

### Basic Setup

1. Create a module root element in your HTML:

```html
<div mini:module="app"></div>
```

2. Initialize the module with your state:

```javascript
mini.module('app', {
  state: {
    message: 'Hello, mini.js!',
    count: 0
  }
});
```

### Binding Types

#### Text Binding

```html
<!-- Bind text content -->
<p mini:bind="message"></p>

<!-- Output: Hello, mini.js! -->
```

#### Reactive Binding

```html
<!-- Use template literals with reactive variables -->
<p mini:reactive>
  Count: {count}
</p>

<!-- Output: Count: 0 -->
```

#### HTML Binding

```html
<!-- Bind HTML content -->
<div mini:html="htmlContent"></div>

<!-- Bind with reactive template -->
<div mini:reactive mini:html>
  <p>Count: {count}</p>
</div>
```

#### Attribute Binding

```html
<!-- Bind attributes -->
<img mini:attr="src: imageUrl" />
```

#### Two-way Model Binding

```html
<!-- Two-way binding for input elements -->
<input mini:model="searchText" />

<!-- Works with all form elements -->
<textarea mini:model="content"></textarea>
<select mini:model="selectedOption"></select>
```

### Computed Properties

```javascript
mini.module('app', {
  state: {
    firstName: 'John',
    lastName: 'Doe',
    
    // Define computed property
    compute: {
      fullName: (state) => `${state.firstName} ${state.lastName}`
    }
  }
});
```

### Watchers

```javascript
const state = mini.module('app', {
  state: {
    count: 0
  }
});

// Watch a single property
state.watch('count', (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`);
});

// Watch all changes
state.watchAll((prop, value) => {
  console.log(`${prop} changed to ${value}`);
});
```

## Examples

Check out the following example files in the [examples](https://github.com/penobit/mini-js/tree/main/examples) directory:

1. [counter.html](https://github.com/penobit/mini-js/blob/main/examples/counter.html) - A simple counter application demonstrating basic state management and computed properties
2. [nested-modules.html](https://github.com/penobit/mini-js/blob/main/examples/nested-modules.html) - A more complex example showing nested modules and module hierarchy

You can also run these examples locally by opening the files in your web browser.

## Browser Support

Works in all modern browsers that support ES6 features.

## License

MIT License - feel free to use this library in your projects!