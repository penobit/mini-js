/**
 * Attribute binding
 * @module binders/attr
 */

/**
 * Binds an attribute to a state property
 * @param {HTMLElement} el - The element to bind
 * @param {string} expr - The attribute expression (e.g., "class:name" or "data-value:count")
 * @this {Object} - The module's state object
 * @throws {TypeError} - If el is not an HTMLElement
 * @throws {TypeError} - If expr is not a string
 * @example
 * // Bind a class attribute to a state property
 * bindAttr.call(state, element, "class:name");
 * 
 * // Bind a data attribute to a state property
 * bindAttr.call(state, element, "data-count:count");
 */
export function bindAttr(el, expr) {
    if (!(el instanceof HTMLElement)) {
        throw new TypeError("el must be an HTMLElement");
    }
    if (typeof expr !== "string") {
        throw new TypeError("expr must be a string");
    }

    const [attr, prop] = expr.split(/\s*:\s*/);
    const update = () => el.setAttribute(attr, this[prop]);
    update();
    this.watch(prop, update);
}
