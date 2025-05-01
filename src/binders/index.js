/**
 * DOM binding utilities for Mini.js
 * @module binders
 */

/**
 * Binds text content to a state property
 * @param {HTMLElement} el - The element to bind
 * @param {string} prop - The state property to bind
 * @this {Object} - The module's state object
 * @example
 * bindText.call(state, element, "text");
 */
export { bindText } from './text';

/**
 * Binds HTML content to a state property
 * @param {HTMLElement} el - The element to bind
 * @param {string} prop - The state property to bind
 * @this {Object} - The module's state object
 * @example
 * bindHTML.call(state, element, "html");
 */
export { bindHTML } from './html';

/**
 * Binds reactive template strings to a state property
 * @param {HTMLElement} el - The element to bind
 * @param {string} template - The template string with {property} placeholders
 * @param {boolean} [allowHTML=false] - Whether to allow HTML content
 * @this {Object} - The module's state object
 * @example
 * bindReactive.call(state, element, "Hello {name}");
 */
export { bindReactive } from './reactive';

/**
 * Binds attributes to state properties
 * @param {HTMLElement} el - The element to bind
 * @param {string} expr - The attribute expression (e.g., "class:name")
 * @this {Object} - The module's state object
 * @example
 * bindAttr.call(state, element, "class:name");
 */
export { bindAttr } from './attr';

/**
 * Binds form elements to state properties (two-way binding)
 * @param {HTMLElement} el - The element to bind
 * @param {string} prop - The state property to bind
 * @this {Object} - The module's state object
 * @example
 * bindModel.call(state, inputElement, "value");
 */
export { bindModel } from './model';
