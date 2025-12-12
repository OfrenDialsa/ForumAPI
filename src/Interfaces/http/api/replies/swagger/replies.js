const Joi = require('joi');

const postAddReply = {
  auth: 'forumapi_jwt',
  tags: ['api', 'Replies'],
  description: 'Menambah reply pada sebuah komentar',
  notes: 'User harus login (JWT). Reply akan ditambahkan ke komentar tertentu.',

  validate: {
    params: Joi.object({
      thread_id: Joi.string().required().description('ID thread'),
      comment_id: Joi.string().required().description('ID komentar'),
    }),
    payload: Joi.object({
      content: Joi.string().required().description('Isi reply'),
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
      message: Joi.string().required(),
      data: Joi.object({
        addedReply: Joi.object({
          id: Joi.string().required(),
          content: Joi.string().required(),
          owner: Joi.string().required(),
        }),
      }),
    }).label('AddReplyResponse'),
  },
};

const deleteReply = {
  auth: 'forumapi_jwt',
  tags: ['api', 'Replies'],
  description: 'Menghapus reply dari komentar',
  notes: 'User harus login. Hanya pemilik reply yang dapat menghapus.',

  validate: {
    params: Joi.object({
      thread_id: Joi.string().required().description('ID thread'),
      comment_id: Joi.string().required().description('ID komentar'),
      reply_id: Joi.string().required().description('ID reply yang akan dihapus'),
    }),
  },

  response: {
    schema: Joi.object({
      status: Joi.string().valid('success').required(),
    }).label('DeleteReplyResponse'),
  },
};

module.exports = {
  postAddReply,
  deleteReply,
};
