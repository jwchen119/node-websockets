'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
//const coinTicker = require('coin-ticker');
const BFX = require('bitfinex-api-node')
const bfxRest = new BFX(apiKey, apiSecretKey, {version: 1}).rest


const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

var Crypto = "請稍後...";

//setInterval(() => {
//wss.clients.forEach((client) => {
//  coinTicker('bitfinex', 'ETH_USD')
//   .then((pairs) => {
//    console.log(pairs);
//  })
//      client.send(JSON.stringify(Crypto));
//  });
//}, 1000);


//  coinTicker('binance', ['eth_btc'])
//   .then((pairs) => {
//    console.log(pairs);
//    Crypto = pairs
//  })


bfxRest.ticker('ETHUSD', (err, res) => {
	if (err) console.log(err)
	console.log(result)
})

setInterval(() => {
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(Crypto));
    });
}, 1000);


