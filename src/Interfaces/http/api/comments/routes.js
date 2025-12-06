const swaggerDocs = require('./swagger/comments');

const isTest = process.env.NODE_ENV === 'test';

const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads/{thread_id}/comments',
    handler: handler.postAddCommentHandler,
    options: isTest
      ? {
        auth: 'forumapi_jwt'
      }
      : swaggerDocs.postAddComment,
  },
  {
    method: 'DELETE',
    path: '/threads/{thread_id}/comments/{comment_id}',
    handler: handler.deleteCommentHandler,
    options: isTest
      ? {
        auth: 'forumapi_jwt'
      }
      : swaggerDocs.deleteComment,
  },
];

module.exports = routes;