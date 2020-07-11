'use strict';

var Sensor = require('./sensor.model');
var ObjectID = require('mongodb').ObjectID;
/**
 * Get list of all sensors for a user
 */
exports.index = function (req, res) {
    var currentUser = req.user._id;
    // get only sensors related to the current user
    Sensor.find({
        createdBy: currentUser
    }, function (err, sensors) {
        if (err) return res.status(500).send(err);
        res.status(200).json(sensors);
    });
};

/**
 * Add a new sensor
 */
exports.create = function (req, res, next) {
    var sensor = req.body;
    // this sensor is created by the current user
    sensor.createdBy = req.user._id;
    Sensor.create(sensor, function (err, sensor) {
        if (err) return res.status(500).send(err);
        res.json(sensor);
    });
};

/**
 * Get a single sensor
 */
exports.show = function (req, res, next) {
    var sensorId = req.params.id;
    // the current user should have created this sensor
    Sensor.findOne({
        _id: sensorId,
        createdBy: req.user._id
    }, function (err, sensor) {
        if (err) return res.status(500).send(err);
        if (!sensor) return res.status(404).end();
        res.json(sensor);
    });
};

/**
 * Update a sensor
 */
exports.update = async (req, res, next) => {
    var sensor = req.body;
    sensor.createdBy = req.user._id;
    var sensorId = req.params.id;
    Sensor.findOne({
        _id: sensorId,
        createdBy: req.user._id
    }, function(err, sensor) {
        if (err) return res.status(500).send(err);
        if (!sensor) return res.status(404).end();
        if(req.body.macAddress) sensor.macAddress = req.body.macAddress;
        if(req.body.email) sensor.email = req.body.email;
        if(req.body.name) sensor.name = req.body.name;
        if(req.body.picture) sensor.picture = req.body.picture;  
        if(req.body.tag) sensor.tag = req.body.tag; 
        if(req.body.version) sensor.version = req.body.version;
        if(req.body.temp_value) sensor.temp_value = req.body.temp_value;
        if(req.body.humidity_value) sensor.humidity_value = req.body.humidity_value;
        sensor.save(function(err, updatedsensor) {
            if (err) return res.status(500).send(err);
            return res.status(200).json(updatedsensor);
        });
    });
};

/**
 * Delete a sensor
 */
exports.destroy = function (req, res) {
    Sensor.findOne({
        _id: req.params.id,
        createdBy: req.user._id
    }, function (err, sensor) {
        if (err) return res.status(500).send(err);
        sensor.remove(function (err) {
            if (err) return res.status(500).send(err);
            return res.status(204).end();
        });
    });
};

