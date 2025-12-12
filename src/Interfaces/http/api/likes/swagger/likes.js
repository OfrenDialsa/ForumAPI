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

    failAction: (request, h, err) => {
      return h
        .response({
          status: "fail",
          message: err.message,
        })
        .code(400)
        .takeover();
    },
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
