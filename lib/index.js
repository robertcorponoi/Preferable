'use strict';

var _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwibmFtZXNwYWNlIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiX25hbWVzcGFjZSIsIl9ib290IiwicHJlZnMiLCJfc3RvcmFnZSIsImdldEl0ZW0iLCJfcHJlZnMiLCJKU09OIiwicGFyc2UiLCJwcmVmc0pTT04iLCJwcmVmIiwicCIsInR5cGUiLCJkYXRhIiwic3RhdHVzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZWxlbWVudCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiY2xhc3NlcyIsInRvZ2dsZSIsIm5hbWUiLCJFcnJvciIsIkFycmF5IiwiaXNBcnJheSIsInRpbWVzdGFtcCIsIkRhdGUiLCJfc3luYyIsIm1hcCIsImNsIiwicmVtb3ZlSXRlbSIsInNldEl0ZW0iLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFLQTs7O0FBR0FBLE1BQU0sQ0FBQ0MsT0FBUDtBQUFBO0FBQUE7QUFDRTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7OztBQVdBOzs7Ozs7OztBQVNBOzs7QUFHQSxtQkFBeUM7QUFBQSxRQUE3QkMsU0FBNkIsdUVBQVQsT0FBUzs7QUFBQTs7QUFBQTs7QUFBQSxvQ0FkWCxFQWNXOztBQUFBLHNDQUxiQyxNQUFNLENBQUNDLFlBS007O0FBQ3ZDLFNBQUtDLFVBQUwsR0FBaUJILFNBQWpCOztBQUVBLFNBQUtJLEtBQUw7QUFDRDtBQUVEOzs7Ozs7O0FBdkNGO0FBQUE7O0FBOENFOzs7Ozs7OztBQTlDRiw0QkFzRGtCO0FBQ2QsVUFBTUMsS0FBc0IsR0FBRyxLQUFLQyxRQUFMLENBQWNDLE9BQWQsQ0FBc0IsS0FBS0osVUFBM0IsQ0FBL0I7O0FBRUEsVUFBSSxDQUFDRSxLQUFMLEVBQVk7QUFFWixXQUFLRyxNQUFMLEdBQWNDLElBQUksQ0FBQ0MsS0FBTCxDQUFXTCxLQUFYLENBQWQ7QUFFQSxVQUFNTSxTQUFTLEdBQUdGLElBQUksQ0FBQ0MsS0FBTCxDQUFXTCxLQUFYLENBQWxCOztBQUVBLFdBQUssSUFBTU8sSUFBWCxJQUFtQkQsU0FBbkIsRUFBOEI7QUFDNUIsWUFBTUUsQ0FBTyxHQUFHRixTQUFTLENBQUNDLElBQUQsQ0FBekI7O0FBRUEsZ0JBQVFDLENBQUMsQ0FBQ0MsSUFBVjtBQUNFLGVBQUssUUFBTDtBQUNFLGdCQUFJRCxDQUFDLENBQUNFLElBQUYsQ0FBT0MsTUFBUCxLQUFrQixJQUFsQixJQUEwQixDQUFDQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUJMLENBQUMsQ0FBQ0UsSUFBRixDQUFPSSxPQUE5QixFQUF1Q0MsU0FBdkMsQ0FBaURDLFFBQWpELENBQTBEUixDQUFDLENBQUNFLElBQUYsQ0FBT08sT0FBUCxDQUFlLENBQWYsQ0FBMUQsQ0FBL0IsRUFBNkc7QUFDM0csbUJBQUtDLE1BQUwsQ0FBWVYsQ0FBQyxDQUFDVyxJQUFkO0FBQ0Q7O0FBQ0Q7QUFMSjtBQU9EO0FBQ0Y7QUFFRDs7Ozs7Ozs7Ozs7Ozs7OztBQTVFRjtBQUFBO0FBQUEsOEJBMkZZQSxJQTNGWixFQTJGMEJMLE9BM0YxQixFQTJGMkNHLE9BM0YzQyxFQTJGOEU7QUFDMUUsVUFBSSxDQUFDRSxJQUFMLEVBQVcsTUFBTSxJQUFJQyxLQUFKLENBQVUsNENBQVYsQ0FBTjtBQUVYLFVBQUksQ0FBQ0MsS0FBSyxDQUFDQyxPQUFOLENBQWNMLE9BQWQsQ0FBTCxFQUE2QkEsT0FBTyxHQUFHLENBQUNBLE9BQUQsQ0FBVjtBQUU3QixVQUFNVixJQUFVLEdBQUc7QUFDakJZLFFBQUFBLElBQUksRUFBRUEsSUFEVztBQUVqQkksUUFBQUEsU0FBUyxFQUFFLENBQUMsSUFBSUMsSUFBSixFQUZLO0FBR2pCZixRQUFBQSxJQUFJLEVBQUUsUUFIVztBQUlqQkMsUUFBQUEsSUFBSSxFQUFFO0FBQUVJLFVBQUFBLE9BQU8sRUFBRUEsT0FBWDtBQUFvQkcsVUFBQUEsT0FBTyxFQUFFQSxPQUE3QjtBQUFzQ04sVUFBQUEsTUFBTSxFQUFFO0FBQTlDO0FBSlcsT0FBbkI7QUFPQSxXQUFLUixNQUFMLENBQVlJLElBQUksQ0FBQ1ksSUFBakIsSUFBeUJaLElBQXpCOztBQUVBLFdBQUtrQixLQUFMO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7Ozs7QUE1R0Y7QUFBQTtBQUFBLDJCQXlIU04sSUF6SFQsRUF5SHVCO0FBQ25CLFVBQUksQ0FBQ0EsSUFBTCxFQUFXLE1BQU0sSUFBSUMsS0FBSixDQUFVLGtEQUFWLENBQU47QUFFWCxVQUFNYixJQUFVLEdBQUcsS0FBS0osTUFBTCxDQUFZZ0IsSUFBWixDQUFuQjtBQUVBLFVBQUksQ0FBQ1osSUFBTCxFQUFXO0FBRVgsVUFBTU8sT0FBb0IsR0FBR0YsUUFBUSxDQUFDQyxhQUFULENBQXVCTixJQUFJLENBQUNHLElBQUwsQ0FBVUksT0FBakMsQ0FBN0I7QUFFQVAsTUFBQUEsSUFBSSxDQUFDRyxJQUFMLENBQVVPLE9BQVYsQ0FBa0JTLEdBQWxCLENBQXNCLFVBQUNDLEVBQUQ7QUFBQSxlQUFnQmIsT0FBTyxDQUFDQyxTQUFSLENBQWtCRyxNQUFsQixDQUF5QlMsRUFBekIsQ0FBaEI7QUFBQSxPQUF0QjtBQUVBcEIsTUFBQUEsSUFBSSxDQUFDRyxJQUFMLENBQVVDLE1BQVYsR0FBbUIsQ0FBQ0osSUFBSSxDQUFDRyxJQUFMLENBQVVDLE1BQTlCOztBQUVBLFdBQUtjLEtBQUw7QUFDRDtBQUVEOzs7Ozs7OztBQXpJRjtBQUFBO0FBQUEsNEJBZ0pVO0FBQ04sV0FBS3RCLE1BQUwsR0FBYyxFQUFkOztBQUVBLFdBQUtGLFFBQUwsQ0FBYzJCLFVBQWQsQ0FBeUIsS0FBSzlCLFVBQTlCO0FBQ0Q7QUFFRDs7Ozs7O0FBdEpGO0FBQUE7QUFBQSw0QkEySmtCO0FBQ2QsV0FBS0csUUFBTCxDQUFjNEIsT0FBZCxDQUFzQixLQUFLL0IsVUFBM0IsRUFBdUNNLElBQUksQ0FBQzBCLFNBQUwsQ0FBZSxLQUFLM0IsTUFBcEIsQ0FBdkM7QUFDRDtBQTdKSDtBQUFBO0FBQUEsd0JBNEMwQjtBQUFFLGFBQU8sS0FBS0wsVUFBWjtBQUF5QjtBQTVDckQ7O0FBQUE7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IFByZWYgZnJvbSAnLi9pbnRlcmZhY2VzL1ByZWYnO1xyXG5pbXBvcnQgUHJlZlN0b3JhZ2UgZnJvbSAnLi9pbnRlcmZhY2VzL1ByZWZTdG9yYWdlJztcclxuXHJcbi8qKlxyXG4gKiBNYW5hZ2UgcHJlZmVyZW5jZXMgZm9yIHlvdXIgd2Vic2l0ZSB3aXRoIGFuIGVhc3kgdG8gdXNlIEFQSS5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgUHJlZnMge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBuYW1lc3BhY2UgaXMgdGhlIGtleSB1c2VkIHRvIHN0b3JlIHRoZSBwcmVmZXJlbmNlcyBpbiB0aGUgbG9jYWxTdG9yYWdlIE9iamVjdC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX25hbWVzcGFjZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGlzIG1vZHVsZSdzIHN0b3JhZ2UgT2JqZWN0LlxyXG4gICAqIFxyXG4gICAqIFRoaXMgaXMgZWl0aGVyIGNyZWF0ZWQgYnJhbmQgbmV3IG9yIHBvcHVsYXRlZCBmcm9tIGFuIGV4aXN0aW5nIHNhdmVkIE9iamVjdCBpbiB0aGUgdXNlcidzIGxvY2FsU3RvcmFnZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7UHJlZlN0b3JhZ2V9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcHJlZnM6IFByZWZTdG9yYWdlID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSB3aW5kb3cncyBsb2NhbFN0b3JhZ2UgT2JqZWN0LlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHt3aW5kb3cubG9jYWxTdG9yYWdlfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3N0b3JhZ2U6IFN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gW25hbWVzcGFjZT0ncHJlZnMnXSBUaGUgbmFtZXNwYWNlIG9mIHRoZSBwcmVmZXJlbmNlcyBpbiB0aGUgbG9jYWxTdG9yYWdlLiBcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihuYW1lc3BhY2U6IHN0cmluZyA9ICdwcmVmcycpIHtcclxuICAgIHRoaXMuX25hbWVzcGFjZSA9bmFtZXNwYWNlO1xyXG5cclxuICAgIHRoaXMuX2Jvb3QoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIG5hbWUgb2YgdGhlIG5hbWVzcGFjZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBcclxuICAgKi9cclxuICBnZXQgbmFtZXNwYWNlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9uYW1lc3BhY2U7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgbW9kdWxlIGlzIGluaXRpYWxpemVkLCB3ZSB3YW50IHRvIGdyYWIgdGhlIGxvY2FsU3RvcmFnZSBPYmplY3QgaWYgaXQgZXhpc3RzIGFuZCBzYXZlIGl0IGxvY2FsbHlcclxuICAgKiBzbyB0aGF0IHdlIGFuIG92ZXJyaWRlIGV4aXN0aW5nIHNldHRpbmdzIHdoZW4gbmVlZGVkLlxyXG4gICAqIFxyXG4gICAqIFdlIGFsc28gbmVlZCB0byBzZXQgdXAgYW55IHByZS1leGlzdGluZyBwcmVmZXJlbmNlcy5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZSBcclxuICAgKi9cclxuICBwcml2YXRlIF9ib290KCkge1xyXG4gICAgY29uc3QgcHJlZnM6IChzdHJpbmcgfCBudWxsKSA9IHRoaXMuX3N0b3JhZ2UuZ2V0SXRlbSh0aGlzLl9uYW1lc3BhY2UpO1xyXG5cclxuICAgIGlmICghcHJlZnMpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLl9wcmVmcyA9IEpTT04ucGFyc2UocHJlZnMpO1xyXG5cclxuICAgIGNvbnN0IHByZWZzSlNPTiA9IEpTT04ucGFyc2UocHJlZnMpO1xyXG5cclxuICAgIGZvciAoY29uc3QgcHJlZiBpbiBwcmVmc0pTT04pIHtcclxuICAgICAgY29uc3QgcDogUHJlZiA9IHByZWZzSlNPTltwcmVmXTtcclxuXHJcbiAgICAgIHN3aXRjaCAocC50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAndG9nZ2xlJzpcclxuICAgICAgICAgIGlmIChwLmRhdGEuc3RhdHVzID09PSB0cnVlICYmICFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHAuZGF0YS5lbGVtZW50KS5jbGFzc0xpc3QuY29udGFpbnMocC5kYXRhLmNsYXNzZXNbMF0pKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKHAubmFtZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBhIHByZWZlcmVuY2UgdGhhdCBjYW4gdG9nZ2xlIG9uZSBvciBtb3JlIGNsYXNzZXMgb24gYW4gZWxlbWVudC5cclxuICAgKiBcclxuICAgKiBBZmZlY3RpbmcgbXVsdGlwbGUgZWxlbWVudHMgd2l0aCBhIHRvZ2dsZSBpcyBwb3NzaWJsZSBieSBhc3NpbmdpbmcgdGhlbSBhbGwgdGhlIHNhbWUgbmFtZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBBIHVuaXF1ZSBrZXkgdXNlZCB0byBjYWxsIHRoaXMgcHJlZmVyZW5jZSBhZnRlciBpdCdzIGNyZWF0ZWQuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnQgVGhlICBpZGVudGlmaWVyIHRvIHVzZSB0byBxdWVyeSBmb3IgdGhlIGVsZW1lbnQuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXk8c3RyaW5nPn0gY2xhc3NlcyBPbmUgb3IgbW9yZSBjbGFzc2VzIHRvIHRvZ2dsZSBmb3IgdGhlIGVsZW1lbnQgZGVmaW5lZCBhYm92ZS5cclxuICAgKiBcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFxyXG4gICAqIGNvbnN0IHByZWZzID0gbmV3IFByZWZlcmFibGUoJ215YXBwJyk7XHJcbiAgICogXHJcbiAgICogcHJlZnMuc2V0VG9nZ2xlKCdkYXJrLW1vZGUnLCAnI2JvZHknLCAndGhlbWUtLWRhcmsnKTtcclxuICAgKi9cclxuICBzZXRUb2dnbGUobmFtZTogc3RyaW5nLCBlbGVtZW50OiBzdHJpbmcsIGNsYXNzZXM6IChzdHJpbmcgfCBBcnJheTxzdHJpbmc+KSkge1xyXG4gICAgaWYgKCFuYW1lKSB0aHJvdyBuZXcgRXJyb3IoJ0EgbmFtZSBmb3IgdGhlIHByZWZlcmVuY2UgbXVzdCBiZSBwcm92aWRlZCcpO1xyXG5cclxuICAgIGlmICghQXJyYXkuaXNBcnJheShjbGFzc2VzKSkgY2xhc3NlcyA9IFtjbGFzc2VzXTtcclxuXHJcbiAgICBjb25zdCBwcmVmOiBQcmVmID0ge1xyXG4gICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICB0aW1lc3RhbXA6ICtuZXcgRGF0ZSgpLFxyXG4gICAgICB0eXBlOiAndG9nZ2xlJyxcclxuICAgICAgZGF0YTogeyBlbGVtZW50OiBlbGVtZW50LCBjbGFzc2VzOiBjbGFzc2VzLCBzdGF0dXM6IGZhbHNlIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5fcHJlZnNbcHJlZi5uYW1lXSA9IHByZWY7XHJcblxyXG4gICAgdGhpcy5fc3luYygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBvZmYgYSB0b2dnbGUgcHJlZmVyZW5jZSBieSBuYW1lLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSB0b2dnbGUgcHJlZmVyZW5jZSB0byB0b2dnbGUuXHJcbiAgICogXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBcclxuICAgKiBjb25zdCBwcmVmcyA9IG5ldyBQcmVmZXJhYmxlKCdteWFwcCcpO1xyXG4gICAqIFxyXG4gICAqIHByZWZzLnNldFRvZ2dsZSgnZGFyay1tb2RlJywgJyNib2R5JywgJ3RoZW1lLS1kYXJrJyk7XHJcbiAgICogXHJcbiAgICogcHJlZnMudG9nZ2xlKCdkYXJrLW1vZGUnKTtcclxuICAgKi9cclxuICB0b2dnbGUobmFtZTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIW5hbWUpIHRocm93IG5ldyBFcnJvcignVGhlIG5hbWUgb2YgdGhlIHByZWZlcmVuY2UgdG8gdG9nZ2xlIGlzIHJlcXVpcmVkJyk7XHJcblxyXG4gICAgY29uc3QgcHJlZjogUHJlZiA9IHRoaXMuX3ByZWZzW25hbWVdO1xyXG5cclxuICAgIGlmICghcHJlZikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwcmVmLmRhdGEuZWxlbWVudCk7XHJcbiAgICBcclxuICAgIHByZWYuZGF0YS5jbGFzc2VzLm1hcCgoY2w6IHN0cmluZykgPT4gZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNsKSk7XHJcblxyXG4gICAgcHJlZi5kYXRhLnN0YXR1cyA9ICFwcmVmLmRhdGEuc3RhdHVzO1xyXG5cclxuICAgIHRoaXMuX3N5bmMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFycyBhbGwgb2YgdGhlIHByZWZlcmVuY2VzIGJvdGggbG9jYWxseSBhbm5kIGluIHRoZSBsb2NhbFN0b3JhZ2UuXHJcbiAgICogXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBcclxuICAgKiBwcmVmcy5jbGVhcigpO1xyXG4gICAqL1xyXG4gIGNsZWFyKCkge1xyXG4gICAgdGhpcy5fcHJlZnMgPSB7fTtcclxuXHJcbiAgICB0aGlzLl9zdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5fbmFtZXNwYWNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIGxvY2FsU3RvcmFnZSB3aXRoIHRoZSBsYXRlc3QgcHJlZmVyZW5jZXMgZnJvbSB0aGUgbG9jYWwgcHJlZmVyZW5jZXMgT2JqZWN0LlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfc3luYygpIHtcclxuICAgIHRoaXMuX3N0b3JhZ2Uuc2V0SXRlbSh0aGlzLl9uYW1lc3BhY2UsIEpTT04uc3RyaW5naWZ5KHRoaXMuX3ByZWZzKSk7XHJcbiAgfVxyXG59Il19