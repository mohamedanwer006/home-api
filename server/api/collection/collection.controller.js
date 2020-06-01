'use strict';

var Collection = require('./collection.model');
/**
 * Get list of all collection for a user
 */
exports.index = function (req, res) {
    var currentUser = req.user._id;
    // get only devices related to the current user
    Collection.find({
        createdBy: currentUser
    }, function (err, collections) {
        if (err) return res.status(500).send(err);
        res.status(200).json(collections);
    });
};

/**
 * Add a new collection
 */
exports.create = function (req, res, next) {
    var collection = req.body;
    // this device is created by the current user
    collection.createdBy = req.user._id;
    Collection.create(collection, function (err, collection) {
        if (err) return res.status(500).send(err);
        res.json(collection);
    });
};

/**
 * Get a single collection
 */
exports.show = function (req, res, next) {
    var collectionId = req.params.id;
    // the current user should have created this device
    Collection.findOne({
        _id: collectionId,
        createdBy: req.user._id
    }, function (err, collection) {
        if (err) return res.status(500).send(err);
        if (!collection) return res.status(404).end();
        res.json(collection);
    });
};

/**
 * Update a collection
 */
exports.update = async (req, res, next) => {
    var collection = req.body;
    collection.createdBy = req.user._id;
    var collectionId = req.params.id;
    Collection.findOne({
        _id: collectionId,
        createdBy: req.user._id
    }, function (err, collection) {
        if (err) return res.status(500).send(err);
        if (!collection) return res.status(404).end();
        if (req.body.name) collection.name = req.body.name;
        if (req.body.picture) collection.picture = req.body.picture;
        collection.save(function (err, updatedCollection) {
            if (err) return res.status(500).send(err);
            return res.status(200).json(updatedCollection);
        });
    });
};


exports.addDevice = async (req, res, next) => {
    var deviceId = req.body._id;
    var collectionId = req.params.id;
    Collection.findOne({
        _id: collectionId,
        createdBy: req.user._id
    }, function (err, collection) {
        if (err) return res.status(500).send(err);
        if (!collection) return res.status(404).end();
        if (req.body._id) {
            collection.update({
                $addToSet: {
                    devices: deviceId,
                }
            }, function (err, updatedCollection) {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                return res.status(200).json(updatedCollection);
            });
        }
    });
};

/**
 * Delete a collection
 */
exports.destroy = function (req, res) {
    Collection.findOne({
        _id: req.params.id,
        createdBy: req.user._id
    }, function (err, collection) {
        if (err) return res.status(500).send(err);
        collection.remove(function (err) {
            if (err) return res.status(500).send(err);
            return res.status(204).end();
        });
    });
};

/**
 * Delete a  device from collection
 */
exports.removeDevice = function (req, res) {
    Collection.update(
        { _id: req.params.id, createdBy: req.user._id },
        { $pull: { devices: req.params.deviceId } },
        function (err) {
            if (err) return res.status(500).send(err);
            return res.status(204).end();
        });
};


