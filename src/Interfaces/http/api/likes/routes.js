const swaggerDocs = require('./swagger/likes');

const isTest = process.env.NODE_ENV === 'test';

const routes = (handler) => [
  {
    method: 'PUT',
    path: '/threads/{thread_id}/comments/{comment_id}/likes',
    handler: handler.putCommentLikeHandler,
    options: isTest
      ? {
        auth: 'forumapi_jwt'
      }
      : swaggerDocs.putCommentLike,
  },
];

module.exports = routes;
