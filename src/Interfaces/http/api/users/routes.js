const swaggerDocs = require('./swagger/users');

const isTest = process.env.NODE_ENV === 'test';

const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
    options: isTest
      ? {}
      : swaggerDocs.postUser,
  },
];

module.exports = routes;
