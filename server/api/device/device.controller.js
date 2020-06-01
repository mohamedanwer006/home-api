'use strict';

var Device = require('./device.model');
var ObjectID = require('mongodb').ObjectID;
/**
 * Get list of all devices for a user
 */
exports.index = function (req, res) {
    var currentUser = req.user._id;
    // get only devices related to the current user
    Device.find({
        createdBy: currentUser
    }, function (err, devices) {
        if (err) return res.status(500).send(err);
        res.status(200).json(devices);
    });
};

/**
 * Add a new device
 */
exports.create = function (req, res, next) {
    var device = req.body;
    // this device is created by the current user
    device.createdBy = req.user._id;
    Device.create(device, function (err, device) {
        if (err) return res.status(500).send(err);
        res.json(device);
    });
};

/**
 * Get a single device
 */
exports.show = function (req, res, next) {
    var deviceId = req.params.id;
    // the current user should have created this device
    Device.findOne({
        _id: deviceId,
        createdBy: req.user._id
    }, function (err, device) {
        if (err) return res.status(500).send(err);
        if (!device) return res.status(404).end();
        res.json(device);
    });
};

/**
 * Update a device
 */
exports.update = async (req, res, next) => {
    var device = req.body;
    device.createdBy = req.user._id;
    var deviceId = req.params.id;
    Device.findOne({
        _id: deviceId,
        createdBy: req.user._id
    }, function(err, device) {
        if (err) return res.status(500).send(err);
        if (!device) return res.status(404).end();
        if(req.body.macAddress) device.macAddress = req.body.macAddress;
        if(req.body.email) device.email = req.body.email;
        if(req.body.name) device.name = req.body.name;
        if(req.body.picture) device.picture = req.body.picture;  
        if(req.body.tag) device.tag = req.body.tag; 
        if(req.body.version) device.version = req.body.version;
        if(req.body.intensity) device.intensity = req.body.intensity;
        if(req.body.value) device.value = req.body.value;
        device.save(function(err, updatedDevice) {
            if (err) return res.status(500).send(err);
            return res.status(200).json(updatedDevice);
        });
    });
};

/**
 * Delete a device
 */
exports.destroy = function (req, res) {
    Device.findOne({
        _id: req.params.id,
        createdBy: req.user._id
    }, function (err, device) {
        if (err) return res.status(500).send(err);

        device.remove(function (err) {
            if (err) return res.status(500).send(err);
            return res.status(204).end();
        });
    });
};

exports.indexDevices = function (req, res) {
        var ids = req.body.devices;
        Device.find({
            _id: {$in: ids}
        },function (err, devices) {
            if (err) return res.status(500).send(err);
            res.status(200).json(devices);
        });
};