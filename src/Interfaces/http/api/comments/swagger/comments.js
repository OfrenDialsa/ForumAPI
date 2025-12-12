const Joi = require("joi");

const postAddComment = {
  auth: "forumapi_jwt",
  tags: ["api", "Comments"],
  description: "Menambah komentar pada sebuah thread",
  notes:
    "User harus login (JWT). Komentar akan ditambahkan ke thread tertentu.",
  plugins: {
    "hapi-swagger": {
      security: [{ jwt: [] }],
    },
  },

  validate: {
    params: Joi.object({
      thread_id: Joi.string().required().description("ID thread target"),
    }),
    payload: Joi.object({
      content: Joi.string().required().description("Isi komentar"),
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
      status: Joi.string().valid("success").required(),
      message: Joi.string().required(),
      data: Joi.object({
        addedComment: Joi.object({
          id: Joi.string().required(),
          content: Joi.string().required(),
          owner: Joi.string().required(),
        }),
      }),
    }).label("AddCommentResponse"),
  },
};

const deleteComment = {
  auth: "forumapi_jwt",
  tags: ["api", "Comments"],
  description: "Menghapus komentar dari thread",
  notes: "User harus login. Hanya pemilik komentar yang dapat menghapus.",
  plugins: {
    "hapi-swagger": {
      security: [{ jwt: [] }],
    },
  },

  validate: {
    params: Joi.object({
      thread_id: Joi.string().required().description("ID thread"),
      comment_id: Joi.string()
        .required()
        .description("ID komentar yang akan dihapus"),
    }),
  },

  response: {
    schema: Joi.object({
      status: Joi.string().valid("success").required(),
    }).label("DeleteCommentResponse"),
  },
};

module.exports = {
  postAddComment,
  deleteComment,
};
