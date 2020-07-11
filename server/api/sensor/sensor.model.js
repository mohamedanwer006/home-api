'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SensorSchema = new Schema({
    macAddress: String,
    name: {
        type: String
    },
    picture: {
        type: String
    },
    email: {
        type: String,
    },
    tag: {
        type: String
    },
    version: {
        type: Number
    },
    createdBy: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    temp_value: {
        type: Number
    },
    humidity_value: {
        type: Number
    },
});

SensorSchema.pre('save', function (next) {
    var now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model('Sensor', SensorSchema);
