import { IncomingMessage } from "connect";
import * as http from "http";
const express = require('express');
const { Nuxt } = require('nuxt');
const nuxtConfig = require('../nuxt.config');

const IS_PROD = process.env.NODE_ENV === 'production';
const nuxt = new Nuxt({
  ...nuxtConfig,
  dev: !IS_PROD,
});

const app = express();
app.use('/static', express.static('./static'));
app.use('/sw.js', express.static('./.serverless_nuxt/static/sw.js'));
app.use(async (req: IncomingMessage, res: http.ServerResponse) => {
  await nuxt.ready();
  nuxt.render(req, res);
});

module.exports = {
  app,
  nuxt,
};
