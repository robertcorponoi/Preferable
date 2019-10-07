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
     * @param {string} name Used to call this toggle after it's created.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwibmFtZXNwYWNlIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiX25hbWVzcGFjZSIsIl9ib290IiwicHJlZnMiLCJfc3RvcmFnZSIsImdldEl0ZW0iLCJfcHJlZnMiLCJKU09OIiwicGFyc2UiLCJwcmVmc0pTT04iLCJwcmVmIiwicCIsInR5cGUiLCJkYXRhIiwic3RhdHVzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZWxlbWVudCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiY2xhc3NlcyIsInRvZ2dsZSIsIm5hbWUiLCJFcnJvciIsIkFycmF5IiwiaXNBcnJheSIsInRpbWVzdGFtcCIsIkRhdGUiLCJfc3luYyIsIm1hcCIsImNsIiwicmVtb3ZlSXRlbSIsInNldEl0ZW0iLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFLQTs7O0FBR0FBLE1BQU0sQ0FBQ0MsT0FBUDtBQUFBO0FBQUE7QUFFRTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7OztBQVdBOzs7Ozs7OztBQVNBOzs7QUFHQSxtQkFBeUM7QUFBQSxRQUE3QkMsU0FBNkIsdUVBQVQsT0FBUzs7QUFBQTs7QUFBQTs7QUFBQSxvQ0FkWCxFQWNXOztBQUFBLHNDQUxiQyxNQUFNLENBQUNDLFlBS007O0FBRXZDLFNBQUtDLFVBQUwsR0FBaUJILFNBQWpCOztBQUVBLFNBQUtJLEtBQUw7QUFFRDtBQUVEOzs7Ozs7O0FBMUNGO0FBQUE7O0FBcURFOzs7Ozs7OztBQXJERiw0QkE2RGtCO0FBRWQsVUFBTUMsS0FBc0IsR0FBRyxLQUFLQyxRQUFMLENBQWNDLE9BQWQsQ0FBc0IsS0FBS0osVUFBM0IsQ0FBL0I7O0FBRUEsVUFBSSxDQUFDRSxLQUFMLEVBQVk7QUFFWixXQUFLRyxNQUFMLEdBQWNDLElBQUksQ0FBQ0MsS0FBTCxDQUFXTCxLQUFYLENBQWQ7QUFFQSxVQUFNTSxTQUFTLEdBQUdGLElB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QUFBIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgUHJlZiBmcm9tICcuL2ludGVyZmFjZXMvUHJlZic7XHJcbmltcG9ydCBQcmVmU3RvcmFnZSBmcm9tICcuL2ludGVyZmFjZXMvUHJlZlN0b3JhZ2UnO1xyXG5cclxuLyoqXHJcbiAqIE1hbmFnZSBwcmVmZXJlbmNlcyBmb3IgeW91ciB3ZWJzaXRlIHdpdGggYW4gZWFzeSB0byB1c2UgQVBJLlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBQcmVmcyB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBuYW1lc3BhY2UgaXMgdGhlIGtleSB1c2VkIHRvIHN0b3JlIHRoZSBwcmVmZXJlbmNlcyBpbiB0aGUgbG9jYWxTdG9yYWdlIE9iamVjdC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX25hbWVzcGFjZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGlzIG1vZHVsZSdzIHN0b3JhZ2UgT2JqZWN0LlxyXG4gICAqIFxyXG4gICAqIFRoaXMgaXMgZWl0aGVyIGNyZWF0ZWQgYnJhbmQgbmV3IG9yIHBvcHVsYXRlZCBmcm9tIGFuIGV4aXN0aW5nIHNhdmVkIE9iamVjdCBpbiB0aGUgdXNlcidzIGxvY2FsU3RvcmFnZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7UHJlZlN0b3JhZ2V9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcHJlZnM6IFByZWZTdG9yYWdlID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSB3aW5kb3cncyBsb2NhbFN0b3JhZ2UgT2JqZWN0LlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHt3aW5kb3cubG9jYWxTdG9yYWdlfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3N0b3JhZ2U6IFN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gW25hbWVzcGFjZT0ncHJlZnMnXSBUaGUgbmFtZXNwYWNlIG9mIHRoZSBwcmVmZXJlbmNlcyBpbiB0aGUgbG9jYWxTdG9yYWdlLiBcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihuYW1lc3BhY2U6IHN0cmluZyA9ICdwcmVmcycpIHtcclxuXHJcbiAgICB0aGlzLl9uYW1lc3BhY2UgPW5hbWVzcGFjZTtcclxuXHJcbiAgICB0aGlzLl9ib290KCk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgbmFtZSBvZiB0aGUgbmFtZXNwYWNlLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFxyXG4gICAqL1xyXG4gIGdldCBuYW1lc3BhY2UoKTogc3RyaW5nIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fbmFtZXNwYWNlO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIG1vZHVsZSBpcyBpbml0aWFsaXplZCwgd2Ugd2FudCB0byBncmFiIHRoZSBsb2NhbFN0b3JhZ2UgT2JqZWN0IGlmIGl0IGV4aXN0cyBhbmQgc2F2ZSBpdCBsb2NhbGx5XHJcbiAgICogc28gdGhhdCB3ZSBhbiBvdmVycmlkZSBleGlzdGluZyBzZXR0aW5ncyB3aGVuIG5lZWRlZC5cclxuICAgKiBcclxuICAgKiBXZSBhbHNvIG5lZWQgdG8gc2V0IHVwIGFueSBwcmUtZXhpc3RpbmcgcHJlZmVyZW5jZXMuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGUgXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYm9vdCgpIHtcclxuXHJcbiAgICBjb25zdCBwcmVmczogKHN0cmluZyB8IG51bGwpID0gdGhpcy5fc3RvcmFnZS5nZXRJdGVtKHRoaXMuX25hbWVzcGFjZSk7XHJcblxyXG4gICAgaWYgKCFwcmVmcykgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMuX3ByZWZzID0gSlNPTi5wYXJzZShwcmVmcyk7XHJcblxyXG4gICAgY29uc3QgcHJlZnNKU09OID0gSlNPTi5wYXJzZShwcmVmcyk7XHJcblxyXG4gICAgZm9yIChjb25zdCBwcmVmIGluIHByZWZzSlNPTikge1xyXG5cclxuICAgICAgY29uc3QgcDogUHJlZiA9IHByZWZzSlNPTltwcmVmXTtcclxuXHJcbiAgICAgIHN3aXRjaCAocC50eXBlKSB7XHJcblxyXG4gICAgICAgIGNhc2UgJ3RvZ2dsZSc6XHJcbiAgICAgICAgICBpZiAocC5kYXRhLnN0YXR1cyA9PT0gdHJ1ZSAmJiAhZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwLmRhdGEuZWxlbWVudCkuY2xhc3NMaXN0LmNvbnRhaW5zKHAuZGF0YS5jbGFzc2VzWzBdKSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZShwLm5hbWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgYSBwcmVmZXJlbmNlIHRoYXQgY2FuIHRvZ2dsZSBvbmUgb3IgbW9yZSBjbGFzc2VzIG9uIGFuIGVsZW1lbnQuXHJcbiAgICogXHJcbiAgICogQWZmZWN0aW5nIG11bHRpcGxlIGVsZW1lbnRzIHdpdGggYSB0b2dnbGUgaXMgcG9zc2libGUgYnkgYXNzaW5naW5nIHRoZW0gYWxsIHRoZSBzYW1lIG5hbWUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVXNlZCB0byBjYWxsIHRoaXMgdG9nZ2xlIGFmdGVyIGl0J3MgY3JlYXRlZC5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudCBUaGUgIGlkZW50aWZpZXIgdG8gdXNlIHRvIHF1ZXJ5IGZvciB0aGUgZWxlbWVudC5cclxuICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheTxzdHJpbmc+fSBjbGFzc2VzIE9uZSBvciBtb3JlIGNsYXNzZXMgdG8gdG9nZ2xlIGZvciB0aGUgZWxlbWVudCBkZWZpbmVkIGFib3ZlLlxyXG4gICAqIFxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogXHJcbiAgICogY29uc3QgcHJlZnMgPSBuZXcgUHJlZmVyYWJsZSgnbXlhcHAnKTtcclxuICAgKiBcclxuICAgKiBwcmVmcy5zZXRUb2dnbGUoJ2RhcmstbW9kZScsICcjYm9keScsICd0aGVtZS0tZGFyaycpO1xyXG4gICAqL1xyXG4gIHNldFRvZ2dsZShuYW1lOiBzdHJpbmcsIGVsZW1lbnQ6IHN0cmluZywgY2xhc3NlczogKHN0cmluZyB8IEFycmF5PHN0cmluZz4pKSB7XHJcblxyXG4gICAgaWYgKCFuYW1lKSB0aHJvdyBuZXcgRXJyb3IoJ0EgbmFtZSBmb3IgdGhlIHByZWZlcmVuY2UgbXVzdCBiZSBwcm92aWRlZCcpO1xyXG5cclxuICAgIGlmICghQXJyYXkuaXNBcnJheShjbGFzc2VzKSkgY2xhc3NlcyA9IFtjbGFzc2VzXTtcclxuXHJcbiAgICBjb25zdCBwcmVmOiBQcmVmID0ge1xyXG4gICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICB0aW1lc3RhbXA6ICtuZXcgRGF0ZSgpLFxyXG4gICAgICB0eXBlOiAndG9nZ2xlJyxcclxuICAgICAgZGF0YTogeyBlbGVtZW50OiBlbGVtZW50LCBjbGFzc2VzOiBjbGFzc2VzLCBzdGF0dXM6IGZhbHNlIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5fcHJlZnNbcHJlZi5uYW1lXSA9IHByZWY7XHJcblxyXG4gICAgdGhpcy5fc3luYygpO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgb2ZmIGEgdG9nZ2xlIHByZWZlcmVuY2UgYnkgbmFtZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgdG9nZ2xlIHByZWZlcmVuY2UgdG8gdG9nZ2xlLlxyXG4gICAqIFxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogXHJcbiAgICogY29uc3QgcHJlZnMgPSBuZXcgUHJlZmVyYWJsZSgnbXlhcHAnKTtcclxuICAgKiBcclxuICAgKiBwcmVmcy5zZXRUb2dnbGUoJ2RhcmstbW9kZScsICcjYm9keScsICd0aGVtZS0tZGFyaycpO1xyXG4gICAqIFxyXG4gICAqIHByZWZzLnRvZ2dsZSgnZGFyay1tb2RlJyk7XHJcbiAgICovXHJcbiAgdG9nZ2xlKG5hbWU6IHN0cmluZykge1xyXG5cclxuICAgIGlmICghbmFtZSkgdGhyb3cgbmV3IEVycm9yKCdUaGUgbmFtZSBvZiB0aGUgcHJlZmVyZW5jZSB0byB0b2dnbGUgaXMgcmVxdWlyZWQnKTtcclxuXHJcbiAgICBjb25zdCBwcmVmOiBQcmVmID0gdGhpcy5fcHJlZnNbbmFtZV07XHJcblxyXG4gICAgaWYgKCFwcmVmKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgZWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHByZWYuZGF0YS5lbGVtZW50KTtcclxuICAgIFxyXG4gICAgcHJlZi5kYXRhLmNsYXNzZXMubWFwKChjbDogc3RyaW5nKSA9PiBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY2wpKTtcclxuXHJcbiAgICBwcmVmLmRhdGEuc3RhdHVzID0gIXByZWYuZGF0YS5zdGF0dXM7XHJcblxyXG4gICAgdGhpcy5fc3luYygpO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFycyBhbGwgb2YgdGhlIHByZWZlcmVuY2VzIGJvdGggbG9jYWxseSBhbm5kIGluIHRoZSBsb2NhbFN0b3JhZ2UuXHJcbiAgICogXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBcclxuICAgKiBwcmVmcy5jbGVhcigpO1xyXG4gICAqL1xyXG4gIGNsZWFyKCkge1xyXG5cclxuICAgIHRoaXMuX3ByZWZzID0ge307XHJcblxyXG4gICAgdGhpcy5fc3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuX25hbWVzcGFjZSk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyB0aGUgbG9jYWxTdG9yYWdlIHdpdGggdGhlIGxhdGVzdCBwcmVmZXJlbmNlcyBmcm9tIHRoZSBsb2NhbCBwcmVmZXJlbmNlcyBPYmplY3QuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9zeW5jKCkge1xyXG5cclxuICAgIHRoaXMuX3N0b3JhZ2Uuc2V0SXRlbSh0aGlzLl9uYW1lc3BhY2UsIEpTT04uc3RyaW5naWZ5KHRoaXMuX3ByZWZzKSk7XHJcblxyXG4gIH1cclxuXHJcbn0iXX0=