/**
 * DOM binding utilities for Mini.js
 * @module binders/dom
 */

import { bindText, bindHTML, bindReactive, bindAttr, bindModel } from "./index";

/**
 * Binds DOM elements to state properties
 * @param {string} moduleName - The name of the module
 * @param {HTMLElement} root - The root element to search within
 * @this {Object} - The module's state object
 * @throws {TypeError} - If moduleName is not a string
 * @throws {TypeError} - If root is not an HTMLElement
 * @example
 * // Bind all elements in the module's root element
 * bindDOM.call(state, "myModule", document.getElementById("root"));
 */
export function bindDOM(moduleName, root) {
  if (typeof moduleName !== "string") {
    throw new TypeError("moduleName must be a string");
  }
  if (!(root instanceof HTMLElement)) {
    throw new TypeError("root must be an HTMLElement");
  }

  const attributes = ["bind", "reactive", "attr", "html", "model"];

  // Bind all elements with specified attributes (mini:bind, mini:reactive, etc.)
  const all = root.querySelectorAll(attributes.map(attr => `[mini\\:${attr}]`).join(","));

  all.forEach((el) => {
    const attr = el.getAttribute("mini:bind");
    if (attr) {
      bindText.call(this, el, attr);
    }

    const htmlAttr = el.getAttribute("mini:html");
    if (htmlAttr) {
      bindHTML.call(this, el, htmlAttr);
    }

    const reactiveAttr = el.getAttribute("mini:reactive");
    if (reactiveAttr) {
      const allowHTML = el.getAttribute("mini:allow-html") === "true";
      bindReactive.call(this, el, reactiveAttr, allowHTML);
    }

    const attrExpr = el.getAttribute("mini:attr");
    if (attrExpr) {
      bindAttr.call(this, el, attrExpr);
    }

    const modelAttr = el.getAttribute("mini:model");
    if (modelAttr) {
      bindModel.call(this, el, modelAttr);
    }
  });
}
