/**
 * HTML content binding
 * @module binders/html
 */

/**
 * Binds HTML content to a state property
 * @param {HTMLElement} el - The element to bind
 * @param {string} prop - The state property to bind
 * @this {Object} - The module's state object
 * @throws {TypeError} - If el is not an HTMLElement
 * @throws {TypeError} - If prop is not a string
 * @example
 * // Bind HTML content to a state property
 * bindHTML.call(state, element, "content");
 *
 * // When the state changes, the element's HTML updates
 * state.content = "<p>Hello <strong>World</strong></p>"; // element's HTML updates
 */
export function bindHTML(el, prop) {
  if (!(el instanceof HTMLElement)) {
    throw new TypeError('el must be an HTMLElement')
  }
  if (typeof prop !== 'string') {
    throw new TypeError('prop must be a string')
  }

  const update = () => (el.innerHTML = this[prop])
  update()
  this.watch(prop, update)
}
