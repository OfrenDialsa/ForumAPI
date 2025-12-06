const Joi = require('joi');

const putCommentLike = {
  auth: 'forumapi_jwt',
  tags: ['api', 'CommentLikes'],
  description: 'Memberikan atau menghapus like pada komentar',
  notes: 'User harus login. Like bersifat toggle: jika sudah di-like, maka unlike.',

  validate: {
    params: Joi.object({
      thread_id: Joi.string().required().description('ID thread'),
      comment_id: Joi.string().required().description('ID komentar'),
    }),
  },

  response: {
    schema: Joi.object({
      status: Joi.string().valid('success').required(),
    }).label('PutCommentLikeResponse'),
  },
};

module.exports = {
  putCommentLike,
};
