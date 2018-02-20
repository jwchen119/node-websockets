'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
//const coinTicker = require('coin-ticker');
const BFX = require('bitfinex-api-node')

const bfxRest = new BFX({
  apiKey: '1234',
  apiSecret: '4321'
}).rest(2);

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
/*
var opts = {};
opts.timeframe= "1m";
opts.symbol= "tIOTUSDaa";
opts.section= "hist";
*/

//var strw = JSON.stringify(opts);

bfxRest.candles({ symbol:"ttIOTUSD" }, (err, res) => {
	if (err) console.log(err)
	console.log(JSON.stringify(res))
})

var request = require("request");

var options = { method: 'POST',
  url: 'https://api.bitfinex.com/v2/calc/trade/avg',
  qs: { symbol: 'tBTCUSD' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

/*
bfxRest.candles(strw, (err, res) => {
	if (err) console.log(err)
	console.log(res)
})
*/

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


