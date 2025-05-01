/**
 * Utility functions for Mini.js
 * @module helpers
 */

/**
 * Checks if the given value is an object (excluding null)
 * @param {*} value - The value to check
 * @returns {boolean} - True if the value is an object, false otherwise
 * @example
 * isObject({}); // true
 * isObject(null); // false
 * isObject([1, 2, 3]); // true
 */
export function isObject(value) {
  return value !== null && typeof value === 'object'
}
