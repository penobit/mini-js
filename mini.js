(function () {
  const modules = {};

  function isObject(obj) {
    return obj !== null && typeof obj === "object";
  }

  function deepProxy(obj, notify, path = "") {
    const watchers = new Map();
    const watchAll = new Set();
    const computeFns = new Map();
    let proxy;

    const handler = {
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

    proxy = new Proxy(obj, handler);
    return proxy;
  }

  // Function to bind DOM elements to state properties using state.watch()
  function bindDOM(moduleName, state, root) {
    const bindText = (el, prop) => {
      const update = () => (el.textContent = state[prop]);
      update();
      state.watch(prop, update);
    };

    const bindHTML = (el, prop) => {
      const update = () => (el.innerHTML = state[prop]);
      update();
      state.watch(prop, update);
    };

    const bindReactive = (el, template, allowHTML = false) => {
      const vars = [...template.matchAll(/\{(.*?)\}/g)].map((x) => x[1]);
      const update = () => {
        const value = template.replace(/\{(.*?)\}/g, (_, k) => state[k]);

        if (allowHTML) {
          el.innerHTML = value;
        } else {
          el.innerText = value;
        }
      };
      update();
      vars.forEach((v) => {
        state.watch(v, update);
      });
    };

    const bindAttr = (el, expr) => {
      const [attr, prop] = expr.split(/\s*:\s*/);
      const update = () => el.setAttribute(attr, state[prop]);
      update();
      state.watch(prop, update);
    };

    const bindModel = (el, prop) => {
      const update = () => {
        if (el.value !== state[prop]) {
          el.value = state[prop];
        }
      };
      update();

      // Make sure to trigger the state update when the input changes
      el.addEventListener("input", () => {
        const newValue = el.value;
        if (state[prop] !== newValue) {
          state[prop] = newValue; // Update state
        }
      });

      state.watch(prop, update);
    };

    // Bind all elements with specified attributes (mini:bind, mini:reactive, etc.)
    const all = root.querySelectorAll(
      "[mini\\:bind], [mini\\:reactive], [mini\\:attr], [mini\\:model], [mini\\:html]"
    );
    all.forEach((el) => {
      if (
        el.closest("[mini\\:module]")?.getAttribute("mini:module") !==
        moduleName
      )
        return;

      if (el.hasAttribute("mini:bind"))
        bindText(el, el.getAttribute("mini:bind"));
      if (el.hasAttribute("mini:reactive"))
        bindReactive(el, el.textContent, el.hasAttribute("mini:html"));
      if (el.hasAttribute("mini:html") && !el.hasAttribute("mini:reactive"))
        bindHTML(el, el.getAttribute("mini:html"));
      if (el.hasAttribute("mini:attr"))
        bindAttr(el, el.getAttribute("mini:attr"));
      if (el.hasAttribute("mini:model"))
        bindModel(el, el.getAttribute("mini:model"));
    });
  }

  window.mini = {
    module(name, options) {
      const root = document.querySelector(`[mini\\:module="${name}"]`);
      if (!root) throw new Error(`No root element found for module: ${name}`);

      // Define notify after defining the state
      const state = deepProxy(options.state || {}, () => {}, "");
      bindDOM(name, state, root);

      state
    },
  };
})();
