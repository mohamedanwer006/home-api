
var Device = require('../api/device/device.model');
var Sensor = require('../api/sensor/sensor.model');
var mqtt = require('mqtt');
// var config = require('../config/environment');


const deviceTopic = 'devices/';
const sensorTopic = 'sensors/';
//broker on cloudmqtt
var client = mqtt.connect({
    port: 11638,
    protocol: 'mqtt',
    host: "m16.cloudmqtt.com",
    // clientId: "api-engin",
    reconnectPeriod: 1000,
    username: 'zwccckwo',//write your username
    password: 'lm8yAHH_5KWj',//write your password
    keepalive: 300,
    rejectUnauthorized: false
});

client.on('connect', function () {
    console.log('Connected to broker at ' + 'm16.cloudmqtt.com' + ' on port ' + "11638");
    client.subscribe('api-engine');
    client.subscribe(deviceTopic + '#'); //sub to all subTopic under devices
    client.subscribe(sensorTopic + '#'); //sub to all subTopic under sensors
});

client.on('message', function (topic, message) {
    //extract device id from topic and update it in db
    if (topic.startsWith(deviceTopic)) {
        var deviceId = topic.slice(deviceTopic.length);
        console.log('deviceId >> ', deviceId);
        var data = JSON.parse(message.toString())
        console.log('Message >> ', data);
        Device.findOne({
            _id: deviceId,
        }, function (err, device) {
            try {
                if (err) return console.log(err);
                if (!device) return console.log(err);
                if (data.macAddress) device.macAddress = data.macAddress;
                if (data.email) device.email = data.email;
                if (data.name) device.name = data.name;
                if (data.picture) device.picture = data.picture;
                if (data.tag) device.tag = data.tag;
                if (data.version) device.version = data.version;
                if (data.intensity) device.intensity = data.intensity;
                if (data.value) device.value = data.value;
            } catch (err) {
                console.log(err);
            }
            device.save(function (err, updatedDevice) {
                if (err) return console.log(err);
                return console.log("device updated", updatedDevice);
            });
        });
    } else if (topic.startsWith(sensorTopic)) {
        var sensorId = topic.slice(sensorTopic.length);
        console.log('sensorId >> ', sensorId);
        var data = JSON.parse(message.toString())
        console.log('Message >> ', data);
        Sensor.findOne({
            _id: sensorId,
        }, function (err, sensor) {
            try {
                if (err) return console.log(err);
                if (!sensor) return console.log(err);
                if (data.macAddress) sensor.macAddress = data.macAddress;
                if (data.email) sensor.email = data.email;
                if (data.name) sensor.name = data.name;
                if (data.picture) sensor.picture = data.picture;
                if (data.tag) sensor.tag = data.tag;
                if (data.version) sensor.version = data.version;
                if (data.temp_value) sensor.temp_value = data.temp_value;
                if (data.humidity_value) sensor.humidity_value = data.humidity_value;
            } catch (err) {
                console.log(err);
            }
            sensor.save(function (err, updatedSensor) {
                if (err) return console.log(err);
                return console.log("sensor updated", updatedSensor);
            });
        });
    }
    else {
        console.log('Unknown topic', topic);
    }



    // message is Buffer
    // console.log('Topic >> ', topic);
    // console.log('Message >> ', message.toString());
    // {"data":{"t":26,"h":36,"l":0},"macAddress":"22:22:22:22"}
    // if (topic === 'api-engine') {
    //     var macAddress = message.toString();
    //     console.log('Mac Address >> ', macAddress);
    //     client.publish('rpi', 'Got Mac Address: ' + macAddress);
    // }else if (topic === 'dht11') {
    //     var data = JSON.parse(message.toString()); // create a new data recordfor the device 
    //     Data.create(data, function(err, data) {
    //     if (err) return console.error(err); // if the record has been saved successfully,
    //      // websockets will trigger a message to the web-app
    //     console.log('Data Saved :', data.data); });
    //     } else if (topic === 'dht11') {
    //     var data = JSON.parse(message.toString()); // create a new data recordfor the device 
    //     Data.create(data, function(err, data) {
    //     if (err) return console.error(err); // if the record has been saved successfully,
    //      // websockets will trigger a message to the web-app
    //     console.log('Data Saved :', data.data); });
    //     } 
    // else {
    //     console.log('Unknown topic', topic);
    // }
});

exports.sendLEDData = function (data) {
    console.log('Sending Data', data);
    client.publish('led', data);
}
