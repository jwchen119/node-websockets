'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
const BFX = require('bitfinex-api-node');
const bfx = new BFX();
const bfxRest = new BFX('1234', '4321', {version: 2}).rest(2)

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


var Crypto = "請稍後....";

var opts = {timeframe:"30m", symbol:"ttIOTUSD", section:"hist"};

bfxRest.candles(opts, (err, res) => {
	if (err) console.log(err)
	console.log(JSON.stringify(res))
})

setInterval(() => {
    wss.clients.forEach((client) => {
	bfxRest.ticker('tIOTUSD', (err, res) => {
	    if (err) console.log(err)
	    console.log(res)
	    Crypto = res
	})
      client.send(JSON.stringify(Crypto));
    });
}, 3000);


