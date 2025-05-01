import { isObject } from "./helpers";

/**
 * Creates a reactive state object for mini.js framework
 * @param {Object} initialState - The initial state object
 * @param {Function} notify - A callback that will be called when a property changes
 * @param {String} [path=""] - The path of the property (used for nested objects)
 * @return {Object} - The reactive state object with the following methods:
 * @return {Object.watch} - Watch a state property for changes
 * @return {Object.unwatch} - Remove a watcher from a state property
 * @return {Object.watchAll} - Watch all state properties for changes
 * @return {Object.compute} - Create computed properties that react to state changes
 * @throws {TypeError} - If initialState is not an object
 * @example
 * // Create a reactive state
 * const state = createState({
 *   count: 0,
 *   double: computed(() => state.count * 2)
 * });
 * 
 * // Watch for changes
 * state.watch('count', (newVal, oldVal) => {
 *   console.log(`Count changed from ${oldVal} to ${newVal}`);
 * });
 */
export function createState(initialState, notify, path = "") {
    /**
     * A map of property names to their respective watcher sets
     * @type {Map<String, Set<Function>>}
     * @private
     */
    const watchers = new Map();

    /**
     * A set of callbacks that will be called when any property changes
     * @type {Set<Function>}
     * @private
     */
    const watchAll = new Set();

    /**
     * A map of computed property names to their respective functions
     * @type {Map<String, Function>}
     * @private
     */
    const computeFns = new Map();

    /**
     * The proxy object
     * @type {Object}
     * @private
     */
    let proxy;

    /**
     * The handler for the proxy
     * @type {ProxyHandler<Object>}
     * @private
     */
    const handler = {
      /**
       * Called when a property is accessed
       * @param {Object} target - The target object
       * @param {String} prop - The property name
       * @return {*} - The value of the property
       * @throws {Error} - If trying to access special properties
       */
      get(target, prop) {
        if (prop === "__isProxy") return true;
        if (prop === "watch")
          return (key, cb) => {
            if (!watchers.has(key)) watchers.set(key, new Set());
            watchers.get(key).add(cb);
          };
        if (prop === "unwatch")
          return (key, cb) => {
            if (watchers.has(key)) watchers.get(key).delete(cb);
          };
        if (prop === "watchAll") return (cb) => watchAll.add(cb);
        if (prop === "compute")
          return (key, fn) => {
            computeFns.set(key, fn);
            proxy[key] = fn(proxy); // Assign initial value
          };
        return Reflect.get(target, prop);
      },

      /**
       * Called when a property is set
       * @param {Object} target The target object
       * @param {String} prop The property name
       * @param {*} value The new value of the property
       * @return {Boolean} Whether the operation was successful
       */
      set(target, prop, value) {
        const old = target[prop];
        if (old !== value) {
          target[prop] = isObject(value)
            ? deepProxy(value, notify, `${path}${prop}.`)
            : value;

          if (watchers.has(prop)) {
            for (const cb of watchers.get(prop)) cb(value, old);
          }
          for (const fn of watchAll) fn(prop, value);

          // Update computed values
          for (const [key, fn] of computeFns) {
            const newVal = fn(proxy);
            if (proxy[key] !== newVal) {
              proxy[key] = newVal;
              notify(key);
            }
          }

          // Notify all DOM elements that depend on this property
          notify(prop);
        }
        return true;
      },
    };

    /**
     * Create the proxy object
     * @type {Object}
     */
    proxy = new Proxy(initialState, handler);
    return proxy;
  }