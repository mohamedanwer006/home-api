'use strict';

var express = require('express');
var controller = require('./collection.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/add_device/:id', auth.isAuthenticated(), controller.addDevice);
router.delete('/:id/:deviceId', auth.isAuthenticated(), controller.removeDevice);
module.exports = router;
