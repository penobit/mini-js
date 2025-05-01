/**
 * Reactive template binding
 * @module binders/reactive
 */

/**
 * Binds a reactive template to an element
 * @param {HTMLElement} el - The element to bind
 * @param {string} template - The template string with {property} placeholders
 * @param {boolean} [allowHTML=false] - Whether to allow HTML content
 * @this {Object} - The module's state object
 * @throws {TypeError} - If el is not an HTMLElement
 * @throws {TypeError} - If template is not a string
 * @example
 * // Bind a template with multiple properties
 * bindReactive.call(state, element, "Hello {name}, you have {count} items");
 *
 * // When state properties change, the element updates automatically
 * state.name = "John"; // element updates
 * state.count = 5; // element updates
 */
export function bindReactive(el, template, allowHTML = false) {
  if (!(el instanceof HTMLElement)) {
    throw new TypeError('el must be an HTMLElement')
  }
  if (typeof template !== 'string') {
    throw new TypeError('template must be a string')
  }

  const vars = [...template.matchAll(/\{(.*?)\}/g)].map((x) => x[1])
  const update = () => {
    const value = template.replace(/\{(.*?)\}/g, (_, k) => this[k])

    if (allowHTML) {
      el.innerHTML = value
    } else {
      el.innerText = value
    }
  }
  update()
  vars.forEach((v) => {
    this.watch(v, update)
  })
}
