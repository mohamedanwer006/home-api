'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// const PinSchema = mongoose.Schema(
//     {
//         tag: {
//             type: String
//         },
//         value: {
//             type: String
//         },
//         name: {
//             type: String
//         },
//         is_pwm: {
//             type: Boolean
//         },
//         intensity: {
//             type: Number
//         },
//         picture: {
//             type: String
//         }

//     }
// );
// const DeviceSchema = mongoose.Schema(
//     {
//         owner_id: {
//             type: mongoose.Types.ObjectId,
//             require:true,
//         },
//         index: {
//             type: Number
//         },
//         name: {
//             type: String
//         },
//         email: {
//             type: String,
//             require:true,
//         },
//         version: {
//             type: Number
//         },
//         tag: {
//             type: String
//         },
//         is_sensor: {
//             type: Boolean
//         },
//         is_rgp: {
//             type: Boolean
//         },
//         picture: {
//             type: String
//         },
//         temp_sensor: {
//             type: Number
//         },
//         isActive: {
//             type: Boolean
//         },
//         registered: {
//             type: String
//         },
//         latitude: {
//             type: Number
//         },
//         longitude: {
//             type: Number
//         },
//         rgp_value: {
//             type: Number
//         },
//         rgp_name: {
//             type: String
//         },
//         rgp_intensity: {
//             type: Number
//         },
//         number_of_pins: {
//             type:Number
//         },

//         pins:[PinSchema]
//     }
// );


var DeviceSchema = new Schema({
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
    intensity: {
        type: Number
    },
    value: {
        type: String
    },
});

DeviceSchema.pre('save', function (next) {
    var now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model('Device', DeviceSchema);
