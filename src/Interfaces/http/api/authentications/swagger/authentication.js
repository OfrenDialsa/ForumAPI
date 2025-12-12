const Joi = require("joi");

const postAuthentication = {
  tags: ["api", "Authentications"],
  description: "Membuat authentication baru (login)",
  notes:
    "User mengirimkan username dan password, akan dikembalikan accessToken & refreshToken",

  validate: {
    payload: Joi.object({
      username: Joi.string().required().description("Username user"),
      password: Joi.string().required().description("Password user"),
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
      data: Joi.object({
        accessToken: Joi.string().required(),
        refreshToken: Joi.string().required(),
      }).required(),
    }).label("PostAuthenticationResponse"),
  },
};

const putAuthentication = {
  tags: ["api", "Authentications"],
  description: "Memperbarui access token menggunakan refresh token",
  notes:
    "User mengirimkan refreshToken yang valid, akan dikembalikan accessToken baru",

  validate: {
    payload: Joi.object({
      refreshToken: Joi.string()
        .required()
        .description("Refresh token yang valid"),
    }),
  },

  response: {
    schema: Joi.object({
      status: Joi.string().valid("success").required(),
      data: Joi.object({
        accessToken: Joi.string().required(),
      }).required(),
    }).label("PutAuthenticationResponse"),
  },
};

const deleteAuthentication = {
  tags: ["api", "Authentications"],
  description: "Menghapus refresh token (logout)",
  notes: "User mengirimkan refreshToken yang ingin dihapus",

  validate: {
    payload: Joi.object({
      refreshToken: Joi.string()
        .required()
        .description("Refresh token yang ingin dihapus"),
    }),
  },

  response: {
    schema: Joi.object({
      status: Joi.string().valid("success").required(),
    }).label("DeleteAuthenticationResponse"),
  },
};

module.exports = {
  postAuthentication,
  putAuthentication,
  deleteAuthentication,
};
