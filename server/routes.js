/**
 * Main application routes
 */

'use strict';

var path = require('path');
var fs = require('fs');

module.exports = function(app) {
    // Insert routes below
    app.use('/api/v1/users', require('./api/user'));
    app.use('/api/v1/devices', require('./api/device'));
    app.use('/api/v1/collections', require('./api/collection'));
    app.use('/auth', require('./auth'));
};