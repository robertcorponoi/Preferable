'use strict'

import test from 'ava';
import Prefs from '../Preferable.js';

const prefs = new Prefs('test');

/**
 * After each test, we want to clear all of the values set by the test and set the Prefs Object to null to ensure
 * that no values are used in the next tests.
 */
test.beforeEach(() => {

  prefs.clear();

  window.localStorage.clear();

});

test('adding a toggle preference for a dark mode class on the body tag', t => {

  prefs.setToggle('dark-mode', 'document.body', 'theme--dark');

  const storedPref = JSON.parse(window.localStorage.getItem('test'));

  t.deepEqual(prefs._prefs['dark-mode'], storedPref['dark-mode']);

});

test('toggling a toggle preference', t => {

  prefs.setToggle('dark-mode', 'body', 'theme--dark');

  prefs.toggle('dark-mode');

  t.is(document.body.classList.contains('theme--dark'), true);

});

test('toggling a toggle preference twice', t => {

  document.body.classList.remove('theme--dark');

  prefs.setToggle('dark-mode', 'body', 'theme--dark');

  prefs.toggle('dark-mode');
  prefs.toggle('dark-mode');

  t.is(document.body.classList.contains('theme--dark'), false);

});

// test('making sure that the prefs instance creates a local object', t => {

//   t.deepEqual(prefs._prefs, {});

// });

// test('adding a preference should add it to the _prefs property', t => {

//   prefs.set('dark-theme', prefs.TYPES.BOOL, 'false', helloworld);

//   t.deepEqual(prefs._prefs['dark-theme'].value, 'false');

// });

// test('adding a preference should add it to the localStorage', t => {

//   prefs.set('dark-theme', prefs.TYPES.BOOL, 'false', helloworld);

//   t.is(typeof window.localStorage.getItem('prefs'), 'string');

// });

// test('adding a boolean preference', t => {

//   prefs.set('dark-theme', prefs.TYPES.BOOL, 'false', helloworld);

//   t.is(prefs._prefs['dark-theme'].type, 'boolean');

// });

// /**
//  * A test function to add as a callback to preferences set.
//  */
// function helloworld() {

//   return 'Hello World!';

// }