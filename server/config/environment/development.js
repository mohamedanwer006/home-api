'use strict';

// Development specific configuration
// ==================================

// mongodb://mohamed006:mohamed006@cluster0-shard-00-00-aftcr.mongodb.net:27017,cluster0-shard-00-01-aftcr.mongodb.net:27017,cluster0-shard-00-02-aftcr.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
//mongodb+srv://mohamed006:mohamed006@iot-alyx4.mongodb.net/test?retryWrites=true&w=majority
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://mohamed006:mohamed006@cluster0-shard-00-00-aftcr.mongodb.net:27017,cluster0-shard-00-01-aftcr.mongodb.net:27017,cluster0-shard-00-02-aftcr.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
    },
// mqtt://localhost:1883
//m16.cloudmqtt.com 11638
    mqtt: {
        host: process.env.EMQTT_HOST || 'm16.cloudmqtt.com',
        clientId: 'API_Engin_Dev',
        port: 11638
    }
};
