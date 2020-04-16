function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var _temp;

/**
 * Manage preferences for your website with an easy to use API.
 */
module.exports = (_temp =
/*#__PURE__*/
function () {
  /**
   * The namespace is the key used to store the preferences in the localStorage Object.
   * 
   * @private
   * 
   * @property {string}
   */

  /**
   * A reference to this module's storage Object.
   * 
   * This is either created brand new or populated from an existing saved Object in the user's localStorage.
   * 
   * @private
   * 
   * @property {PrefStorage}
   */

  /**
   * A reference to the window's localStorage Object.
   * 
   * @private
   * 
   * @property {window.localStorage}
   */

  /**
   * @param {string} [namespace='prefs'] The namespace of the preferences in the localStorage. 
   */
  function Prefs() {
    var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'prefs';

    _classCallCheck(this, Prefs);

    _defineProperty(this, "_namespace", void 0);

    _defineProperty(this, "_prefs", {});

    _defineProperty(this, "_storage", window.localStorage);

    this._namespace = namespace;

    this._boot();
  }
  /**
   * Gets the name of the namespace.
   * 
   * @returns {string} 
   */


  _createClass(Prefs, [{
    key: "_boot",

    /**
     * When the module is initialized, we want to grab the localStorage Object if it exists and save it locally
     * so that we an override existing settings when needed.
     * 
     * We also need to set up any pre-existing preferences.
     * 
     * @private 
     */
    value: function _boot() {
      var prefs = this._storage.getItem(this._namespace);

      if (!prefs) return;
      this._prefs = JSON.parse(prefs);
      var prefsJSON = JSON.parse(prefs);

      for (var pref in prefsJSON) {
        var p = prefsJSON[pref];

        switch (p.type) {
          case 'toggle':
            if (p.data.status === true && !document.querySelector(p.data.element).classList.contains(p.data.classes[0])) {
              this.toggle(p.name);
            }

            break;
        }
      }
    }
    /**
     * Sets a preference that can toggle one or more classes on an element.
     * 
     * Affecting multiple elements with a toggle is possible by assinging them all the same name.
     * 
     * @param {string} name A unique key used to call this preference after it's created.
     * @param {string} element The  identifier to use to query for the element.
     * @param {string|Array<string>} classes One or more classes to toggle for the element defined above.
     * 
     * @example
     * 
     * const prefs = new Preferable('myapp');
     * 
     * prefs.setToggle('dark-mode', '#body', 'theme--dark');
     */

  }, {
    key: "setToggle",
    value: function setToggle(name, element, classes) {
      if (!name) throw new Error('A name for the preference must be provided');
      if (!Array.isArray(classes)) classes = [classes];
      var pref = {
        name: name,
        timestamp: +new Date(),
        type: 'toggle',
        data: {
          element: element,
          classes: classes,
          status: false
        }
      };
      this._prefs[pref.name] = pref;

      this._sync();
    }
    /**
     * Sets off a toggle preference by name.
     * 
     * @param {string} name The name of the toggle preference to toggle.
     * 
     * @example
     * 
     * const prefs = new Preferable('myapp');
     * 
     * prefs.setToggle('dark-mode', '#body', 'theme--dark');
     * 
     * prefs.toggle('dark-mode');
     */

  }, {
    key: "toggle",
    value: function toggle(name) {
      if (!name) throw new Error('The name of the preference to toggle is required');
      var pref = this._prefs[name];
      if (!pref) return;
      var element = document.querySelector(pref.data.element);
      pref.data.classes.map(function (cl) {
        return element.classList.toggle(cl);
      });
      pref.data.status = !pref.data.status;

      this._sync();
    }
    /**
     * Clears all of the preferences both locally annd in the localStorage.
     * 
     * @example
     * 
     * prefs.clear();
     */

  }, {
    key: "clear",
    value: function clear() {
      this._prefs = {};

      this._storage.removeItem(this._namespace);
    }
    /**
     * Updates the localStorage with the latest preferences from the local preferences Object.
     * 
     * @private
     */

  }, {
    key: "_sync",
    value: function _sync() {
      this._storage.setItem(this._namespace, JSON.stringify(this._prefs));
    }
  }, {
    key: "namespace",
    get: function get() {
      return this._namespace;
    }
  }]);

  return Prefs;
}(), _temp);
