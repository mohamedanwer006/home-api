
var Device = require('../api/device/device.model');
var mqtt = require('mqtt');
// var config = require('../config/environment');


const deviceTopic='devices/';

var client = mqtt.connect({
    port: 11638,
    protocol: 'mqtt',
    host: "m16.cloudmqtt.com",
    // clientId: "api-engin",
    reconnectPeriod: 1000,
    username: 'zwccckwo',
    password: 'lm8yAHH_5KWj',
    keepalive: 300,
    rejectUnauthorized: false
});

client.on('connect', function () {
    console.log('Connected to broker at ' + 'm16.cloudmqtt.com' + ' on port ' + "11638");
    client.subscribe('api-engine');
    client.subscribe(deviceTopic+'#'); //sub to all subTopic under device
});

client.on('message', function(topic, message)  {
    //extract device id from topic update it in db
    if(topic.startsWith(deviceTopic)){
        var deviceId = topic.slice(deviceTopic.length);
        console.log('deviceId >> ',deviceId);
       var data = JSON.parse(message.toString())
        console.log('Message >> ' ,data);
        Device.findOne({
            _id: deviceId,
        }, function(err, device) {
            try{
            if (err) return console.log(err);
            if (!device) return console.log(err);
            if(data.macAddress) device.macAddress = data.macAddress;
            if(data.email) device.email = data.email;
            if(data.name) device.name =data.name;
            if(data.picture) device.picture =data.picture; 
            if(data.tag) device.tag = data.tag; 
            if(data.version) device.version = data.version;
            if(data.intensity) device.intensity = data.intensity;
            if(data.value) device.value = data.value;
            }catch(err){
                console.log(err);
            }
            device.save(function(err, updatedDevice) {
                if (err) return console.log(err);
                return console.log("device uodated" , updatedDevice );
            });
        });
    }else{
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

exports.sendLEDData = function(data) {
    console.log('Sending Data', data); 
    client.publish('led', data); }
