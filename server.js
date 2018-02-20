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
const ws = bfx.ws(2)

ws.on('open', () => {
  debug('open')
  ws.subscribeCandles(CANDLE_KEY)
})

const CANDLE_KEY = 'trade:1m:tIOTUSD'
let prevTS = null

ws.on('open', () => {
  ws.subscribeCandles(CANDLE_KEY)
})

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

var Crypto = "wait....";
var opts = {timeframe:"1m", symbol:"tIOTUSD", section:"last"};

ws.onCandle({ key: CANDLE_KEY }, (candles) => {
  if (prevTS === null || candles[0].mts > prevTS) {
    const Crypto = candles[1] // report previous candle
    )
    prevTS = candles[0].mts
  }
})

ws.open()
client.send(JSON.stringify(Crypto));

/*
setInterval(() => {
    wss.clients.forEach((client) => {
        bfxRest.candles(opts, (err, res) => {
	    if (err) console.log(err)
	    console.log(res)
	    Crypto = res
    })
      client.send(JSON.stringify(Crypto));
    });
}, 5000);
*/
