'use strict';

var Mode = require('./mode.model');
/**
 * Get modes 
 */
exports.index = function (req, res) {
    var currentUser = req.user._id;
    // get only devices related to the current user
    Mode.find({
        createdBy: currentUser
    }, function (err, modes) {
        if (err) return res.status(500).send(err);
        res.status(200).json(modes);
    });
};

/**
 * Add new mode
 */
exports.create = function (req, res, next) {
    var mode = req.body;
    // this device is created by the current user
    mode.createdBy = req.user._id;
    Mode.create(mode, function (err, mode) {
        if (err) return res.status(500).send(err);
        res.json(mode);
    });
};

/**
 * Get single mode
 */
exports.show = function (req, res, next) {
    var modeId = req.params.id;
    // the current user should have created this device
    Mode.findOne({
        _id: modeId,
        createdBy: req.user._id
    }, function (err, mode) {
        if (err) return res.status(500).send(err);
        if (!mode) return res.status(404).end();
        res.json(mode);
    });
};

/**
 * Update  mode
 */
exports.update = async (req, res, next) => {
    var mode = req.body;
    mode.createdBy = req.user._id;
    var modeId = req.params.id;
    Mode.findOne({
        _id: modeId,
        createdBy: req.user._id
    }, function (err, mode) {
        if (err) return res.status(500).send(err);
        if (!mode) return res.status(404).end();
        if (req.body.name) mode.name = req.body.name;
        if (req.body.picture) mode.picture = req.body.picture;
        mode.save(function (err, updatedmode) {
            if (err) return res.status(500).send(err);
            return res.status(200).json(updatedmode);
        });
    });
};
/**
 * Add device to mode
 */

exports.addDevice = async (req, res, next) => {
    var deviceId = req.body._id;
    var modeId = req.params.id;
    mode.findOne({
        _id: modeId,
        createdBy: req.user._id
    }, function (err, mode) {
        if (err) return res.status(500).send(err);
        if (!mode) return res.status(404).end();
        if (req.body._id) {
            mode.update({
                $addToSet: {
                    devices: deviceId,
                }
            }, function (err, updatedmode) {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                return res.status(200).json(updatedmode);
            });
        }
    });
};

/**
 * Delete mode
 */
exports.destroy = function (req, res) {
    Mpde.findOne({
        _id: req.params.id,
        createdBy: req.user._id
    }, function (err, mode) {
        if (err) return res.status(500).send(err);
        mode.remove(function (err) {
            if (err) return res.status(500).send(err);
            return res.status(204).end();
        });
    });
};

/**
 * Delete device from mode
 */
exports.removeDevice = function (req, res) {
    Mode.update(
        { _id: req.params.id, createdBy: req.user._id },
        { $pull: { devices: req.params.deviceId } },
        function (err) {
            if (err) return res.status(500).send(err);
            return res.status(204).end();
        });
};


