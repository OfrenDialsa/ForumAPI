const swaggerDocs = require('./swagger/replies');

const isTest = process.env.NODE_ENV === 'test';

const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads/{thread_id}/comments/{comment_id}/replies',
    handler: handler.postAddReplyHandler,
    options: isTest
      ? {
        auth: 'forumapi_jwt'
      }
      : swaggerDocs.postAddReply,
  },
  {
    method: 'DELETE',
    path: '/threads/{thread_id}/comments/{comment_id}/replies/{reply_id}',
    handler: handler.deleteReplyHandler,
    options: isTest
      ? {
        auth: 'forumapi_jwt'
      }
      : swaggerDocs.deleteReply,
  },
];

module.exports = routes;
