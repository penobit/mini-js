/**
 * Two-way binding for form elements
 * @module binders/model
 */

/**
 * Binds a form element to a state property (two-way binding)
 * @param {HTMLElement} el - The form element to bind
 * @param {string} prop - The state property to bind
 * @this {Object} - The module's state object
 * @throws {TypeError} - If el is not an HTMLElement
 * @throws {TypeError} - If prop is not a string
 * @example
 * // Bind an input element to a state property
 * bindModel.call(state, inputElement, "value");
 * 
 * // When the state changes, the input value updates
 * state.value = "new value"; // input value updates
 * 
 * // When the input changes, the state updates
 * inputElement.value = "another value"; // state.value updates
 */
export function bindModel(el, prop) {
    if (!(el instanceof HTMLElement)) {
        throw new TypeError("el must be an HTMLElement");
    }
    if (typeof prop !== "string") {
        throw new TypeError("prop must be a string");
    }

    const update = () => {
        if (el.value !== this[prop]) {
            el.value = this[prop];
        }
    };
    update();

    this.watch(prop, update);
    
    el.addEventListener('input', () => {
        if (this[prop] !== el.value) {
            this[prop] = el.value;
        }
    });
}
