'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
const cryptoSocket = require("crypto-socket")


const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  cryptoSocket.start();
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    var Data =  cryptoSocket.Exchanges['bitfinex'];
    client.send(Data);
  });
}, 1000);
