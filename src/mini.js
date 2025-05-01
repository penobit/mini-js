/**
 * Mini.js - A lightweight JavaScript library for reactive DOM manipulation
 * @module mini
 */

import { createState } from './state.js';
import { bindDOM } from './binders/dom.js';

/**
 * @typedef {Object} MiniModuleOptions
 * @property {Object} [state] - Initial state object for the module
 */

/**
 * @typedef {Object} MiniModule
 * @property {Function} watch - Watch a state property for changes
 * @property {Function} unwatch - Remove a watcher
 * @property {Function} watchAll - Watch all state properties
 * @property {Function} compute - Create computed properties
 */

/**
 * Main Mini.js library
 * @namespace mini
 */
const mini = {
  /**
   * Create a new module with reactive state and DOM bindings
   * @param {string} name - The name of the module
   * @param {MiniModuleOptions} options - Module configuration options
   * @returns {MiniModule} The module instance with reactive state
   * @throws {Error} If no root element is found for the module
   */
  module(name, options) {
    const root = document.querySelector(`[mini\\:module="${name}"]`);
    if (!root) throw new Error(`No root element found for module: ${name}`);

    // Define notify after defining the state
    const state = createState(options.state || {}, () => {}, "");
    bindDOM.call(state, name, root);

    return state;
  },
};

window.mini = mini;
export default mini;
