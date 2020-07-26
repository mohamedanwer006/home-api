'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Mode = new Schema({
    name: {
        type: String
    },
    picture: {
        type: String
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
    devices: [
        { type: mongoose.Schema.Types.ObjectId}
      ]
});

Mode.pre('save', function (next) {
    var now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model('Mode', Mode);
