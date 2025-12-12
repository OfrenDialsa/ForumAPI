const Joi = require('joi');

const postUser = {
  tags: ['api', 'Users'],
  description: 'Mendaftarkan user baru',
  notes: 'Membuat akun baru dengan username, password, dan fullname.',

  validate: {
    payload: Joi.object({
      username: Joi.string().required().description('Username unik'),
      password: Joi.string().required().description('Password user'),
      fullname: Joi.string().required().description('Nama lengkap user'),
    })
  },

  response: {
    schema: Joi.object({
      status: Joi.string().valid('success').required(),
      data: Joi.object({
        addedUser: Joi.object({
          id: Joi.string().required(),
          username: Joi.string().required(),
          fullname: Joi.string().required(),
        }),
      }),
    }).label('AddUserResponse'),
  },
};

module.exports = {
  postUser,
};
