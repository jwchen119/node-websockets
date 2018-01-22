'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
const cryptoSocket = require("crypto-socket");


const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', function connection(ws, req) {
  const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

//wss.on('connection', (ws) => {
//  console.log('Client connected');
//  ws.on('close', () => console.log('Client disconnected'));
//});

//setInterval(() => {
 // wss.clients.forEach((client) => {
   //   client.send(cryptoSocket.start("cex","ETHBTC"));
  //});
//}, 1000);
