const Joi = require('joi');
const swaggerDocs = require("./swagger/authentication");

const isTest = process.env.NODE_ENV === 'test';

const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
    options: isTest
      ? {}
      : swaggerDocs.postAuthentication
  },

  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthenticationHandler,
    options: isTest
      ? {}
      : swaggerDocs.putAuthentication
  },

  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteAuthenticationHandler,
    options: isTest
      ? {}
      : swaggerDocs.deleteAuthentication
  },
];

module.exports = routes;
