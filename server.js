'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
const BFX = require('bitfinex-api-node');

const bfx = new BFX({ 
    apiKey: '1234',
    apiSecret: '4321',
})

const bfxRest = bfx.rest(2);

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

var Crypto = 'wait....';
var err = 'something wrong!';
var opts = {timeframe:"1m", symbol:"tIOTUSD", section:"last"};

setInterval(() => {
    wss.clients.forEach((client) => {
        bfxRest.candles(opts, (err, res) => {
	    if (err) console.log(err)
		  res.forEach((candlesz) => {
			Crypto = candlesz.mts;
  	    })
    	})
      client.send(JSON.stringify(Crypto));
    });
}, 5000);
