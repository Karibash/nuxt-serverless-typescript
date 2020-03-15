import { Callback, Context, Handler } from 'aws-lambda';
const { createServer, proxy } = require('aws-serverless-express-edge');
const { app } = require('./core');

const BINARY_MIME_TYPES = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
];

const server = createServer(app, () => null, BINARY_MIME_TYPES);
export const handler: Handler = (event: any, context: Context, _: Callback) => {
  proxy(server, event, context);
};
