const swaggerDocs = require("./swagger/threads");

const isTest = process.env.NODE_ENV === "test";

const routes = (handler) => [
  {
    method: "POST",
    path: "/threads",
    handler: handler.postAddThreadHandler,
    options: isTest
      ? {
          auth: "forumapi_jwt",
        }
      : swaggerDocs.postAddThread,
  },
  {
    method: "GET",
    path: "/threads/{thread_id}",
    handler: handler.getThreadHandler,
    options: isTest
      ? {}
      : swaggerDocs.getThread,
  },
];

module.exports = routes;