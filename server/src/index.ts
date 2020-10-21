#!/usr/bin/env node

var http = require('http'),
    faye = require('faye');

var server = http.createServer(),
    bayeux = new faye.NodeAdapter({ mount: '/' });

bayeux.attach(server);
server.listen(8001, '0.0.0.0');

bayeux.on('handshake', function(clientId) {
    console.log(`Handshaking with ${clientId}.`);
});

bayeux.on('subscribe', function(clientId, channel) {
    console.log(`${clientId} subscribed to "${channel}".`);
});

bayeux.on('publish', function(clientId, channel, data) {
    console.log(`${clientId} published to "${channel}: ${data}"`);
});

