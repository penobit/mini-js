/**
 * Text content binding
 * @module binders/text
 */

/**
 * Binds text content to a state property
 * @param {HTMLElement} el - The element to bind
 * @param {string} prop - The state property to bind
 * @this {Object} - The module's state object
 * @throws {TypeError} - If el is not an HTMLElement
 * @throws {TypeError} - If prop is not a string
 * @example
 * // Bind text content to a state property
 * bindText.call(state, element, "message");
 *
 * // When the state changes, the element's text updates
 * state.message = "Hello World"; // element's text updates
 */
export function bindText(el, prop) {
  if (!(el instanceof HTMLElement)) {
    throw new TypeError('el must be an HTMLElement')
  }
  if (typeof prop !== 'string') {
    throw new TypeError('prop must be a string')
  }

  const update = () => (el.textContent = this[prop])
  update()
  this.watch(prop, update)
}
