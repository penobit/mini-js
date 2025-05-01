# mini.js

A lightweight JavaScript library that brings two-way data binding and state management to vanilla JavaScript applications. No dependencies required!

## Features

- Two-way data binding
- Reactive state management
- Computed properties
- Customizable bindings (text, HTML, attributes, model)
- Module-based architecture
- Zero dependencies

## Installation

You can include the script in your HTML file using either method:

1. Using jsDelivr CDN:
```html
<script src="https://cdn.jsdelivr.net/gh/penobit/mini-js@main/mini.min.js"></script>
```

2. Or self-host the file:
```html
<script src="mini.js"></script>
```

## Usage

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
  Count: {{count}}
</p>

<!-- Output: Count: 0 -->
```

#### HTML Binding

```html
<!-- Bind HTML content -->
<div mini:html="htmlContent"></div>

<!-- Bind with reactive template -->
<div mini:reactive mini:html>
  <p>Count: {{count}}</p>
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
const { state } = mini.module('app', {
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

## Example

Here's a complete example of a counter application:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mini.js Counter Example</title>
    <script src="https://cdn.jsdelivr.net/gh/penobit/mini-js@main/mini.min.js"></script>
</head>
<body>
    <div mini:module="counter">
        <h1 mini:bind="message"></h1>
        <p>Count: <span mini:bind="count"></span></p>
        <label for="count-input">Count:</label>
        <input id="count-input" mini:model="count" type="number" />
        <button onclick="increase()">Increment</button>
        <button onclick="decrease()">Decrement</button>

        <span penobit:bind="isPositive"></span>
    </div>

    <script defer>
    const state = mini.module('counter', {
        state: {
            message: 'Counter App',
            count: 0,
            
            // Computed property
            compute: {
                isPositive: (state) => state.count === 0 ? 'zero' : (state.count > 0 ? 'positive' : 'negative')
            }
        }
    });

    const increase = () => state.count = ~~state.count + 1
    const decrease = () => state.count = ~~state.count - 1

    state.watch('count', count => console.log('state->update count: ', count))
    state.watch('isPositive', count => console.log('state->update isPositive: ', count))
    </script>
</body>
</html>
```

## Browser Support

Works in all modern browsers that support ES6 features.

## License

MIT License - feel free to use this library in your projects!