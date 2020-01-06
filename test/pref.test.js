'use strict'

import test from 'ava';
import Prefs from '../preferable.js';

const prefs = new Prefs('test');

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