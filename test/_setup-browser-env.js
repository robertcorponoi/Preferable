'use strict'

import browserEnv from 'browser-env';

browserEnv(['window', 'document'], { url: 'http://localhost:8080' });