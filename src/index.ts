'use strict'

import Pref from './interfaces/Pref';
import PrefStorage from './interfaces/PrefStorage';

/**
 * Manage preferences for your website with an easy to use API.
 */
module.exports = class Prefs {

  /**
   * The namespace is the key used to store the preferences in the localStorage Object.
   * 
   * @private
   * 
   * @property {string}
   */
  private _namespace: string;

  /**
   * A reference to this module's storage Object.
   * 
   * This is either created brand new or populated from an existing saved Object in the user's localStorage.
   * 
   * @private
   * 
   * @property {PrefStorage}
   */
  private _prefs: PrefStorage = {};

  /**
   * A reference to the window's localStorage Object.
   * 
   * @private
   * 
   * @property {window.localStorage}
   */
  private _storage: Storage = window.localStorage;

  /**
   * @param {string} [namespace='prefs'] The namespace of the preferences in the localStorage. 
   */
  constructor(namespace: string = 'prefs') {

    this._namespace =namespace;

    this._boot();

  }

  /**
   * Gets the name of the namespace.
   * 
   * @returns {string} 
   */
  get namespace(): string {

    return this._namespace;

  }

  /**
   * When the module is initialized, we want to grab the localStorage Object if it exists and save it locally
   * so that we an override existing settings when needed.
   * 
   * We also need to set up any pre-existing preferences.
   * 
   * @private 
   */
  private _boot() {

    const prefs: (string | null) = this._storage.getItem(this._namespace);

    if (!prefs) return;

    this._prefs = JSON.parse(prefs);

    const prefsJSON = JSON.parse(prefs);

    for (const pref in prefsJSON) {

      const p: Pref = prefsJSON[pref];

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
  setToggle(name: string, element: string, classes: (string | Array<string>)) {

    if (!name) throw new Error('A name for the preference must be provided');

    if (!Array.isArray(classes)) classes = [classes];

    const pref: Pref = {
      name: name,
      timestamp: +new Date(),
      type: 'toggle',
      data: { element: element, classes: classes, status: false }
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
  toggle(name: string) {

    if (!name) throw new Error('The name of the preference to toggle is required');

    const pref: Pref = this._prefs[name];

    if (!pref) return;

    const element: HTMLElement = document.querySelector(pref.data.element);
    
    pref.data.classes.map((cl: string) => element.classList.toggle(cl));

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
  clear() {

    this._prefs = {};

    this._storage.removeItem(this._namespace);

  }

  /**
   * Updates the localStorage with the latest preferences from the local preferences Object.
   * 
   * @private
   */
  private _sync() {

    this._storage.setItem(this._namespace, JSON.stringify(this._prefs));

  }

}