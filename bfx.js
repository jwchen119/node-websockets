'use strict'

require('dotenv').config()

const BFX = require('../')
const SocksProxyAgent = require('socks-proxy-agent')

const { API_KEY, API_SECRET, REST_URL, WS_URL, SOCKS_PROXY_URL } = process.env
const agent = SOCKS_PROXY_URL ? new SocksProxyAgent(SOCKS_PROXY_URL) : null

const bfx = new BFX({
  apiKey: '1234',
  apiSecret: '4331',

  ws: {
    url: WS_URL,
    agent
  },

  rest: {
    url: 'https://api.bitfinex.com/v2/',
    agent
  }
})

module.exports = bfx
